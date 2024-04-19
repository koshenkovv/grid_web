document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.href;

  // Извлекаем число из адресной строки
  var match = url.match(/\/report\/(\d+)/);

  // Проверяем, найдено ли число в адресной строке
  if (match) {
    var idReport = match[1];
    const accessToken = localStorage.getItem("access_token");

    // Формируем URL для отправки запроса
    var apiUrl = "https://studentsays.ru/report/" + idReport;

    // Отправляем GET-запрос к серверу с токеном
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Не удалось получить данные");
      })
      .then((data) => {
        const dateTimeStr = data.data.date_created;
        const formattedDateTime = formatDateTime(dateTimeStr);
        // Заполняем HTML страницу данными из ответа сервера
        document.getElementById("header").innerText = data.data.header;
        document.getElementById("text").innerText = data.data.text;
        document.getElementById("username").innerText = data.data.anonym
          ? "Анонимный студент"
          : data.data.idUser.first_name + data.data.idUser.last_name;
        document.getElementById("rating").innerText = data.data.rating;
        document.getElementById("date_created").innerText = formattedDateTime;
        document.getElementById("status").innerText = data.data.idStatus;
        // Итерируем с конца, чтобы найти последний непустой блок
        for (let i = 5; i > 0; i--) {
          if (data.data[`photo${i}`] !== null) {
            // Показываем только этот блок, если он найден
            const block = document.getElementById(`report-images-block-${i}`);
            if (block) {
              block.style.display = "grid";

              // Устанавливаем фоновые изображения для каждого div внутри блока
              for (let j = 1; j <= i; j++) {
                const photoDiv = block.querySelector(
                  `.report-images-block-${i}-${j}`
                );
                if (photoDiv) {
                  const photoUrl = data.data[`photo${j}`];
                  photoDiv.style.backgroundImage = `url(${photoUrl})`;
                  photoDiv.style.backgroundSize = "cover"; // Опционально: для лучшего отображения изображения
                }
              }
            }
            break; // Останавливаем цикл, так как нашли первое непустое изображение с конца
          }
        }
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  } else {
    // Если число не найдено в адресной строке, выводим сообщение об ошибке
    document.getElementById("reportData").innerHTML =
      "<p>Число после '/report/' не найдено в адресной строке</p>";
  }
});

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
