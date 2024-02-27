const API_KEY = '62bc430c2e97afc5954eee5d617b781e';

let lat = '';
let lon = '';
let units = '';
let lang = '';


document.addEventListener('DOMContentLoaded', async function () {
    const locationInput = document.getElementById("location");
    const searchButton = document.getElementById("search");
    const weatherInfo = document.getElementById("weather-info");
    searchButton.addEventListener("click", () => {
        const location = locationInput.value;
    })
}


async function get5Day(endpoint = 'forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}') {

        const url = get URL `https://api.openweathermap.org/data/2.5/${endpoint}&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No matches for your search")
            }

            const weatherData = data.list;
            const html = weatherData.map((item) => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString("ko-KR", { weekday: "long" });
                const time = date.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });
                const temperature = Math.round(item.main.temp);
                const weatherIcon = item.weather[0].icon;
                const weatherDescription = item.weather[0].description;
            });
        }
    }
function render() {

        return `
    <div class="weather-item">
      <div class="date">${day} ${time}</div>
      <div class="icon"><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}"></div>
      <div class="temperature">${temperature}°C</div>
      <div class="description">${weatherDescription}</div> 
    </div>`
    }).join(''); // map으로 생성된 배열을 문자열로 합침
weatherInfo.innerHTML = html;

