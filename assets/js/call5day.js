const API_KEY = '62bc430c2e97afc5954eee5d617b781e';
const locationInput = document.getElementById("location");
const searchButton = document.getElementById("search");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (!location) {
    alert("지역 이름을 입력하세요.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=126.9779692&lon=37.566535&appid=${API_KEY}&units=metric&lang=ko`;

//   서울의 위도 경도 lat=126.9779692&lon=37.566535

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("지역을 찾을 수 없습니다.");
        return;
      }

      const weatherData = data.list;
      const html = weatherData.map((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("ko-KR", { weekday: "long" });
        const time = date.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });
        const temperature = Math.round(item.main.temp);
        const weatherIcon = item.weather[0].icon;
        const weatherDescription = item.weather[0].description;

        return `
          <div class="weather-item">
            <div class="date">${day} ${time}</div>
            <div class="icon"><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}"></div>
            <div class="temperature">${temperature}°C</div>
            <div class="description">${weatherDescription}</div> 
          </div>
        `;
      }).join(''); // map으로 생성된 배열을 문자열로 합침

      weatherInfo.innerHTML = html; 
    });
});
