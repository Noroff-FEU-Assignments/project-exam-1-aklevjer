export class Carousel {
  constructor() {
    // Variables
    this.slideGap = 16; // 1rem
    this.slidesInView = 0;
    this.slideMaxPos = 0;
    this.slideMinPos = 0;
    this.currentPos = this.slideMinPos;

    // DOM Elements
    this.carouselContainer = document.querySelector(".carousel__container");
    this.carouselPrevBtn = document.querySelector(".carousel__btn-prev");
    this.carouselNextBtn = document.querySelector(".carousel__btn-next");
    this.carouselPaginationBtns = document.querySelectorAll(".carousel__pagination__btn");
  }

  updatePagination() {
    const prevPaginationBtn = document.querySelector(".pagination-current");
    const currentPaginationBtn = this.carouselPaginationBtns[this.currentPos];

    if (prevPaginationBtn && currentPaginationBtn) {
      prevPaginationBtn.classList.remove("pagination-current");
      currentPaginationBtn.classList.add("pagination-current");
    }
  }

  updateCarousel() {
    const slideItemWidth = this.carouselContainer.firstElementChild.offsetWidth;
    this.carouselContainer.scrollLeft = this.currentPos * this.slidesInView * (slideItemWidth + this.slideGap);
  }

  goToSlidePos(slidePos) {
    this.currentPos = slidePos;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentPos--;
    if (this.currentPos < this.slideMinPos) {
      this.currentPos = this.slideMaxPos;
    }
    this.updateCarousel();
  }

  nextSlide() {
    this.currentPos++;
    if (this.currentPos > this.slideMaxPos) {
      this.currentPos = this.slideMinPos;
    }
    this.updateCarousel();
  }

  // Monitor the scroll event to update the current position and pagination
  monitorScroll() {
    const slideItemWidth = this.carouselContainer.firstElementChild.offsetWidth;
    const slideNewPosition = this.carouselContainer.scrollLeft;

    this.currentPos = Math.round(slideNewPosition / ((slideItemWidth + this.slideGap) * this.slidesInView));
    this.updatePagination();
  }

  // Monitor the resizing of the carousel to update the amount of slides in view and max position
  monitorResize() {
    const carouselContainerWidth = this.carouselContainer.offsetWidth;
    const slideItemWidth = this.carouselContainer.firstElementChild.offsetWidth;
    const slidesAmount = this.carouselContainer.children.length;

    this.slidesInView = Math.round(carouselContainerWidth / slideItemWidth);
    this.slideMaxPos = Math.round(slidesAmount / this.slidesInView) - 1;

    this.goToSlidePos(this.slideMinPos);
  }

  initListeners() {
    this.carouselPrevBtn.addEventListener("click", () => this.prevSlide());
    this.carouselNextBtn.addEventListener("click", () => this.nextSlide());

    this.carouselPaginationBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => this.goToSlidePos(i));
    });
  }

  initMonitoring() {
    const resizeObserver = new ResizeObserver(() => this.monitorResize());
    resizeObserver.observe(this.carouselContainer);

    this.carouselContainer.addEventListener("scroll", () => this.monitorScroll());
  }

  init() {
    this.initListeners();
    this.initMonitoring();
  }
}
