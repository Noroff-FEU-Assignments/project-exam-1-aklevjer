import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

const postsPerPage = 10;

let currentPage = 1;
let totalPages;
let allPosts;

function updateShowMoreBtn(shouldRenderAll) {
  const showMoreBtn = document.querySelector(".blog-posts__btn-show-more");
  const shouldHide = !shouldRenderAll || currentPage >= totalPages;

  showMoreBtn.classList.toggle("hidden", shouldHide);
}

function renderPosts(posts, shouldClearElement, shouldRenderAll) {
  const blogPostsList = document.querySelector(".blog-posts__list");

  if (shouldClearElement) {
    utils.clearElement(blogPostsList);
  }

  posts.forEach((post) => {
    const blogCard = ui.createBlogCard(post, true);
    blogPostsList.append(blogCard);
  });

  updateShowMoreBtn(shouldRenderAll);
}

function getPaginatedPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return allPosts.slice(startIndex, endIndex);
}

function showMore() {
  currentPage++;
  renderPosts(getPaginatedPosts(), false, true);
}

function initShowMore() {
  const showMoreBtn = document.querySelector(".blog-posts__btn-show-more");
  showMoreBtn.addEventListener("click", showMore);
}

export function handleFilteredPosts(filteredPosts, shouldRenderAll) {
  currentPage = 1;
  const posts = shouldRenderAll ? getPaginatedPosts() : filteredPosts;
  renderPosts(posts, true, shouldRenderAll);
}

export function initBlogListing(blogPosts, initialSearchQuery) {
  allPosts = blogPosts;
  totalPages = Math.ceil(allPosts.length / postsPerPage);

  initShowMore();

  if (!initialSearchQuery) {
    renderPosts(getPaginatedPosts(), true, true);
  }
}
