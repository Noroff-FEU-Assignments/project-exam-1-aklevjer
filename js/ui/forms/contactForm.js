import * as api from "../../api/index.js";
import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

async function sendContactForm(contactForm) {
  const statusLabel = document.querySelector(".status-label");
  const contactData = new FormData(contactForm);

  try {
    await api.postContactForm(contactData);
    ui.showAlertMessage(statusLabel, "success", "Your message was sent!");
    contactForm.reset();
  } catch (error) {
    console.log(error);
    ui.showAlertMessage(statusLabel, "error", "Oops! Failed to send message. Please try again later.");
  }
}

function handleContactSubmit(event, inputElements) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    const contactForm = event.target;
    sendContactForm(contactForm);
  }
}

export function initContactForm() {
  const contactForm = document.forms.contact;
  const inputElements = [contactForm.name, contactForm.email, contactForm.subject, contactForm.message];

  utils.initInputListeners(inputElements);
  contactForm.addEventListener("submit", (event) => handleContactSubmit(event, inputElements));
}
