import * as api from "../api/index.js";
import * as constants from "../constants/index.js";
import * as ui from "../ui/index.js";
import * as utils from "../utils/index.js";

export async function homePage() {
  const carousel = document.querySelector(".carousel");

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
}
