import * as utils from "../../utils/index.js";

const blogCardTemplate = `<a href="" class="blog-card__link">
                            <div class="relative overflow-hidden">
                              <img src="" alt="" class="blog-card__image" />
                              <span class="blog-card__category absolute text-sm"></span>
                            </div>
                            <div class="blog-card__content flow">
                              <h3 class="blog-card__content__title truncate-text"></h3>
                              <div class="flex items-center gap-0-5 text-sm">
                                <i class="bx bx-calendar bx-xs"></i>
                                <time datetime=""></time>
                              </div>
                              <p class="truncate-text"></p>
                            </div>
                          </a>`;

export function createBlogCard(blogPost) {
  const blogCard = utils.createHTMLElement("li", ["blog-card", "card"]);
  blogCard.innerHTML = blogCardTemplate;

  const blogCardLink = blogCard.querySelector("a");
  const blogCardImage = blogCard.querySelector("img");
  const blogCardCategory = blogCard.querySelector("span");
  const blogCardTitle = blogCard.querySelector("h3");
  const blogCardDate = blogCard.querySelector("time");
  const blogCardExcerpt = blogCard.querySelector("p");

  // Link
  blogCardLink.href = `/pages/blog/post/?id=${blogPost.id}`;

  // Image
  const blogPostImage = utils.getImageFromPost(blogPost);
  blogCardImage.src = blogPostImage.src;
  blogCardImage.alt = blogPostImage.alt;

  // Category
  const parsedCategory = utils.parseHTML(blogPost._embedded["wp:term"][0][0].name);
  blogCardCategory.textContent = parsedCategory.textContent;

  // Title
  const parsedTitle = utils.parseHTML(blogPost.title.rendered);
  blogCardTitle.textContent = parsedTitle.textContent;

  // Date
  blogCardDate.textContent = utils.formatPostDate(blogPost.date);
  blogCardDate.setAttribute("datetime", blogPost.date);

  // Excerpt
  const parsedExcerpt = utils.parseHTML(blogPost.excerpt.rendered);
  blogCardExcerpt.textContent = parsedExcerpt.textContent;

  return blogCard;
}
