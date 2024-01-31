import * as utils from "../../utils/index.js";

function createErrorMessage(message) {
  const errorIcon = utils.createHTMLElement("i", ["bx", "bx-error-circle", "bx-lg", "text-red"]);

  const errorTitle = utils.createHTMLElement("strong", ["text-medium", "text-red"], "Error");
  const errorBody = utils.createHTMLElement("p", null, message);
  const errorContent = utils.createHTMLElement("div", null, null, [errorTitle, errorBody]);

  return utils.createHTMLElement("div", ["error-message", "flex", "items-center", "gap-1", "rounded-corners"], null, [errorIcon, errorContent]);
}

function createSuccessMessage(message) {
  const successIcon = utils.createHTMLElement("i", ["bx", "bx-check-circle"]);
  const successBody = utils.createHTMLElement("p", null, message);

  return utils.createHTMLElement("div", ["success-message", "flex", "items-center"], null, [successIcon, successBody]);
}

export function showAlertMessage(parentElement, alertType, message) {
  const alertMessage = alertType === "success" ? createSuccessMessage(message) : createErrorMessage(message);
  parentElement.replaceWith(alertMessage);
}

export function toggleInputError(inputElement, showError) {
  const inputContainer = inputElement.parentElement;
  const errorIcon = inputContainer.querySelector(".input__error-icon");
  const errorMessage = inputContainer.querySelector(".input__error-message");

  inputElement.classList.toggle("input__error", !showError);
  errorIcon.classList.toggle("hidden", showError);
  errorMessage.classList.toggle("hidden", showError);
}
