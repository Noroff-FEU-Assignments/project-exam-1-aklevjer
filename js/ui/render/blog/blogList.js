import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

const postsPerPage = 10;

let currentPage = 1;
let totalPages;
let allPosts = [];

function renderPosts(posts, clearElement) {
  const blogPostsList = document.querySelector(".blog-posts__list");

  if (clearElement) {
    utils.clearElement(blogPostsList);
  }

  posts.forEach((post) => {
    const blogCard = ui.createBlogCard(post, true);
    blogPostsList.append(blogCard);
  });
}

function getPaginatedPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return allPosts.slice(startIndex, endIndex);
}

function hideShowMoreBtn(shouldHide) {
  const showMoreBtn = document.querySelector(".blog-posts__btn-show-more");
  showMoreBtn.classList.toggle("hidden", shouldHide);
}

function showMore() {
  currentPage++;
  renderPosts(getPaginatedPosts(), false);

  if (currentPage >= totalPages) {
    hideShowMoreBtn(true);
  }
}

function initShowMore() {
  const showMoreBtn = document.querySelector(".blog-posts__btn-show-more");
  showMoreBtn.addEventListener("click", showMore);
}

export function handleFilteredPosts(filteredPosts, renderAll) {
  const postsToRender = renderAll ? getPaginatedPosts() : filteredPosts;
  currentPage = 1;
  hideShowMoreBtn(!renderAll);
  renderPosts(postsToRender, true);
}

export function initBlogListing(blogPosts, searchQuery) {
  allPosts = blogPosts;
  totalPages = Math.ceil(allPosts.length / postsPerPage);

  initShowMore();

  if (!searchQuery) {
    renderPosts(getPaginatedPosts(), true);
    hideShowMoreBtn(false);
  }
}
