import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function blogPage() {
  const blogList = document.querySelector(".blog-list");

  try {
    const allPosts = await api.fetchPosts(constants.apiParamsAll);

    utils.clearElement(blogList);

    allPosts.forEach((post) => {
      const blogCard = ui.createBlogCard(post, true);
      blogList.append(blogCard);
    });
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(blogList, "Oops! Failed to load posts. Please try again later.");
  }
}
