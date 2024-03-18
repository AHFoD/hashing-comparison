var form = document.getElementById("signupForm");

// Attach an event listener to the form's submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Call the validateForm function
  validateForm();
});

async function validateForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const address = document.getElementById("address").value;
  const contactNumber = document.getElementById("contactNumber").value;

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, age, gender, address, contactNumber }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log({ result });
    window.location.href = "login.html";
  } else {
    console.error("Failed to sign up:", response.statusText);
    // Handle errors here
  }

  // Clear the form inputs
  form.reset();
}
