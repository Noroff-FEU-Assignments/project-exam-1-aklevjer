import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function blogPage(searchQuery) {
  const blogPostsList = document.querySelector(".blog-posts__list");
  const categorySelect = document.querySelector(".category-select");

  try {
    const allPosts = await api.fetchPosts(constants.apiParamsAll);

    const blogListing = new ui.BlogListing(allPosts, searchQuery);
    blogListing.init();
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(blogPostsList, "error", "Oops! Failed to load posts. Please try again later.");
  }

  try {
    const categories = await api.fetchCategories();
    ui.renderCategories(categories, categorySelect);
  } catch (error) {
    console.error(error);
  }
}
