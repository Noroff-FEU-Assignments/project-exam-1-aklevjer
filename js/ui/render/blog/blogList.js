import * as ui from "../../index.js";
import * as utils from "../../../utils/index.js";

export class BlogListing {
  constructor(blogPosts, searchQuery) {
    // Variables
    this.postsPerPage = 10;
    this.currentPage = 1;
    this.totalPages = Math.ceil(blogPosts.length / this.postsPerPage);
    this.allPosts = blogPosts;
    this.searchQuery = searchQuery;

    // DOM Elements
    this.blogPostsList = document.querySelector(".blog-posts__list");
    this.showMoreBtn = document.querySelector(".blog-posts__btn-show-more");
    this.searchInput = document.querySelector(".search-input");
    this.categorySelect = document.querySelector(".category-select");
  }

  renderPosts(posts) {
    posts.forEach((post) => {
      const blogCard = ui.createBlogCard(post, true);
      this.blogPostsList.append(blogCard);
    });
  }

  getPaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;

    return this.allPosts.slice(startIndex, endIndex);
  }

  showMore() {
    this.currentPage++;
    this.renderPosts(this.getPaginatedPosts());

    if (this.currentPage >= this.totalPages) {
      utils.hideElement(this.showMoreBtn, true);
    }
  }

  handleFilteredPosts(filteredPosts, shouldRenderAll) {
    utils.hideElement(this.showMoreBtn, !shouldRenderAll);
    utils.clearElement(this.blogPostsList);

    this.currentPage = 1;
    const posts = shouldRenderAll ? this.getPaginatedPosts() : filteredPosts;
    this.renderPosts(posts);
  }

  handleSearch(event) {
    const searchQuery = event.target.value;
    const shouldRenderAll = searchQuery.trim() === "";
    const filteredPosts = utils.filterPostsBySearch(searchQuery, this.allPosts);

    this.handleFilteredPosts(filteredPosts, shouldRenderAll);
  }

  handleCategory(event) {
    const selectedCategory = event.target.value;
    const shouldRenderAll = selectedCategory === "all";
    const filteredPosts = utils.filterPostsByCategory(selectedCategory, this.allPosts);

    this.handleFilteredPosts(filteredPosts, shouldRenderAll);
  }

  handleInitialSearch() {
    const filteredPosts = utils.filterPostsBySearch(this.searchQuery, this.allPosts);
    this.searchInput.value = this.searchQuery;
    this.renderPosts(filteredPosts);
  }

  initListeners() {
    const processInput = utils.debounce((event) => this.handleSearch(event));

    this.categorySelect.addEventListener("change", (event) => this.handleCategory(event));
    this.searchInput.addEventListener("input", (event) => processInput(event));
    this.showMoreBtn.addEventListener("click", () => this.showMore());
  }

  init() {
    this.initListeners();

    utils.clearElement(this.blogPostsList);

    if (this.searchQuery) {
      this.handleInitialSearch();
    } else {
      this.renderPosts(this.getPaginatedPosts());
      utils.hideElement(this.showMoreBtn, false);
    }
  }
}
