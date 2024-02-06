import * as ui from "../index.js";

function filterPostsByCategory(selectedCategory, allPosts) {
  return allPosts.filter((post) => {
    const categorySlug = post._embedded["wp:term"][0][0].slug;
    return categorySlug === selectedCategory;
  });
}

function handleCategory(event, allPosts) {
  const selectedCategory = event.target.value;
  const shouldRenderAll = selectedCategory === "all";
  const filteredPosts = filterPostsByCategory(selectedCategory, allPosts);

  ui.handleFilteredPosts(filteredPosts, shouldRenderAll);
}

export function initFilterByCategory(allPosts) {
  const categorySelect = document.querySelector(".category-select");
  categorySelect.addEventListener("change", (event) => handleCategory(event, allPosts));
}
