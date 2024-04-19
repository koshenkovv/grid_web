const el = document.getElementById("scroll-container");
let isDown = false;
let startX;
let scrollLeft;

el.addEventListener("mousedown", (e) => {
  isDown = true;
  el.classList.add("active");
  startX = e.pageX - el.offsetLeft;
  scrollLeft = el.scrollLeft;
});

el.addEventListener("mouseleave", () => {
  isDown = false;
});

el.addEventListener("mouseup", () => {
  isDown = false;
});

el.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - el.offsetLeft;
  const walk = x - startX;
  el.scrollLeft = scrollLeft - walk;
});

let animationId;

function scrollToStart(elementId) {
  var element = document.getElementById("scroll-container");
  if (element) {
    element.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else {
    console.error("Element not found with ID:", elementId);
  }
}

var clickThreshold = 200;
var startTime;

var clickableElements = document.querySelectorAll('[onclick^="showFull"]');
clickableElements.forEach(function (element) {
  element.addEventListener("mousedown", function () {
    startTime = new Date().getTime();
  });

  element.addEventListener("mouseup", function (event) {
    var endTime = new Date().getTime();
    if (endTime - startTime <= clickThreshold) {
      var src = element.getAttribute("data-src") || element.src;
      showFull(src, event);
    }
  });
});
