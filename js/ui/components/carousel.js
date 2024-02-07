const slideGap = 16; // 1rem
const slideMinPos = 0;

let currentPos = slideMinPos;
let slideMaxPos;
let slidesInView;

function updatePagination() {
  const paginationBtns = document.querySelectorAll(".carousel__pagination__btn");
  const prevPaginationBtn = document.querySelector(".pagination-current");
  const currentPaginationBtn = paginationBtns[currentPos];

  if (prevPaginationBtn && currentPaginationBtn) {
    prevPaginationBtn.classList.remove("pagination-current");
    currentPaginationBtn.classList.add("pagination-current");
  }
}

function updateCarousel() {
  const carouselTrack = document.querySelector(".carousel__track");
  const slideItemWidth = carouselTrack.firstElementChild.offsetWidth;

  carouselTrack.scrollLeft = currentPos * slidesInView * (slideItemWidth + slideGap);
}

function goToSlidePos(slidePos) {
  currentPos = slidePos;
  updateCarousel();
}

function prevSlide() {
  currentPos--;
  if (currentPos < slideMinPos) {
    currentPos = slideMaxPos;
  }
  updateCarousel();
}

function nextSlide() {
  currentPos++;
  if (currentPos > slideMaxPos) {
    currentPos = slideMinPos;
  }
  updateCarousel();
}

// Monitor the scroll event to update the current position and pagination
function monitorScroll(carouselTrack) {
  const slideItemWidth = carouselTrack.firstElementChild.offsetWidth;
  const slideNewPosition = carouselTrack.scrollLeft;

  currentPos = Math.round(slideNewPosition / ((slideItemWidth + slideGap) * slidesInView));
  updatePagination();
}

// Monitor the resizing of the carousel to update the amount of slides in view and max position
function monitorResize(entries) {
  const carouselTrack = entries[0];
  const carouselTrackWidth = carouselTrack.contentRect.width;
  const slideItemWidth = carouselTrack.target.firstElementChild.offsetWidth;
  const slidesAmount = carouselTrack.target.children.length;

  slidesInView = Math.round(carouselTrackWidth / slideItemWidth);
  slideMaxPos = Math.round(slidesAmount / slidesInView) - 1;

  goToSlidePos(slideMinPos);
}

function initCarouselListeners() {
  const carouselPrevBtn = document.querySelector(".carousel__btn-prev");
  const carouselNextBtn = document.querySelector(".carousel__btn-next");
  const carouselPaginationBtns = document.querySelectorAll(".carousel__pagination__btn");

  carouselPrevBtn.addEventListener("click", prevSlide);
  carouselNextBtn.addEventListener("click", nextSlide);

  carouselPaginationBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => goToSlidePos(i));
  });
}

function initCarouselMonitoring() {
  const carouselTrack = document.querySelector(".carousel__track");
  const resizeObserver = new ResizeObserver((entries) => monitorResize(entries));

  carouselTrack.addEventListener("scroll", () => monitorScroll(carouselTrack));
  resizeObserver.observe(carouselTrack);
}

export function initCarousel() {
  initCarouselListeners();
  initCarouselMonitoring();
}
