const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Import Mongoose
const User = require("./model/userModel");
const { ObjectId } = require("mongodb");

const app = express();

app.use(bodyParser.json());
// Use the cors middleware
app.use(cors());

const uri = "mongodb+srv://admin:uIOEboqF9naIDdrz@cluster0.cnvjaaz.mongodb.net/playground";

// const uri = "mongodb://docker:mongopw@localhost:27017/";
// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the User Registration Server!</h1>`);
});

// Define route to handle password hashing
app.post("/hash-password", (req, res) => {
  try {
    console.log("masuk?");
    console.log(req?.body?.password);
    const { password, username, id, gender, dob } = req.body;

    // MD5 hashing
    const md5Hash = crypto.createHash("md5").update(password).digest("hex");

    // Bcrypt hashing
    bcrypt.hash(password, 10, (err, bcryptHash) => {
      if (err) {
        return res.status(500).send("Error hashing password");
      }

      res.json({ md5Hash, bcryptHash });
    });
  } catch (error) {
    console.log(error);
  }
});

// app.post("/login", (req, res) => {
//   try {
//     console.log("user-login?");
//     console.log(req?.body?.password);
//     const { password, username, id, gender, dob } = req.body;

//     // MD5 hashing
//     const md5Hash = crypto.createHash("md5").update(password).digest("hex");

//     // Bcrypt hashing
//     bcrypt.hash(password, 10, (err, bcryptHash) => {
//       if (err) {
//         return res.status(500).send("Error hashing password");
//       }

//       res.json({ md5Hash, bcryptHash });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    if (!user) {
      // User not found
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Error comparing passwords");
      }

      if (!result) {
        // Passwords do not match
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Passwords match, login successful
      // res.json({ message: "Login successful", user ,});
      res.status(200).json({ message: "Login successful", user });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/signup", async (req, res) => {
  try {
    console.log("inside signup", req.body);
    const { username, email, password, age, gender, address, contactNumber } = req.body;
    console.log(typeof username);

    if (username === "" && password === "") {
      console.log("error creating user");
    } else {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const md5Hash = crypto.createHash("md5").update(password).digest("hex");

      console.log(md5Hash);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        md5Hash: md5Hash,
        age,
        gender,
        address,
        phoneNumber: contactNumber,
      });

      // Save the user to the database
      const result = await newUser.save();

      console.log(result);

      res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Edit user by _id
app.put("/update-user/:id", async (req, res) => {
  // Extract the id parameter from the request URL
  const { id } = req.params;

  // Log request details
  console.log(`Received PUT request to update user with ID: ${id}`);

  try {
    // Check if the id parameter is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      // If the id is not valid, send a bad request response
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Convert the id parameter to an ObjectId
    const objectId = new ObjectId(id);

    // Destructure user data from the request body
    const { username, email, age, gender, address, phoneNumber } = req.body;

    // Attempt to update the user with the specified ID
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { username, email, age, gender, address, phoneNumber },
      { new: true }
    );

    // Check if a user was found and updated
    if (!updatedUser) {
      // If no user was found with the specified ID, send a not found response
      return res.status(404).json({ error: "User not found" });
    }

    // Log successful update
    console.log(`User with ID ${id} updated successfully`);

    // Send response with updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    // Log error
    console.error("Error updating user:", error);

    // Send error response
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user by _id
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch user data by ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch user data from the database using the provided ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user exists, send the user data in the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
