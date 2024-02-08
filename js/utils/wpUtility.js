import * as utils from "./index.js";

export function getImageFromPost(post) {
  const parsedPost = utils.parseHTML(post.content.rendered);
  return parsedPost.querySelector("img");
}

export function formatPostDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function filterPostsBySearch(searchQuery, posts) {
  return posts.filter((post) => {
    const parsedTitle = utils.getParsedText(post.title.rendered);
    return parsedTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

export function filterPostsByCategory(selectedCategory, posts) {
  return posts.filter((post) => {
    const categorySlug = post._embedded["wp:term"][0][0].slug;
    return categorySlug === selectedCategory;
  });
}
