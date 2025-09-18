const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false;
let startX, startScrollLeft;

// How many cards fit into the view
const cardsPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Clone cards for infinite scroll illusion
carouselChildren.slice(-cardsPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildren.slice(0, cardsPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Arrow button navigation
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

// Drag start
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = carousel.scrollLeft;
  e.preventDefault(); // stop text selection
};

// Dragging
const dragging = (e) => {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  carousel.scrollLeft = startScrollLeft - (x - startX);
};

// Drag stop
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

// Infinite scroll logic
const infiniteScroll = () => {
  if (carousel.scrollLeft <= 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } 
  else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};

// Event listeners
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

carousel.addEventListener("scroll", infiniteScroll);
