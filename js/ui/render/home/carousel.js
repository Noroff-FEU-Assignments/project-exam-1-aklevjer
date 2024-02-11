import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

export function renderCarousel(blogPosts, carouselContainer) {
  utils.clearElement(carouselContainer);

  blogPosts.forEach((post) => {
    const blogCard = ui.createBlogCard(post, false);
    carouselContainer.append(blogCard);
  });
}
