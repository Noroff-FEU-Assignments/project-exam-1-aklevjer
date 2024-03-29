import * as constants from "../constants/index.js";

export async function fetchPosts(apiParams) {
  const response = await fetch(`${constants.apiUrlPosts}${apiParams}&_embed`);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to fetch a list of posts");
}

export async function fetchPostById(postId) {
  const response = await fetch(`${constants.apiUrlPosts}/${postId}?_embed`);

  if (response.ok) {
    return await response.json();
  }

  throw new Error(`Failed to fetch post with the id: ${postId}`);
}
