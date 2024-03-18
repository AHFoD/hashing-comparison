// JavaScript
let testId;
// Call fetchUsers function when the page finishes loading
window.onload = function () {
  fetchUsers();
};

// Function to fetch and display user data
async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = `
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.age}</td>
                        <td>${user.gender}</td>
                        <td>${user.address}</td>
                        <td>${user.phoneNumber}</td>
                        <td>${user.password}</td>
                        <td>${user.md5Hash}</td>
                        <td>
                            <button class="edit" onclick="editUser('${user._id}')">Edit</button>
                            <button class="delete" onclick="deleteUser('${user._id}')">Delete</button>
                        </td>
                    </tr>
                `;
      userTableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

document.getElementById("updateUserButton").addEventListener("click", function () {
  editOrUpdateUser(); // Call the function from the script tag
});
// Function to edit or update user
async function editOrUpdateUser() {
  try {
    const userId = document.getElementById("editUserId").value;
    console.log(`Editing user with ID: ${userId}`);
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const userData = await response.json();
    console.log("User data:", userData);
    testId = userId;
    console.log({ testId });
    // Populate form fields with user data for editing
    document.getElementById("editUsername").value = userData.username;
    document.getElementById("editEmail").value = userData.email;
    document.getElementById("editAge").value = userData.age;
    document.getElementById("editGender").value = userData.gender;
    document.getElementById("editAddress").value = userData.address;
    document.getElementById("editPhoneNumber").value = userData.phoneNumber;
    document.getElementById("editPassword").value = userData.password;
    document.getElementById("editMd5Hash").value = userData.md5Hash;

    // Show the modal for editing user data
    document.getElementById("editUserModal").style.display = "block";
  } catch (error) {
    console.error("Error editing user:", error);
  }
}

// Function to save user
async function saveUser() {
  try {
    // Get form input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;

    // Create user object
    const newUser = {
      username,
      email,
      password,
      age,
      gender,
      address,
      phoneNumber,
    };

    // Send user data to the server
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    // Check if user was successfully created
    if (response.ok) {
      // User created successfully, refresh user list
      fetchUsers();
      // Close the modal
      closeCreateUserForm();
      // Optionally, you can clear the form inputs here
    } else {
      // Failed to create user
      console.error("Failed to create user");
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

// Function to open the create user modal
function openCreateUserForm() {
  document.getElementById("createUserModal").style.display = "block";
}

// Function to close the create user modal
function closeCreateUserForm() {
  document.getElementById("createUserModal").style.display = "none";
}

async function editUser(userId) {
  try {
    console.log(`Edit user id function: ${userId}`);
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const userData = await response.json();
    console.log(userData);

    console.log({ userId });

    // Populate form fields with user data for editing
    document.getElementById("editUsername").value = userData.username;
    document.getElementById("editEmail").value = userData.email;
    document.getElementById("editAge").value = userData.age;
    document.getElementById("editGender").value = userData.gender;
    document.getElementById("editAddress").value = userData.address;
    document.getElementById("editPhoneNumber").value = userData.phoneNumber;
    document.getElementById("editPassword").value = userData.password;
    document.getElementById("editMd5Hash").value = userData.md5Hash;
    document.getElementById("updateUserButton").addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior
      updateUser(userId);
    });

    // Show the modal for editing user data
    document.getElementById("editUserModal").style.display = "block";
  } catch (error) {
    console.error("Error editing user:", error);
  }
}

// Function to update user
async function updateUser(userId) {
  try {
    // const userId = document.getElementById("editUserId").value;
    console.log({ userId });
    // Get form input values
    const username = document.getElementById("editUsername").value;
    const email = document.getElementById("editEmail").value;
    const age = document.getElementById("editAge").value;
    const gender = document.getElementById("editGender").value;
    const address = document.getElementById("editAddress").value;
    const phoneNumber = document.getElementById("editPhoneNumber").value;
    const password = document.getElementById("editPassword").value;
    const md5Hash = document.getElementById("editMd5Hash").value;

    // Create user object with updated data
    const updatedUser = {
      username,
      email,
      age,
      gender,
      address,
      phoneNumber,
      password,
      md5Hash,
    };

    // Send updated user data to the server
    const response = await fetch(`http://localhost:3000/update-user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    // Check if user was successfully updated
    if (response.ok) {
      // User updated successfully, refresh user list
      fetchUsers();
      // Close the modal
      closeEditUserModal();
      // Optionally, you can clear the form inputs here

      showToaster("User updated successfully!");
    } else {
      // Failed to update user
      // console.error("Failed to update user");
      showToaster("Failed to update user");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// Function to delete user
// Function to delete user
async function deleteUser(userId) {
  try {
    // Ask for confirmation before deleting the user
    const confirmation = confirm("Are you sure you want to delete this user?");
    if (!confirmation) {
      return; // If user cancels, exit function
    }

    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // User deleted successfully
      console.log(`User with ID ${userId} deleted successfully`);
      // Optionally, you can refresh the user list or perform any other action
      // Call fetchUsers to refresh the data
      fetchUsers();
    } else {
      // Failed to delete user
      console.error(`Failed to delete user with ID ${userId}`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

function closeEditUserModal() {
  document.getElementById("editUserModal").style.display = "none";
}

// Function to display toaster notification
function showToaster(message) {
  const toaster = document.getElementById("toaster");
  toaster.textContent = message;
  toaster.style.display = "block";
  setTimeout(() => {
    toaster.style.display = "none";
  }, 3000); // Hide after 3 seconds
}
