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
