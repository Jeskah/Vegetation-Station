// Register new user
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();
  const error = document.getElementById("regError");

  // Clear previous error
  error.textContent = "";

  // Basic validation
  if (!user || !pass || !confirm) {
    error.textContent = "All fields are required.";
    return;
  }

  if (pass !== confirm) {
    error.textContent = "Passwords do not match.";
    return;
  }

  // Get stored users or create empty object
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Check if username exists
  if (users[user]) {
    error.textContent = "Username already exists.";
    return;
  }

  // Save new user
  users[user] = { password: pass };
  localStorage.setItem("users", JSON.stringify(users));

  // Success
  alert("Account created successfully! Please log in.");
  window.location.href = "login.html";
}

// Toggle light/dark mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

// Optional: Seed → sprout animation for logo
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");

  if (!logo) return;

  if (!localStorage.getItem("sproutPlayed")) {
    setTimeout(() => {
      logo.classList.remove("seed");
      logo.classList.add("sprout");
      localStorage.setItem("sproutPlayed", "true");
    }, 300);
  } else {
    logo.classList.remove("seed");
    logo.classList.add("sprout");
  }
});
