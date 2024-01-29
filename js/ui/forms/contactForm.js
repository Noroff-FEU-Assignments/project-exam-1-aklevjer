import * as utils from "../../utils/index.js";

function handleContactSubmit(event, inputElements) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    // Success logic
  }
}

export function initContactForm() {
  const contactForm = document.forms.contact;
  const inputElements = [contactForm.name, contactForm.email, contactForm.subject, contactForm.message];

  utils.initInputListeners(inputElements);
  contactForm.addEventListener("submit", (event) => handleContactSubmit(event, inputElements));
}
