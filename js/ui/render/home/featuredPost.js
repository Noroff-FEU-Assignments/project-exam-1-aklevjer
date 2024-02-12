import * as utils from "../../../utils/index.js";

const featuredPostTemplate = `<img src="" alt="" class="featured-post__article__image rounded-corners" />
                              <div class="flow">
                                <h3 class="featured-post__article__title"></h3>
                                <div class="featured-post__article__meta bullet-separator flex gap-0-5 text-sm">
                                  <div class="flex items-center gap-0-5">
                                    <img src="" alt="" class="featured-post__article__author-avatar rounded-full" />
                                    <span class="featured-post__article__author-name"></span>
                                  </div>
                                  <div class="flex items-center gap-0-5">
                                    <i class="bx bx-calendar bx-xs"></i>
                                    <time datetime="" class="featured-post__article__date"></time>
                                  </div>
                                </div>
                                <p class="featured-post__article__body text-short truncate-text"></p>
                                <a href="" class="featured-post__article__link btn btn-dark"></a>
                              </div>`;

export function renderFeaturedPost(blogPost, featuredPostContainer) {
  const featuredPost = utils.createHTMLElement("article", ["featured-post__article", "grid", "place-items-center", "gap-2"]);
  featuredPost.innerHTML = featuredPostTemplate;

  const featuredPostImage = featuredPost.querySelector(".featured-post__article__image");
  const featuredPostTitle = featuredPost.querySelector(".featured-post__article__title");
  const featuredPostAuthorAvatar = featuredPost.querySelector(".featured-post__article__author-avatar");
  const featuredPostAuthorName = featuredPost.querySelector(".featured-post__article__author-name");
  const featuredPostDate = featuredPost.querySelector(".featured-post__article__date");
  const featuredPostBody = featuredPost.querySelector(".featured-post__article__body");
  const featuredPostLink = featuredPost.querySelector(".featured-post__article__link");

  // Image
  const blogPostImage = utils.getImageFromPost(blogPost);
  featuredPostImage.src = blogPostImage.src;
  featuredPostImage.alt = blogPostImage.alt;

  // Title
  featuredPostTitle.textContent = utils.getParsedText(blogPost.title.rendered);

  // Author avatar
  featuredPostAuthorAvatar.src = blogPost._embedded["author"][0].avatar_urls[24];
  featuredPostAuthorAvatar.alt = "Avatar for the author of the article";

  // Author name
  featuredPostAuthorName.textContent = blogPost._embedded["author"][0].name;

  // Date
  featuredPostDate.textContent = utils.formatPostDate(blogPost.date);
  featuredPostDate.setAttribute("datetime", blogPost.date);

  // Content
  const parsedContent = utils.parseHTML(blogPost.content.rendered);
  featuredPostBody.textContent = parsedContent.firstElementChild.textContent;

  // Link
  featuredPostLink.href = `/pages/blog/post/?id=${blogPost.id}`;
  featuredPostLink.textContent = "Read now";

  // Replace the placeholder container
  featuredPostContainer.replaceWith(featuredPost);
}
