import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

const postsPerPage = 10;

let currentPage = 1;
let totalPages;
let allPosts = [];

function renderPosts(posts, clearElement) {
  const blogList = document.querySelector(".blog-list");

  if (clearElement) {
    utils.clearElement(blogList);
  }

  posts.forEach((post) => {
    const blogCard = ui.createBlogCard(post, true);
    blogList.append(blogCard);
  });
}

function getPaginatedPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return allPosts.slice(startIndex, endIndex);
}

function hideShowMoreBtn(shouldHide) {
  const showMoreBtn = document.querySelector(".btn-show-more");
  showMoreBtn.classList.toggle("hidden", shouldHide);
}

function showMore() {
  currentPage++;
  renderPosts(getPaginatedPosts(), false);

  if (currentPage >= totalPages) {
    hideShowMoreBtn(true);
  }
}

function initShowMoreBtn() {
  const showMoreBtn = document.querySelector(".btn-show-more");
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

  initShowMoreBtn();

  if (!searchQuery) {
    renderPosts(getPaginatedPosts(), true);
    hideShowMoreBtn(false);
  }
}
