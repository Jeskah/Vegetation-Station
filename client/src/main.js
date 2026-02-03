
// fetch messages

console.log(`running client`)

const form = document.getElementById("loginForm");
const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const baseURL = 'http://localhost:7777'


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form)); // converts to {username, password}

  const res = await fetch("http://localhost:7777/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  if (res.ok) {
    loginView.hidden = true;
    appView.hidden = false;
  } else {
    alert("Login failed");
  }
});



async function fetchData() {
  const response = await fetch(`${baseURL}/users`)
  const messages = await response.json()

  console.log(messages)

  return messages
}

console.log(`please log in`)