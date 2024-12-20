export function initializeSlider() {
  const carousel = document.getElementById("gallery-slider");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  const slides = carousel.querySelectorAll(".slide");

  let currentIndex = 0;
  let prevIndex;

  const totalSlides = Object.keys(slides).length;

  if (totalSlides > 1) {
    const slideWidth = slides[1].getBoundingClientRect().width;

    prevButton.addEventListener("click", () => {
      prevIndex = currentIndex;
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      slides[currentIndex].classList.add("active");
      slides[prevIndex].classList.remove("active");
      carousel.style.transform = `translateX(-${slideWidth}px)`;
      carousel.insertBefore(slides[currentIndex], carousel.firstChild);

      setTimeout(() => {
        carousel.classList.add("sliding-transition");
        carousel.style.transform = "";
      }, 10);

      setTimeout(() => {
        carousel.classList.remove("sliding-transition");
      }, 490);
    });

    nextButton.addEventListener("click", () => {
      carousel.classList.add("sliding-transition");
      prevIndex = currentIndex;
      currentIndex = (currentIndex + 1) % totalSlides;
      slides[currentIndex].classList.add("active");
      slides[prevIndex].classList.remove("active");
      carousel.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        carousel.appendChild(slides[prevIndex]);
        carousel.classList.remove("sliding-transition");
        carousel.style.transform = "";
      }, 500);
    });
  }
}
