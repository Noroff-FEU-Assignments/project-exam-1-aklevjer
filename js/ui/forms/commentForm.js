import * as api from "../../api/index.js";
import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

async function postNewComment(commentForm, postId) {
  const statusLabel = document.querySelector(".status-label");
  const commentsList = document.querySelector(".blog-post__comments__list");

  const formData = new FormData(commentForm);
  const commentData = JSON.stringify({
    post: postId,
    author_name: formData.get("name"),
    author_email: formData.get("email"),
    content: formData.get("commenttext"),
  });

  try {
    await api.postComment(commentData);
    const comments = await api.fetchComments(postId);

    ui.renderComments(commentsList, comments);
    ui.showAlertMessage(statusLabel, "success", "Your comment was posted!");

    commentForm.reset();
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(statusLabel, "error", "Oops! Failed to post comment. Please try again later.");
  }
}

function handleCommentSubmit(event, inputElements, postId) {
  event.preventDefault();

  if (utils.isFormValid(inputElements)) {
    const commentForm = event.target;
    postNewComment(commentForm, postId);
  }
}

export function initCommentForm(postId) {
  const commentForm = document.forms.comment;
  const inputElements = [commentForm.name, commentForm.email, commentForm.commenttext];

  utils.initInputListeners(inputElements);
  commentForm.addEventListener("submit", (event) => handleCommentSubmit(event, inputElements, postId));
}
