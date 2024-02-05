import * as utils from "../../../utils/index.js";

const commentTemplate = `<div class="bullet-separator flex items-center gap-0-5">
                           <h3 class="blog-post__comment__author"></h3>
                           <time datetime="" class="blog-post__comment__date"></time>
                         </div>
                         <p class="blog-post__comment__body"></p>`;

function createComment(comment) {
  const commentContainer = utils.createHTMLElement("li", "flow");
  commentContainer.innerHTML = commentTemplate;

  const commentAuthor = commentContainer.querySelector(".blog-post__comment__author");
  const commentDate = commentContainer.querySelector(".blog-post__comment__date");
  const commentBody = commentContainer.querySelector(".blog-post__comment__body");

  // Comment author
  commentAuthor.textContent = comment.author_name;

  // Comment date
  commentDate.textContent = utils.formatPostDate(comment.date);
  commentDate.setAttribute("datetime", comment.date);

  // Comment body
  commentBody.textContent = utils.getParsedText(comment.content.rendered);

  return commentContainer;
}

function renderListOfComments(commentsList, comments) {
  comments.sort((a, b) => new Date(a.date) - new Date(b.date));

  comments.forEach((comment) => {
    const commentContainer = createComment(comment);
    commentsList.append(commentContainer);
  });
}

function renderEmptyCommentText(commentsList) {
  const emptyCommentText = utils.createHTMLElement("p", null, "No comments yet");
  const emptyCommentContainer = utils.createHTMLElement("li", null, null, emptyCommentText);

  commentsList.append(emptyCommentContainer);
}

function renderCommentCount(commentCount) {
  const commentsTitle = document.querySelector(".blog-post__comments__title");
  const blogPostCommentCount = document.querySelector(".blog-post__comment-count");

  if (commentsTitle && blogPostCommentCount) {
    commentsTitle.textContent = `Comments (${commentCount})`;
    blogPostCommentCount.textContent = `${commentCount} Comment${commentCount !== 1 ? "s" : ""}`;
  }
}

export function renderComments(commentsList, comments) {
  utils.clearElement(commentsList);

  const commentCount = comments.length;
  renderCommentCount(commentCount);

  if (commentCount) {
    renderListOfComments(commentsList, comments);
  } else {
    renderEmptyCommentText(commentsList);
  }
}
