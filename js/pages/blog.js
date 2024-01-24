import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function blogPage() {
  try {
    const allPosts = await api.fetchPosts(constants.apiParamsAll);
    const blogList = document.querySelector(".blog-list");

    allPosts.forEach((post) => {
      const createdPost = ui.createBlogCard(post, true);
      blogList.append(createdPost);
    });
  } catch (error) {
    console.error(error);
  }
}
