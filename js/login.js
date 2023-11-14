document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signUpForm = document.getElementById("signup-form");

  // Handle Login
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    console.log("Login with:", loginEmail, loginPassword);
    // Here you should add your logic to handle user login
    // For example, authenticate with Firebase or your backend server
  });

  // Handle Sign Up
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const signUpEmail = document.getElementById("signup-email").value;
    const signUpPassword = document.getElementById("signup-password").value;

    console.log("Sign Up with:", signUpEmail, signUpPassword);
    // Here you should add your logic to handle user sign up
    // For example, create a new user account in Firebase or your backend server
  });
});
