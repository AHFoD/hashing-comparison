// const crypto = require("crypto");
// const bcrypt = require("bcrypt");

// const passwordInput = document.getElementById("password");
// const hashButton = document.getElementById("hashButton");
// const md5HashOutput = document.getElementById("md5Hash");
// const bcryptHashOutput = document.getElementById("bcryptHash");

// hashButton.addEventListener("click", () => {
//   const password = passwordInput.value;

//   // MD5 hashing using native Crypto module
//   const md5Hash = crypto.createHash("md5").update(password).digest("hex");
//   md5HashOutput.textContent = md5Hash;

//   // Bcrypt hashing
//   const salt = bcrypt.genSaltSync(10);
//   const bcryptHash = bcrypt.hashSync(password, salt);
//   bcryptHashOutput.textContent = bcryptHash;
// });

async function hashPassword() {
  console.log("masuk_tak");
  const password = document.getElementById("password").value;
  const response = await fetch(`/hash-password?password=${password}`);
  const data = await response.json();
  document.getElementById("md5Hash").textContent = `MD5 Hash: ${data.md5Hash}`;
  document.getElementById("bcryptHash").textContent = `Bcrypt Hash: ${data.bcryptHash}`;
}
