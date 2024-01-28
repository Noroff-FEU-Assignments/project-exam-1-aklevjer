import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function blogPostPage(id) {
  const blogPostHero = document.querySelector(".hero");
  const blogPostArticle = document.querySelector(".blog-post__article");
  const popularPostsList = document.querySelector(".popular-posts__list");

  try {
    const blogPost = await api.fetchPostById(id);

    const blogPostTitle = utils.getParsedText(blogPost.title.rendered);
    utils.updatePageTitle(blogPostTitle);

    ui.renderBlogPost(blogPost, blogPostHero, blogPostArticle);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(blogPostArticle, "Oops! Failed to load blog post. Please try again later.");
    utils.clearElement(blogPostHero);
  }

  try {
    const popularPosts = await api.fetchPosts(constants.apiParamsPopular);

    ui.renderPopularPosts(popularPosts, popularPostsList);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(popularPostsList, "Oops! Failed to load popular posts. Please try again later.");
  }
}
