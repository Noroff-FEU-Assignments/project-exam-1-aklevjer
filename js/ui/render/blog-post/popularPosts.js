import * as utils from "../../../utils/index.js";

const popularPostTemplate = `<a href="" class="popular-posts__link flex gap-1">
                               <img src="" alt="" class="popular-posts__image rounded-corners" />
                               <div>
                                 <span class="popular-posts__category"></span>
                                 <h3 class="popular-posts__title text-medium truncate-text"></h3>
                               </div>
                             </a>`;

function createPopularPost(blogPost) {
  const popularPost = utils.createHTMLElement("li");
  popularPost.innerHTML = popularPostTemplate;

  const popularPostLink = popularPost.querySelector(".popular-posts__link");
  const popularPostImage = popularPost.querySelector(".popular-posts__image");
  const popularPostCategory = popularPost.querySelector(".popular-posts__category");
  const popularPostTitle = popularPost.querySelector(".popular-posts__title");

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
