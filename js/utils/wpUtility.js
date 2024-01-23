import * as utils from "./index.js";

export function getImageFromPost(post) {
  const parsedPost = utils.parseHTML(post.content.rendered);
  return parsedPost.querySelector(".wp-block-image img");
}

export function formatPostDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}
