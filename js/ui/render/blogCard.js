import * as utils from "../../utils/index.js";

const blogCardTemplate = `<a href="" class="blog-card__link">
                            <div class="blog-card__image-container relative overflow-hidden">
                              <img src="" alt="" class="blog-card__image" />
                              <span class="blog-card__category absolute text-sm"></span>
                            </div>
                            <div class="blog-card__content flow">
                              <div class="flex items-center gap-0-5 text-sm">
                                <i class="bx bx-calendar bx-xs"></i>
                                <time datetime="" class="blog-card__content__time"></time>
                              </div>
                              <p class="blog-card__content__excerpt truncate-text"></p>
                            </div>
                          </a>`;

export function createBlogCard(blogPost, isBlogPage) {
  const blogCard = utils.createHTMLElement("li", ["blog-card", "card"]);
  blogCard.innerHTML = blogCardTemplate;

  const blogCardLink = blogCard.querySelector(".blog-card__link");
  const blogCardImage = blogCard.querySelector(".blog-card__image");
  const blogCardCategory = blogCard.querySelector(".blog-card__category");
  const blogCardContent = blogCard.querySelector(".blog-card__content");
  const blogCardDate = blogCard.querySelector(".blog-card__content__time");
  const blogCardExcerpt = blogCard.querySelector(".blog-card__content__excerpt");

  // Link
  blogCardLink.href = `/pages/blog/post/?id=${blogPost.id}`;
  isBlogPage && blogCardLink.classList.add("flex", "flex-wrap");

  // Image
  const blogPostImage = utils.getImageFromPost(blogPost);
  blogCardImage.src = blogPostImage.src;
  blogCardImage.alt = blogPostImage.alt;

  // Category
  blogCardCategory.textContent = utils.getParsedText(blogPost._embedded["wp:term"][0][0].name);

  // Title
  const blogCardTitle = utils.createHTMLElement(isBlogPage ? "h2" : "h3", ["blog-card__content__title", "truncate-text"]);
  blogCardTitle.textContent = utils.getParsedText(blogPost.title.rendered);
  blogCardContent.prepend(blogCardTitle);

  // Date
  blogCardDate.textContent = utils.formatPostDate(blogPost.date);
  blogCardDate.setAttribute("datetime", blogPost.date);

  // Excerpt
  blogCardExcerpt.textContent = utils.getParsedText(blogPost.excerpt.rendered);

  return blogCard;
}
