import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function handleCommentSubmit(event, inputElements) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    const statusLabel = document.querySelector(".status-label");

    if (statusLabel) {
      ui.showAlertMessage(statusLabel, "success", "Your comment was sent!");
    }
  }
}

export function initCommentForm() {
  const commentForm = document.forms.comment;
  const inputElements = [commentForm.name, commentForm.commenttext];

  utils.initInputListeners(inputElements);
  commentForm.addEventListener("submit", (event) => handleCommentSubmit(event, inputElements));
}
