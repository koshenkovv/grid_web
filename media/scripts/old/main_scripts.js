async function loadAndDisplayReports() {
  try {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch("https://studentsays.ru/report/published/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("report-section"); // Предполагается, что у вас есть контейнер с этим классом в HTML

    data.data.forEach((report) => {
      const dateTimeStr = report.date_created;
      const formattedDateTime = formatDateTime(dateTimeStr);
      const section = document.createElement("section");
      section.className = "report-block";
      section.innerHTML = `
                  <div class="space-between">
                      <div class="report-header">
                          <h1>${report.header}</h1>
                          <p>${
                            report.anonym
                              ? "Анонимный студент"
                              : `${report.idUser.first_name} ${report.idUser.last_name}`
                          }</p>
                      </div>
                      <div onclick="openReport(${report.idReport})">
                          <h1 class="report-status">${report.idStatus}</h1>
                      </div>
                  </div>
                  <div onclick="openReport(${report.idReport})">
                      <p class="report-text">${report.text}</p>
                  </div>
                  <div class="space-between">
                                      <div class="report-buttons display-flex">
                                          <p id="rating" class="report-rating">${
                                            report.rating
                                          }</p>
                                          <img src="/media/images/dark-grey-fire.svg" alt="rate-up">
                                          <img src="/media/images/comments.svg" class="comments-img" alt="comments">
                                          <img src="/media/images/link.svg" alt="share">
                                      </div>
                                      <div>
                                          <p id="date_created">
                                              ${formattedDateTime}
                                          </p>
                                      </div>
                                  </div>
              `;
      container.appendChild(section);
    });
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

// Вызовите функцию, когда страница загружена
document.addEventListener("DOMContentLoaded", loadAndDisplayReports);

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

document.addEventListener("DOMContentLoaded", function () {
  // Найти элемент select и изображение по их классам
  var selectElement = document.querySelector(".sort");
  var imageElement = document.querySelector(".sort-img");

  // Функция для смены изображения
  function changeImage() {
    // Получаем выбранное значение
    var selectedValue = selectElement.value;

    // Путь к изображениям
    var imagePath = "/media/images/";

    // Выбор изображения в зависимости от выбранного значения
    if (selectedValue === "1" || selectedValue === "3") {
      imageElement.src = imagePath + "sort_by_best.svg";
    } else if (selectedValue === "2" || selectedValue === "4") {
      imageElement.src = imagePath + "sort_by_worst.svg";
    }
  }

  // Добавить обработчик события при изменении выбранной опции
  selectElement.addEventListener("change", changeImage);
});

document.addEventListener("DOMContentLoaded", function () {
  // Найти элемент select и изображение по их классам
  var selectElement = document.querySelector(".mobile-sort");
  var imageElement = document.querySelector(".mobile-sort-img");

  // Функция для смены изображения
  function changeImage() {
    // Получаем выбранное значение
    var selectedValue = selectElement.value;

    // Путь к изображениям
    var imagePath = "/media/images/";

    // Выбор изображения в зависимости от выбранного значения
    if (selectedValue === "1" || selectedValue === "3") {
      imageElement.src = imagePath + "sort_by_best.svg";
    } else if (selectedValue === "2" || selectedValue === "4") {
      imageElement.src = imagePath + "sort_by_worst.svg";
    }
  }

  // Добавить обработчик события при изменении выбранной опции
  selectElement.addEventListener("change", changeImage);
});

function openReport(reportId) {
  window.location.href = `https://studentsays.ru/report/${reportId}/`;
}

async function loadAndDisplayMobileReports() {
  try {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch("https://studentsays.ru/report/published/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("mobile-report-block"); // Adjust this ID to match your HTML

    data.data.forEach((report) => {
      const formattedDateTime = formatDateTime(report.date_created); // Assuming formatDateTime function exists and works for your date format
      const mobilereportDiv = document.createElement("div");
      mobilereportDiv.className = "mobile-report";
      mobilereportDiv.innerHTML = `
                        <div class="space-between">
                            <p class="mobile-report-header">
                                ${report.header}
                            </p>
                            <p class="mobile-report-date">
                                ${formattedDateTime}
                            </p>
                        </div>
                        <div class="space-between">
                            <p class="mobile-report-author">${
                              report.anonym
                                ? "Аноним"
                                : `${report.idUser.first_name} ${report.idUser.last_name}`
                            }</p>
                            <div class="display-flex">
                                <img class="mobile-report-rating-image" src="/media/images/dark-grey-fire.svg"
                                    alt="rate-up">
                                <p class="mobile-report-rating">
                                    ${report.rating}
                                </p>
                            </div>
                        </div>
                    `;

      container.appendChild(mobilereportDiv);
    });
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAndDisplayMobileReports);
