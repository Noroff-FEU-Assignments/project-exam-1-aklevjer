import * as ui from "../index.js";
import * as utils from "../../utils/index.js";

const blogPostTemplate = `<span class="blog-card__category rounded-corners"></span>
                          <h1 class="blog-post__title"></h1>
                          <div class="blog-post__meta bullet-separator flex flex-wrap gap-0-5 text-sm overflow-hidden">
                            <div class="flex items-center gap-0-5">
                              <img src="" alt="" class="blog-post__author-avatar rounded-full" />
                              <span class="blog-post__author-name"></span>
                            </div>
                            <div class="flex items-center gap-0-5">
                              <i class="bx bx-calendar bx-xs"></i>
                              <time datetime="" class="blog-post__date"></time>
                            </div>
                            <div class="hidden items-center gap-0-5">
                              <i class="bx bx-comment bx-xs"></i>
                              <span class="blog-post__comment-count"></span>
                            </div>
                          </div>`;

export function renderBlogPost(blogPost, blogPostHero, blogPostArticle) {
  blogPostArticle.innerHTML = blogPostTemplate;

  const blogPostCategory = document.querySelector(".blog-card__category");
  const blogPostTitle = document.querySelector(".blog-post__title");
  const blogPostAuthorAvatar = document.querySelector(".blog-post__author-avatar");
  const blogPostAuthorName = document.querySelector(".blog-post__author-name");
  const blogPostDate = document.querySelector(".blog-post__date");

  // Hero image
  const featuredImgSrc = blogPost._embedded["wp:featuredmedia"][0].source_url;
  const featuredImgAlt = blogPost._embedded["wp:featuredmedia"][0].alt_text;
  const heroImage = utils.createHTMLElement("img", "hero", null, null, null, featuredImgSrc, featuredImgAlt);
  blogPostHero.replaceWith(heroImage);

  // Category
  const parsedCategory = utils.parseHTML(blogPost._embedded["wp:term"][0][0].name);
  blogPostCategory.textContent = parsedCategory.textContent;

  // Title
  const parsedTitle = utils.parseHTML(blogPost.title.rendered);
  blogPostTitle.textContent = parsedTitle.textContent;

  // Author avatar
  const avatarUrl = blogPost._embedded["author"][0].avatar_urls[24];
  blogPostAuthorAvatar.src = avatarUrl;
  blogPostAuthorAvatar.alt = "Avatar for the author of the article";

  // Author name
  const authorName = blogPost._embedded["author"][0].name;
  blogPostAuthorName.textContent = authorName;

  // Date
  blogPostDate.textContent = utils.formatPostDate(blogPost.date);
  blogPostDate.setAttribute("datetime", blogPost.date);

  // Content
  const parsedContent = utils.parseHTML(blogPost.content.rendered);

  // Modal for images
  const blogPostImages = Array.from(parsedContent.querySelectorAll("img"));
  blogPostImages.push(heroImage);
  ui.initModal(blogPostImages);

  // Append content
  blogPostArticle.append(...parsedContent.children);
}
