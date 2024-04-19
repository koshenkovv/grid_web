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

function openReport(element) {
  const reportId = element.getAttribute("data-report-id");
  window.location.href = `https://studentsays.ru/report/${reportId}/`;
  console.log(reportId);
}

function autoResize(textarea) {
  var maxRows = 10;
  var lines = textarea.value.split("\n");

  // Адаптация rows в зависимости от текущего количества строк, но не более maxRows
  var currentRows = Math.min(lines.length, maxRows);
  textarea.rows = currentRows;

  // Включаем прокрутку, если строк больше maxRows
  if (lines.length >= maxRows) {
    textarea.style.overflowY = "auto"; // или 'scroll', если хотите всегда показывать скролл
  } else {
    textarea.style.overflowY = "hidden"; // Скрываем скролл, если строк меньше maxRows
  }
}
document.getElementById("upload-button").addEventListener("click", function () {
  let existingImages = document.querySelectorAll(".uploaded-image").length;
  if (existingImages >= 5) {
    alert("Максимальное количество изображений - 5.");
    return;
  }

  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.multiple = true;
  fileInput.onchange = (e) => {
    const files = Array.from(e.target.files);
    const filesToUpload = files.slice(0, 5 - existingImages); // Ограничить количество файлов до 5
    filesToUpload.forEach((file) => {
      compressAndDisplayImage(file);
    });
  };
  fileInput.click();
});

function compressAndDisplayImage(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const imgElement = document.createElement("img");
    imgElement.src = e.target.result;
    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleSize = 1024 / imgElement.width;
      canvas.width = 1024;
      canvas.height = imgElement.height * scaleSize;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      ctx.canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          displayImage(compressedFile);
        },
        "image/jpeg",
        0.7
      );
    };
  };
}

function removeGap() {}

function displayImage(file) {
  report_form = document.getElementById("create-report-form").style.height =
    "710px";
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const imagesContainer = document.getElementById("images-container");
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("uploaded-image");
    imageWrapper.style.backgroundImage = `url('${e.target.result}')`;
    imageWrapper.innerHTML = `<img src="/media/images/close.svg" alt="close" class="delete-image">`;
    imagesContainer.appendChild(imageWrapper);

    imageWrapper
      .querySelector(".delete-image")
      .addEventListener("click", function () {
        imageWrapper.remove();
        var deleteImages = document.querySelectorAll(".delete-image");
        if (deleteImages.length === 0) {
          report_form = document.getElementById(
            "create-report-form"
          ).style.height = "600px";
        }
      });
  };
}

function SwitchReport() {
  // Предполагается, что у элемента, который вы хотите переключать, есть идентификатор "report"
  var reportElement = document.getElementById("create-report-block");

  // Проверяем текущее состояние свойства display и меняем его на противоположное
  if (reportElement.style.display === "flex") {
    reportElement.style.display = "none";
  } else {
    reportElement.style.display = "flex";
  }
}
