import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function homePage() {
  try {
    const latestPosts = await api.fetchPosts(constants.apiParamsLatest);
    const carousel = document.querySelector(".carousel");

    latestPosts.forEach((post) => {
      const createdPost = ui.createBlogCard(post, false);
      carousel.append(createdPost);
    });
  } catch (error) {
    console.error(error);
  }
}
