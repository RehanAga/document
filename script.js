document.addEventListener("DOMContentLoaded", function () {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();

  // Set greeting text
  if (hour < 12) {
    greeting.textContent = "Good Morning, I'm Rehan ☀️";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, I'm Rehan 🌤️";
  } else {
    greeting.textContent = "Good Evening, I'm Rehan 🌙";
  }

  // Add animation class
  greeting.classList.add("animated");

  // Remove animation after it's done
  setTimeout(() => greeting.classList.remove("animated"), 2000);
});

// Contact Form Validation and Confetti Feedback
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  status.classList.remove("shake", "fade-in");

  if (name && email && message) {
    status.textContent = "✅ Message sent successfully!";
    status.style.color = "#155724";
    status.style.backgroundColor = "#d4edda";
    status.style.border = "1px solid #c3e6cb";
    status.classList.add("fade-in");

    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    form.reset();
  } else {
    status.textContent = "❌ Please fill out all fields!";
    status.style.color = "#721c24";
    status.style.backgroundColor = "#f8d7da";
    status.style.border = "1px solid #f5c6cb";
    status.classList.add("shake");
  }
});

// Typing effect function
function typeText(element, text, speed = 70) {
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(interval);
      element.classList.add("animated");
    }
  }, speed);
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((reg) => console.log("✅ Service Worker Registered"))
      .catch((err) => console.log("❌ Service Worker Failed", err));
  });
}

// Handle PWA Install Prompt
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("install-btn");
  if (installBtn) {
    installBtn.style.display = "inline-block";

    installBtn.addEventListener("click", () => {
      installBtn.style.display = "none";
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("❌ User dismissed the install prompt");
        }
        deferredPrompt = null;
      });
    });
  }
});
