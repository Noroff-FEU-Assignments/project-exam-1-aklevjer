import * as utils from "../utils/index.js";

function openModal(modal, modalCloseBtn) {
  modal.showModal();
  modalCloseBtn.blur();
  toggleBodyScroll();

  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleKeyDown);
  modalCloseBtn.addEventListener("click", closeModal);
}

function deleteModal(modal) {
  modal.remove();
  toggleBodyScroll();

  document.removeEventListener("click", handleOutsideClick);
  document.removeEventListener("keydown", handleKeyDown);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("modal-close");
  modal.addEventListener("animationend", () => deleteModal(modal), { once: true });
}

function handleOutsideClick(event) {
  if (event.target.classList.contains("modal")) {
    closeModal();
  }
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }
}

function toggleBodyScroll() {
  document.body.classList.toggle("overflow-hidden");
}

function renderModal(image) {
  const modalImage = utils.createHTMLElement("img", "modal__image", null, null, null, image.src, image.alt);
  const modalCloseIcon = utils.createHTMLElement("i", ["bx", "bx-x", "bx-md"]);
  const modalCloseSrText = utils.createHTMLElement("span", "sr-only", "Close");
  const modalCloseBtn = utils.createHTMLElement("button", ["modal__btn", "btn", "absolute"], null, [modalCloseIcon, modalCloseSrText]);

  const modal = utils.createHTMLElement("dialog", ["modal", "overflow-hidden", "rounded-corners"], null, [modalImage, modalCloseBtn]);

  document.body.append(modal);

  openModal(modal, modalCloseBtn);
}

export function initModal(images) {
  images.forEach((image) => {
    image.addEventListener("click", () => renderModal(image));
  });
}
