document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    // Токен существует, пользователь аутентифицирован
    console.log("Пользователь аутентифицирован");
    // Здесь можете выполнить дополнительные действия, например, запросить данные пользователя с сервера
  } else {
    // Токен не найден, пользователь не аутентифицирован
    console.log("Пользователь не аутентифицирован");
    window.location.href = "https://studentsays.ru/";
  }
});
