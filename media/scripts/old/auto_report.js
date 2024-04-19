async function loadAndDisplayreportDetails() {
  try {
    var url = window.location.href;
    var match = url.match(/\/report\/(\d+)/);
    var idReport = match[1];
    const accessToken = localStorage.getItem("access_token");
    var apiUrl = "https://studentsays.ru/report/" + idReport;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("report-section"); // Убедитесь, что у вас есть элемент с этим ID в HTML
    const detail = data.data; // Предполагается, что data.data содержит данные одной заявки

    const formattedDateTime = formatDateTime(detail.date_created); // Предполагается, что функция formatDateTime уже определена
    const section = document.createElement("section");
    section.className = "report-block";
    section.innerHTML = `
        <div class="space-between">
            <div class="report-header">
                <h1 id="header">${detail.header}</h1>
                <p id="username">${
                  detail.anonym
                    ? "Анонимный студент"
                    : `${detail.idUser.first_name} ${detail.idUser.last_name}`
                }</p>
            </div>
            <div>
                <h1 class="report-status" id="status">${detail.status}</h1>
            </div>
        </div>
        <div>
            <p class="report-text" id="text">${detail.text}</p>
        </div>
        ${createImageBlocksMarkup()}
        <div class="space-between">
            <div class="report-buttons display-flex">
                <p id="rating" class="report-rating">${detail.rating}</p>
                <img src="/media/images/dark-grey-fire.svg" alt="rate-up">
                <img src="/media/images/comments.svg" onclick="switchComments()" alt="comments" class="comments-img">
                <img src="/media/images/link.svg" alt="share">
            </div>
            <div>
                <p id="date_created">${formattedDateTime}</p>
            </div>
        </div>
        <div class="report-comments" id="comments-section">
        )}</div>
      `;

    container.appendChild(section);

    // После добавления разметки в документ, устанавливаем изображения
    setImageBlocks(detail);
  } catch (error) {
    console.error("Произошла ошибка при выполнении запроса:", error);
  }
}

function createImageBlocksMarkup() {
  // Создаём пустые блоки для изображений, которые будем заполнять позже
  let markup = "";
  for (let i = 1; i <= 5; i++) {
    markup += `<div id="report-images-block-${i}" class="report-images-block-${i}" style="display: none;">`;
    for (let j = 1; j <= i; j++) {
      markup += `<div class="report-images-block-${i}-${j}"></div>`;
    }
    markup += `</div>`;
  }
  return markup;
}

function setImageBlocks(detail) {
  for (let i = 5; i > 0; i--) {
    if (detail[`photo${i}`] !== null) {
      const block = document.getElementById(`report-images-block-${i}`);
      if (block) {
        block.style.display = "grid";

        for (let j = 1; j <= i; j++) {
          const photoDiv = block.querySelector(
            `.report-images-block-${i}-${j}`
          );
          if (photoDiv) {
            const photoUrl = detail[`photo${j}`];
            photoDiv.style.backgroundImage = `url(${photoUrl})`;
            photoDiv.style.backgroundSize = "cover";
          }
        }
      }
      break; // Прекращаем цикл, так как нашли блок с фото
    }
  }
}

document.addEventListener("DOMContentLoaded", loadAndDisplayreportDetails);

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  // Форматирование даты
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear().toString().slice(-2); // Получаем последние две цифры года

  // Форматирование времени
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Комбинируем дату и время в желаемом формате
  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime} `;
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

async function loadAndDisplayComments() {
  try {
    var url = window.location.href;
    var match = url.match(/\/report\/(\d+)/);
    var idReport = match[1];
    const accessToken = localStorage.getItem("access_token");
    var apiUrl = "https://studentsays.ru/report_comments/" + idReport;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const commentData = data.data; // Предполагается, что data.data содержит данные одной заявки

    const commentsContainer = document.getElementById("comments-section"); // Убедитесь, что у вас есть элемент с этим ID в HTML

    // Создаем элемент комментария с учетом нового шаблона
    const commentElement = document.createElement("div");
    commentElement.className =
      "report-comment-el" +
      (commentData.isUniversityComment ? " uni-of-comment" : "");
    commentElement.innerHTML = `
      <h1>${commentData.user_name}</h1>
      <p>${commentData.text}</p>
    `;

    // Добавляем созданный элемент комментария в контейнер
    commentsContainer.appendChild(commentElement);

    container.appendChild(section);

    // После добавления разметки в документ, устанавливаем изображения
    setImageBlocks(detail);
  } catch (error) {
    console.error("Произошла ошибка при выполнении запроса:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAndDisplayComments);
