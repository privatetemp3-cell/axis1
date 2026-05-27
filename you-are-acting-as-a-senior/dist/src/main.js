const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

const form = document.querySelector("#enquiry-form");
const status = document.querySelector("#form-status");

form?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const fullName = `${data.get("firstName")} ${data.get("lastName")}`.trim();
  const subject = `Visa Readiness Consultation enquiry - ${fullName}`;
  const body = [
    "Visa Readiness Consultation enquiry",
    "",
    `Name: ${fullName}`,
    `Email: ${data.get("email")}`,
    `WhatsApp: ${data.get("whatsapp")}`,
    `Nationality/passport: ${data.get("nationality")}`,
    `Country of residence: ${data.get("residence")}`,
    `Destination country: ${data.get("destination")}`,
    `Previous refusal: ${data.get("previousRefusal")}`,
    `Intended travel date: ${data.get("travelDate") || "Not provided"}`,
    `Preferred contact method: ${data.get("contactMethod")}`,
    "",
    "Biggest concern:",
    data.get("concern")
  ].join("\n");

  const mailto = `mailto:contact@axisvisahq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  if (status) {
    status.textContent = "Your email app should now open with the enquiry details prepared.";
  }
});
