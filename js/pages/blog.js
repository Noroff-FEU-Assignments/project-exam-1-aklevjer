import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function blogPage() {
  const blogList = document.querySelector(".blog-list");
  const categorySelect = document.querySelector(".category-select");

  try {
    const allPosts = await api.fetchPosts(constants.apiParamsAll);
    ui.initBlogListing(allPosts, blogList);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(blogList, "Oops! Failed to load posts. Please try again later.");
  }

  try {
    const categories = await api.fetchCategories();
    ui.renderCategories(categories, categorySelect);
  } catch (error) {
    console.error(error);
  }
}
