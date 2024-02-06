import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function filterPostsBySearch(searchQuery, allPosts) {
  return allPosts.filter((post) => {
    const parsedTitle = utils.getParsedText(post.title.rendered);
    return parsedTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

function handleSearch(event, allPosts) {
  const searchQuery = event.target.value;
  const shouldRenderAll = searchQuery.trim() === "";
  const filteredPosts = filterPostsBySearch(searchQuery, allPosts);

  ui.handleFilteredPosts(filteredPosts, shouldRenderAll);
}

function initialSearch(initialSearchQuery, allPosts, searchInput) {
  const filteredPosts = filterPostsBySearch(initialSearchQuery, allPosts);

  searchInput.value = initialSearchQuery;
  ui.handleFilteredPosts(filteredPosts, false);
}

export function initFilterBySearch(allPosts, initialSearchQuery) {
  const searchInput = document.querySelector(".search-input");
  const processInput = utils.debounce((event) => handleSearch(event, allPosts));

  searchInput.addEventListener("input", processInput);

  if (initialSearchQuery) {
    initialSearch(initialSearchQuery, allPosts, searchInput);
  }
}
