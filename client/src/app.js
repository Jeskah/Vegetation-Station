// ----- TOP OF FILE -----
// Get current logged-in user and protect page
const currentUser = localStorage.getItem("username");
if (!currentUser || localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

let selectedEvent = null;

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

// ----- Show greeting -----
document.addEventListener("DOMContentLoaded", () => {
  const greetingEl = document.getElementById("greeting");
  if (greetingEl && currentUser) {
    greetingEl.textContent = `Welcome, ${currentUser}! 🌿`;
  }
});

// ----- Per-user storage helpers -----
function getUserEvents() {
  const data = JSON.parse(localStorage.getItem("userEvents")) || {};
  return data[currentUser] || [];
}

function saveUserEvents(events) {
  const data = JSON.parse(localStorage.getItem("userEvents")) || {};
  data[currentUser] = events;
  localStorage.setItem("userEvents", JSON.stringify(data));
}

// ----- Calendar Setup -----
document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");

  window.calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",
    headerToolbar: { left: "prev,next", center: "title", right: "" },
    eventClick: (info) => {
      selectedEvent = info.event;
      const { health, notes, photo } = info.event.extendedProps;

      document.getElementById("modalTitle").textContent = info.event.title;
      document.getElementById("modalHealth").textContent = `Health: ${health}`;
      document.getElementById("modalNotesInput").value = notes || "";

      const img = document.getElementById("modalPhoto");
      if (photo) {
        img.src = photo;
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }

      document.getElementById("photoModal").style.display = "block";
    },
  });

  // Load saved events for this user
  const savedEvents = getUserEvents();
  savedEvents.forEach((e) => calendar.addEvent(e));

  calendar.render();
});

// ----- Toggle dark/light mode -----
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

// ----- Add vegetable -----
function addVegetable() {
  const name = document.getElementById("vegName").value.trim();
  const date = document.getElementById("plantDate").value;
  const health = document.getElementById("health").value;
  const notes = document.getElementById("notes").value;
  const photoInput = document.getElementById("photo");

  if (!name || !date) {
    alert("Vegetable name and planting date required");
    return;
  }

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) =>
      createEvents(name, date, health, notes, e.target.result);
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    createEvents(name, date, health, notes, null);
  }

  document.getElementById("vegName").value = "";
  document.getElementById("plantDate").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("photo").value = "";
}

// ----- Create multiple events for a vegetable -----
function createEvents(name, date, health, notes, photo) {
  addEvent(name, "💧 Water", date, health, notes, photo);
  addEvent(name, "🌱 Fertilize", addDays(date, 14), health, notes, photo);
  addEvent(name, "🐛 Pest Check", addDays(date, 30), health, notes, photo);
  addEvent(name, "🧺 Harvest", addDays(date, 70), health, notes, photo);
}

// ----- Add event to calendar and storage -----
function addEvent(veg, task, date, health, notes, photo) {
  const eventObj = {
    title: `${veg} ${task}`,
    start: date,
    classNames: [health],
    extendedProps: { health, notes, photo },
  };

  calendar.addEvent(eventObj);

  const events = getUserEvents();
  events.push(eventObj);
  saveUserEvents(events);
}

// ----- Utility: add days -----
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// ----- Modal controls -----
function closeModal() {
  document.getElementById("photoModal").style.display = "none";
  selectedEvent = null;
}

function saveNotes() {
  if (selectedEvent) {
    const newNotes = document.getElementById("modalNotesInput").value;
    selectedEvent.setExtendedProp("notes", newNotes);

    // Update storage
    const events = getUserEvents();
    const index = events.findIndex(
      (ev) =>
        ev.title === selectedEvent.title && ev.start === selectedEvent.startStr,
    );
    if (index > -1) {
      events[index].extendedProps.notes = newNotes;
      saveUserEvents(events);
    }

    alert("Notes updated!");
    closeModal();
  }
}

function deleteEvent() {
  if (selectedEvent) {
    if (confirm("Are you sure you want to delete this vegetable event?")) {
      selectedEvent.remove();

      // Update storage
      let events = getUserEvents();
      events = events.filter(
        (ev) =>
          !(
            ev.title === selectedEvent.title &&
            ev.start === selectedEvent.startStr
          ),
      );
      saveUserEvents(events);

      alert("Vegetable event deleted!");
      closeModal();
    }
  }
}

// ----- Logout -----
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
