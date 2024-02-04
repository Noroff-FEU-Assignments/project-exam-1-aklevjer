import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

function filterPostsBySearch(event, allPosts) {
  const searchQuery = event.target.value;
  const renderAll = searchQuery.trim() === "";

  const filteredPosts = allPosts.filter((post) => {
    const parsedTitle = utils.getParsedText(post.title.rendered);
    return parsedTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  ui.handleFilteredPosts(filteredPosts, renderAll);
}

function initialSearch(initialSearchQuery, allPosts, searchInput) {
  const filteredPosts = allPosts.filter((post) => {
    const parsedTitle = utils.getParsedText(post.title.rendered);
    return parsedTitle.toLowerCase().includes(initialSearchQuery.toLowerCase());
  });

  searchInput.value = initialSearchQuery;
  ui.handleFilteredPosts(filteredPosts, false);
}

export function initFilterBySearch(allPosts, initialSearchQuery) {
  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("input", (event) => filterPostsBySearch(event, allPosts));

  if (initialSearchQuery) {
    initialSearch(initialSearchQuery, allPosts, searchInput);
  }
}
