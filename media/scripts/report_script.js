function switchImageShow() {
  var element = document.querySelector(".desktop-image-show");
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
}

function showImage(event) {
  var imgShowcase = document.getElementById("imageShowcase");

  // Исправлено: Извлечение style.backgroundImage напрямую из event.target может не сработать, как ожидается.
  // Нужно проверить, что event.target действительно содержит background-image.
  var imageUrl = getComputedStyle(event.target).backgroundImage; // Получаем полный стиль элемента, включая background-image.

  // Очищаем URL от "url(" и ")" с помощью регулярного выражения, а также от возможных кавычек.
  var cleanUrl = imageUrl.replace(/(url\(|\)|"|')/g, "");

  // Устанавливаем извлеченный URL в качестве src для img.
  imgShowcase.src = cleanUrl;
  switchImageShow();
}

function switchComments() {
  var comments = document.querySelector(".report-comments");

  if (comments) {
    // Переключаем класс visible, чтобы управлять видимостью и анимацией
    comments.classList.toggle("visible");
  } else {
    console.error("Элемент с классом report-comments не найден.");
  }
}
