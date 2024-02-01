import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function blogPostPage(postId) {
  const blogPostHero = document.querySelector(".hero");
  const blogPostArticle = document.querySelector(".blog-post__article");
  const popularPostsList = document.querySelector(".popular-posts__list");
  const commentsList = document.querySelector(".comments__list");

  try {
    const blogPost = await api.fetchPostById(postId);

    const blogPostTitle = utils.getParsedText(blogPost.title.rendered);
    utils.updatePageTitle(blogPostTitle);

    ui.renderBlogPost(blogPost, blogPostHero, blogPostArticle);
    ui.initCommentForm(postId);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(blogPostArticle, "error", "Oops! Failed to load blog post. Please try again later.");
    utils.clearElement(blogPostHero);
  }

  try {
    const popularPosts = await api.fetchPosts(constants.apiParamsPopular);
    ui.renderPopularPosts(popularPosts, popularPostsList);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(popularPostsList, "error", "Oops! Failed to load popular posts. Please try again later.");
  }

  try {
    const comments = await api.fetchComments(postId);
    ui.renderComments(commentsList, comments);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(commentsList, "error", "Oops! Failed to load comments. Please try again later.");
  }
}
