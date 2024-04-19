function sendReport() {
    const header = document.getElementById('header').value;
    const theme = document.getElementById('theme').value;
    const text = document.getElementById('text').value;
    const userId = localStorage.getItem('user_id');
    const universityId = localStorage.getItem('university_id');
    const isAnonymous = document.querySelector('.switch input').checked;

    const data = {
        header,
        theme,
        text,
        user_id: userId,
        university_id: universityId,
        anonymous: isAnonymous
    };

    console.log("Sending report with data:", data); // Лог перед отправкой

    fetch('https://studentsays.ru/api/report/', { // предполагаемый URL для API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include' // Добавить куки к запросу
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Обработка ответа сервера, например, очистка формы или отображение сообщения
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
