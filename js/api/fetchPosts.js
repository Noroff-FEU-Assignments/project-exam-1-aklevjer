import * as constants from "../constants/index.js";

export async function fetchPosts(apiParams) {
  const response = await fetch(constants.apiUrl + apiParams);
  const posts = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch a list of posts");
  }

  return posts;
}

export async function fetchPostById(postId) {
  const response = await fetch(`${constants.apiUrl}/${postId}?_embed`);
  const post = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch post with the id: ${postId}`);
  }

  return post;
}
