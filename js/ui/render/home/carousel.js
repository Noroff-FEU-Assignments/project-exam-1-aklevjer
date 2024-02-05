import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

export function renderCarousel(blogPosts, carouselTrack) {
  utils.clearElement(carouselTrack);

  blogPosts.forEach((post) => {
    const blogCard = ui.createBlogCard(post, false);
    carouselTrack.append(blogCard);
  });
}
