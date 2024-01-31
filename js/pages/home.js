import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";

export async function homePage() {
  const carouselContainer = document.querySelector(".carousel");
  const featuredPostContainer = document.querySelector(".featured-post__container");

  try {
    const latestPosts = await api.fetchPosts(constants.apiParamsLatest);

    ui.renderCarousel(latestPosts, carouselContainer);
    ui.initCarousel();
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(carouselContainer, "error", "Oops! Failed to load latest posts. Please try again later.");
  }

  try {
    const featuredPosts = await api.fetchPosts(constants.apiParamsFeatured);

    ui.renderFeaturedPost(featuredPosts[0], featuredPostContainer);
  } catch (error) {
    console.error(error);
    ui.showAlertMessage(featuredPostContainer, "error", "Oops! Failed to load featured post. Please try again later.");
  }

  ui.initNewsletterForm();
}
