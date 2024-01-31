import * as constants from "../constants/index.js";

export async function fetchComments(postId) {
  const response = await fetch(`${constants.apiBaseUrl}${constants.apiEndpointComments}?post=${postId}`);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to fetch a list of comments");
}
