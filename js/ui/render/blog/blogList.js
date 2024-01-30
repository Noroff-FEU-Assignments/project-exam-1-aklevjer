import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

const postsPerPage = 10;

let currentPage = 1;
let totalPages;
let allPosts = [];

function renderPosts(blogList) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const postsToRender = allPosts.slice(startIndex, endIndex);

  postsToRender.forEach((post) => {
    const blogCard = ui.createBlogCard(post, true);
    blogList.append(blogCard);
  });
}

function showMore(blogList, showMoreBtn) {
  currentPage++;
  renderPosts(blogList);

  if (currentPage >= totalPages) {
    showMoreBtn.classList.add("hidden");
  }
}

export function initBlogListing(blogPosts, blogList) {
  allPosts = blogPosts;
  totalPages = Math.ceil(allPosts.length / postsPerPage);

  utils.clearElement(blogList);
  renderPosts(blogList);

  const showMoreBtn = document.querySelector(".btn-show-more");
  showMoreBtn.addEventListener("click", () => showMore(blogList, showMoreBtn));
}
