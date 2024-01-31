import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function handleContactSubmit(event, inputElements) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    const statusLabel = document.querySelector(".status-label");

    if (statusLabel) {
      ui.showAlertMessage(statusLabel, "success", "Your message was sent!");
    }
  }
}

export function initContactForm() {
  const contactForm = document.forms.contact;
  const inputElements = [contactForm.name, contactForm.email, contactForm.subject, contactForm.message];

  utils.initInputListeners(inputElements);
  contactForm.addEventListener("submit", (event) => handleContactSubmit(event, inputElements));
}
