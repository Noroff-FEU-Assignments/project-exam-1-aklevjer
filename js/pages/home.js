import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function homePage() {
  const carousel = document.querySelector(".carousel");
  const featuredPostContainer = document.querySelector(".featured-post__container");

  try {
    const latestPosts = await api.fetchPosts(constants.apiParamsLatest);

    utils.clearElement(carousel);

    latestPosts.forEach((post) => {
      const blogCard = ui.createBlogCard(post, false);
      carousel.append(blogCard);
    });

    ui.initCarousel();
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(carousel, "Oops! Failed to load latest posts. Please try again later.");
  }

  try {
    const featuredPosts = await api.fetchPosts(constants.apiParamsFeatured);

    ui.renderFeaturedPost(featuredPosts[0], featuredPostContainer);
  } catch (error) {
    console.error(error);
    ui.showErrorMessage(featuredPostContainer, "Oops! Failed to load featured post. Please try again later.");
  }
}
