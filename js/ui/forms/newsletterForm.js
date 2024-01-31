import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function handleNewsletterSubmit(event, inputElements) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    const statusLabel = document.querySelector(".status-label");

    if (statusLabel) {
      ui.showAlertMessage(statusLabel, "success", "Thank you for subscribing!");
    }
  }
}

export function initNewsletterForm() {
  const newsletterForm = document.forms.newsletter;
  const inputElements = [newsletterForm.email];

  utils.initInputListeners(inputElements);
  newsletterForm.addEventListener("submit", (event) => handleNewsletterSubmit(event, inputElements));
}
