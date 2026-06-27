// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeIcon").textContent = isDark ? "🌙" : "☀️";
  document.getElementById("themeLabel").textContent = isDark ? "Dark" : "Light";
}

// Mobile menu
function toggleMobileMenu() {
  const m = document.getElementById("mobileMenu");
  m.style.display = m.style.display === "flex" ? "none" : "flex";
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").style.display = "none";
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Counter animation
function animateCount(el, target, suffix = "") {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const heroSection = document.getElementById("hero");
if (heroSection) {
  const heroObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCount(document.getElementById("yearsCount"), 10);
        animateCount(document.getElementById("countriesCount"), 12);
        animateCount(document.getElementById("projectsCount"), 80, "+");
        heroObs.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  heroObs.observe(heroSection);
}

// Form submit to Email using Web3Forms
async function handleFormSubmit() {
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const service = document.getElementById("cfService").value;
  const msg = document.getElementById("cfMessage").value.trim();
  const status = document.getElementById("formStatus");
  const submitBtn = document.querySelector(".submit-btn");

  if (!name || !email || !msg || !service) {
    status.style.display = "block";
    status.style.background = "rgba(255,80,80,0.1)";
    status.style.border = "1px solid rgba(255,80,80,0.3)";
    status.style.color = "#ff8080";
    status.textContent = "⚠️ Please fill in all required fields.";
    return;
  }

  // Button text change to show progress
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.style.opacity = "0.7";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // YAHAN APNI KEY DALEIN ↓
        access_key: "db4ec93b-2da2-4505-911e-2a30f8195bf8",
        subject: "New Contact Form Submission - Knootix Website",
        Name: name,
        Email: email,
        Service: service,
        Message: msg,
      }),
    });

    const result = await response.json();

    if (result.success) {
      status.style.display = "block";
      status.style.background = "var(--accent-glow)";
      status.style.border = "1px solid rgba(77,184,138,0.3)";
      status.style.color = "var(--accent)";
      status.textContent =
        "✓ Message sent successfully! We'll be in touch soon.";

      // Clear input fields
      document.getElementById("cfName").value = "";
      document.getElementById("cfEmail").value = "";
      document.getElementById("cfService").value = "";
      document.getElementById("cfMessage").value = "";
    } else {
      throw new Error("Failed to send");
    }
  } catch (error) {
    status.style.display = "block";
    status.style.background = "rgba(255,80,80,0.1)";
    status.style.border = "1px solid rgba(255,80,80,0.3)";
    status.style.color = "#ff8080";
    status.textContent = "⚠️ Something went wrong. Please try again.";
  } finally {
    submitBtn.textContent = originalBtnText;
    submitBtn.style.opacity = "1";
    submitBtn.disabled = false;
    setTimeout(() => {
      status.style.display = "none";
    }, 5000);
  }
}

// AI Chatbot Logic
function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  const messages = document.getElementById("chatMessages");

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  // Typing indicator
  const typingMsg = document.createElement("div");
  typingMsg.className = "msg bot typing";
  typingMsg.innerHTML =
    '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typingMsg);
  messages.scrollTop = messages.scrollHeight;

  // Simulate network delay and process logic contextually
  setTimeout(() => {
    typingMsg.remove();
    let reply =
      "Thanks for reaching out! You can drop an email at knootix@gmail.com or hit our WhatsApp for an immediate response.";

    const lowerText = text.toLowerCase();

    // Simple Rule-Based Context Routing
    if (
      lowerText.includes("service") ||
      lowerText.includes("offer") ||
      lowerText.includes("do you do")
    ) {
      reply =
        "We offer Video Editing, Graphic Design, Website Development, and Photography. Let us know which one you need help with!";
    } else if (lowerText.includes("video") || lowerText.includes("edit")) {
      reply =
        "Our video editing covers brand films, cinematic reels, color grading, and VFX overlays for all social platforms.";
    } else if (
      lowerText.includes("design") ||
      lowerText.includes("graphic") ||
      lowerText.includes("logo")
    ) {
      reply =
        "For Graphic Design, we create brand identities, logos, marketing collateral, and full visual systems.";
    } else if (
      lowerText.includes("web") ||
      lowerText.includes("site") ||
      lowerText.includes("e-com") ||
      lowerText.includes("develop")
    ) {
      reply =
        "We build custom, responsive websites, landing pages, and robust E-commerce platforms optimized for SEO.";
    } else if (lowerText.includes("photo") || lowerText.includes("shoot")) {
      reply =
        "Our photography services range from product and commercial shoots to corporate headshots and event coverage.";
    } else if (
      lowerText.includes("price") ||
      lowerText.includes("cost") ||
      lowerText.includes("quote")
    ) {
      reply =
        "Pricing varies depending on your exact project scope. Please use the contact form above and we'll get you a custom quote ASAP!";
    } else if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey")
    ) {
      reply = "Hello there! How can we help your brand stand out today?";
    }

    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = reply;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}
