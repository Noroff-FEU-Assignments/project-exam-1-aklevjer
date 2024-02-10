import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function blogPostPage(postId) {
  const blogPostContainer = document.querySelector(".blog-post");
  const blogPostContent = document.querySelector(".blog-post__content");
  const blogPostHero = document.querySelector(".hero");
  const blogPostAside = document.querySelector(".blog-post__aside");
  const blogPostPopularPostsList = document.querySelector(".blog-post__popular-posts__list");
  const blogPostCommentsList = document.querySelector(".blog-post__comments__list");

  try {
    const blogPost = await api.fetchPostById(postId);

    const blogPostTitle = utils.getParsedText(blogPost.title.rendered);
    utils.setPageTitle(`Shutter Journey - ${blogPostTitle}`);

    ui.renderBlogPost(blogPost, blogPostHero, blogPostContent);
    ui.initCommentForm(postId);
  } catch (error) {
    blogPostHero.remove();
    blogPostAside.remove();

    console.error(error);
    ui.showAlertMessage(blogPostContent, "error", "Oops! Failed to load blog post. Please try again later.");
    return;
  } finally {
    blogPostContainer.classList.replace("hidden", "flex");
  }

  try {
    const popularPosts = await api.fetchPosts(constants.apiParamsPopular);
    ui.renderPopularPosts(popularPosts, blogPostPopularPostsList);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(blogPostPopularPostsList, "error", "Oops! Failed to load popular posts. Please try again later.");
  }

  try {
    const comments = await api.fetchComments(postId);
    ui.renderComments(blogPostCommentsList, comments);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(blogPostCommentsList, "error", "Oops! Failed to load comments. Please try again later.");
  }
}
