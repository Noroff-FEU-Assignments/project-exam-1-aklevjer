import * as utils from "../../utils/index.js";

export function showAlertMessage(parentElement, alertType, message) {
  const isSuccessMsg = alertType === "success";

  const alertIcon = utils.createHTMLElement("i", isSuccessMsg ? ["bx", "bx-check-circle"] : ["bx", "bx-error-circle", "text-red"]);
  const alertBody = utils.createHTMLElement(isSuccessMsg ? "strong" : "p", null, message);
  const alertMessage = utils.createHTMLElement("div", [`alert-${alertType}`, "flex", "items-center", "rounded-corners"], null, [alertIcon, alertBody]);

  if (parentElement) {
    parentElement.replaceWith(alertMessage);
  }
}

export function toggleInputError(inputElement, showError) {
  const inputContainer = inputElement.parentElement;
  const errorIcon = inputContainer.querySelector(".input__error-icon");
  const errorMessage = inputContainer.querySelector(".input__error-message");

  inputElement.classList.toggle("input__error", !showError);
  utils.hideElement(errorIcon, showError);
  utils.hideElement(errorMessage, showError);
}
