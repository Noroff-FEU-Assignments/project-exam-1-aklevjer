import * as ui from "../ui/index.js";

function isEmailValid(email) {
  const emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(email);
}

function isLengthValid(string, length) {
  const strLength = string.trim().length;
  return strLength >= length;
}

function validateInput(inputElement) {
  switch (inputElement.name) {
    case "name":
      return isLengthValid(inputElement.value, 6);
    case "subject":
    case "commenttext":
      return isLengthValid(inputElement.value, 16);
    case "message":
      return isLengthValid(inputElement.value, 26);
    case "email":
      return isEmailValid(inputElement.value);
    default:
      return false;
  }
}

export function initInputListeners(inputElements) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("change", () => {
      ui.toggleInputError(inputElement, validateInput(inputElement));
    });
  });
}

export function isFormValid(inputElements) {
  let allInputsValid = true;

  inputElements.forEach((inputElement) => {
    const inputValid = validateInput(inputElement);
    ui.toggleInputError(inputElement, inputValid);

    if (!inputValid) {
      allInputsValid = false;
    }
  });

  return allInputsValid;
}
