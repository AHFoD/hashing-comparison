var form = document.getElementById("signupForm");

// Attach an event listener to the form's submit event
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Call the validateForm function
  validateForm();
}

async function validateForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role,
      age,
      gender,
      address,
      phoneNumber,
    }),
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

// Function to display toaster notification
function showToaster(message) {
  const toaster = document.getElementById("toaster");
  toaster.textContent = message;
  toaster.style.display = "block";
  setTimeout(() => {
    toaster.style.display = "none";
  }, 3000); // Hide after 3 seconds
}
