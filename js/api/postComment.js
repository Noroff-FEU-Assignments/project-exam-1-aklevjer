import * as constants from "../constants/index.js";

export async function postComment(commentData) {
  const response = await fetch(constants.apiUrlComments, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: commentData,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to post comment");
}
