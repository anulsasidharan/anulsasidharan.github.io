// Improved version with performance optimization and edge cases handled

const scrollElements = document.querySelectorAll(".scroll-animation");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.classList.add("active");
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

// Throttle function to improve scroll performance
const throttle = (func, delay = 100) => {
  let timeoutId;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        if ((Date.now() - lastRan) >= delay) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

// Use throttled version for better performance
window.addEventListener("scroll", throttle(handleScrollAnimation, 100));
window.addEventListener("load", handleScrollAnimation);

// Optional: Trigger on resize in case viewport changes
window.addEventListener("resize", throttle(handleScrollAnimation, 200));