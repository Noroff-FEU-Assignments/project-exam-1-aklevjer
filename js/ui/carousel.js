import * as constants from "../constants/index.js";

let currentPos = constants.slideMinPos;
let slideMaxPos = 0;
let slidesInView = 0;

function updatePagination() {
  const prevPaginationBtn = document.querySelector(".active-pagination");
  prevPaginationBtn?.classList.remove("active-pagination");

  const paginationBtns = document.querySelectorAll(".pagination__btn");
  paginationBtns[currentPos]?.classList.add("active-pagination");
}

function updateSlider() {
  const slider = document.querySelector(".carousel");
  const slideItemWidth = slider.firstElementChild.offsetWidth;

  slider.scrollLeft = currentPos * slidesInView * (slideItemWidth + constants.slideGap);
}

function goToSlidePos(slidePos) {
  currentPos = slidePos;
  updateSlider();
}

function prevSlide() {
  currentPos--;
  if (currentPos < constants.slideMinPos) {
    currentPos = slideMaxPos;
  }
  updateSlider();
}

function nextSlide() {
  currentPos++;
  if (currentPos > slideMaxPos) {
    currentPos = constants.slideMinPos;
  }
  updateSlider();
}

// Monitor the scroll event to update the current position and pagination
function monitorScroll(event) {
  const slider = event.target;
  const slideItemWidth = slider.firstElementChild.offsetWidth;
  const newPosition = slider.scrollLeft;

  currentPos = Math.round(newPosition / ((slideItemWidth + constants.slideGap) * slidesInView));
  updatePagination();
}

// Monitor the resizing of the carousel to update the amount of slides in view and max position
function monitorResize(entries) {
  const slider = entries[0];
  const sliderWidth = slider.contentRect.width;
  const slideItemWidth = slider.target.firstElementChild.offsetWidth;
  const slidesAmount = slider.target.children.length;

  slidesInView = Math.round(sliderWidth / slideItemWidth);
  slideMaxPos = Math.round(slidesAmount / slidesInView) - 1;

  goToSlidePos(constants.slideMinPos);
}

function initCarouselListeners() {
  const prevBtn = document.querySelector(".prev-button");
  const nextBtn = document.querySelector(".next-button");
  const paginationBtns = document.querySelectorAll(".pagination__btn");

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  paginationBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => goToSlidePos(i));
  });
}

function initCarouselMonitoring() {
  const slider = document.querySelector(".carousel");
  const resizeObserver = new ResizeObserver((entries) => monitorResize(entries));

  slider.addEventListener("scroll", monitorScroll);
  resizeObserver.observe(slider);
}

export function initCarousel() {
  initCarouselListeners();
  initCarouselMonitoring();
}
