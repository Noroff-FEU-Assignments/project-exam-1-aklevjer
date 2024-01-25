import * as utils from "../../utils/index.js";

export function showErrorMessage(parentElement, message) {
  const errorIcon = utils.createHTMLElement("i", ["bx", "bx-error-circle", "bx-lg", "text-red"]);

  const errorTitle = utils.createHTMLElement("strong", ["text-medium", "text-red"], "Error");
  const errorBody = utils.createHTMLElement("p", null, message);

  const errorContent = utils.createHTMLElement("div", null, null, [errorTitle, errorBody]);

  const loadingSpinner = parentElement.querySelector(".loading-spinner");
  loadingSpinner.className = "error-message absolute flex items-center gap-1 rounded-corners";
  loadingSpinner.append(errorIcon, errorContent);
}
