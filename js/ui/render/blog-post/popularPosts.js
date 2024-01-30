import * as utils from "../../../utils/index.js";

const popularPostTemplate = `<a href="" class="flex gap-1">
                               <img src="" alt="" class="popular-posts__image rounded-corners" />
                               <div>
                                 <span></span>
                                 <h3 class="text-medium truncate-text"></h3>
                               </div>
                             </a>`;

function createPopularPost(blogPost) {
  const popularPost = utils.createHTMLElement("li");
  popularPost.innerHTML = popularPostTemplate;

  const popularPostLink = popularPost.querySelector("a");
  const popularPostImage = popularPost.querySelector("img");
  const popularPostCategory = popularPost.querySelector("span");
  const popularPostTitle = popularPost.querySelector("h3");

  // Link
  popularPostLink.href = `/pages/blog/post/?id=${blogPost.id}`;

  // Image
  const blogPostImage = utils.getImageFromPost(blogPost);
  popularPostImage.src = blogPostImage.src;
  popularPostImage.alt = blogPostImage.alt;

  // Category
  popularPostCategory.textContent = utils.getParsedText(blogPost._embedded["wp:term"][0][0].name);

  // Title
  popularPostTitle.textContent = utils.getParsedText(blogPost.title.rendered);

  return popularPost;
}

export function renderPopularPosts(popularPosts, popularPostsList) {
  utils.clearElement(popularPostsList);

  popularPosts.forEach((blogPost) => {
    const popularPost = createPopularPost(blogPost);
    popularPostsList.append(popularPost);
  });
}
