// fetch messages

console.log(`running client`);

const form = document.getElementById("loginForm");
const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const baseURL = "http://localhost:7777";
console.log(form);
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form)); // converts to {username, password}

  const res = await fetch("http://localhost:7777/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    loginView.hidden = true;
    appView.hidden = false;
  } else {
    alert("Login failed");
  }
});

async function fetchData() {
  const response = await fetch(`${baseURL}/users`);
  const messages = await response.json();

  console.log(messages);

  return messages;
}

console.log(`please log in`);

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // optional: validate credentials here

  // redirect to another page
  window.location.href = "main.html";
});

// ----- Seed → Sprout Logo Animation -----
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
