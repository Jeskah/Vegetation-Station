document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");

  if (!logo) return;

  // Play only once
  if (!localStorage.getItem("sproutPlayed")) {
    setTimeout(() => {
      logo.classList.remove("seed");
      logo.classList.add("sprout");
      localStorage.setItem("sproutPlayed", "true");
    }, 300);
  } else {
    // Skip intro, go straight to breathing
    logo.classList.remove("seed");
    logo.classList.add("sprout");
  }
});

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  if (!user || !pass) {
    error.textContent = "Please enter username and password";
    return;
  }

  // Simple local login (demo)
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", user);

  window.location.href = "index.html";
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}
