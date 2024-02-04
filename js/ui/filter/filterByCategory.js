import * as ui from "../index.js";

function filterPostsByCategory(event, allPosts) {
  const selectedCategory = event.target.value;
  const renderAll = selectedCategory === "all";

  const filteredPosts = allPosts.filter((post) => {
    const categorySlug = post._embedded["wp:term"][0][0].slug;
    return categorySlug === selectedCategory;
  });

  ui.handleFilteredPosts(filteredPosts, renderAll);
}

export function initFilterByCategory(allPosts) {
  const categorySelect = document.querySelector(".category-select");
  categorySelect.addEventListener("change", (event) => filterPostsByCategory(event, allPosts));
}
