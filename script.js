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

// Counter animation (Only executed if on index.html with #hero)
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

// Form submit to WhatsApp
function handleFormSubmit() {
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const service = document.getElementById("cfService").value;
  const msg = document.getElementById("cfMessage").value.trim();
  const status = document.getElementById("formStatus");

  // Check karna ke koi field khali toh nahi
  if (!name || !email || !msg || !service) {
    status.style.display = "block";
    status.style.background = "rgba(255,80,80,0.1)";
    status.style.border = "1px solid rgba(255,80,80,0.3)";
    status.style.color = "#ff8080";
    status.textContent = "⚠️ Please fill in all required fields.";
    return;
  }

  // 1. Apka WhatsApp Number
  const phoneNumber = "923414680668";

  // 2. WhatsApp ke liye message banana
  const whatsappMessage = `*New Inquiry - Knootix*\n\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${service}\n\n*Message:*\n${msg}`;

  // 3. Text ko URL friendly banana
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // 4. Naye tab mein WhatsApp open karna
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");

  // 5. Success message dikhana aur form clear karna
  status.style.display = "block";
  status.style.background = "var(--accent-glow)";
  status.style.border = "1px solid rgba(77,184,138,0.3)";
  status.style.color = "var(--accent)";
  status.textContent = "✓ Opening WhatsApp...";

  document.getElementById("cfName").value = "";
  document.getElementById("cfEmail").value = "";
  document.getElementById("cfService").value = "";
  document.getElementById("cfMessage").value = "";

  setTimeout(() => {
    status.style.display = "none";
  }, 5000);
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
