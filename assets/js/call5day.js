// const OPEN_WEATHER_API_KEY = '62bc430c2e97afc5954eee5d617b781e';

document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const weatherInfoElement = document.getElementById('weather-info');

  locationInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  searchButton.addEventListener('click', async () => {
    const city = locationInput.value.trim();

    if (!city) {
      alert('도시 이름을 입력해 주세요.', {
        title: '알림',
        icon: 'warning',
      });
      return;
    }

    try {
      const coordinates = await getCoordinates(city);
      if (!coordinates) {
        alert('도시를 찾을 수 없습니다.', {
          title: '알림',
          icon: 'warning',
        });
        return;
      }
      const weatherData = await get5DayForecast(coordinates.lat, coordinates.lon);
      renderWeather(weatherData, weatherInfoElement);
    } catch (error) {
      console.error(error);
      alert('날씨 정보를 불러오는데 실패했습니다. 다시 시도해 주세요', {
        title: '알림',
        icon: 'warning',
      });
    }
  });
});

async function getCoordinates(city) {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPEN_WEATHER_API_KEY}`;
  const response = await fetch(geocodingUrl);

  if (!response.ok) {
    throw new Error('Failed to get coordinates');
  }

  const geocodingData = await response.json();
  if (geocodingData && geocodingData.length > 0) {
    return {
      lat: geocodingData[0].lat,
      lon: geocodingData[0].lon
    };
  } else {
    return null;
  }
}

async function get5DayForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
  const response = await fetch(forecastUrl);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
}


function aggregateDailyData(list) {
  return list.reduce((acc, item) => {
    // Extract the date part from the dt_txt field
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = {
        temps: [],
        weatherDescriptions: new Set(),
        weatherIcons: new Set(),
        windSpeeds: [],
        windDirections: [],
        cloudinessValues: [],
        humidityValues: [],
        pressureValues: []
      };
    }

    acc[date].temps.push(item.main.temp);
    acc[date].weatherDescriptions.add(item.weather[0].description);
    acc[date].weatherIcons.add(item.weather[0].icon);
    acc[date].windSpeeds.push(item.wind.speed);
    acc[date].windDirections.push(item.wind.deg);
    acc[date].cloudinessValues.push(item.clouds.all);
    acc[date].humidityValues.push(item.main.humidity);
    acc[date].pressureValues.push(item.main.pressure);

    return acc;
  }, {});
}

function renderWeather(weatherData, weatherInfoElement) {
  const dailyData = aggregateDailyData(weatherData.list);

  const dailyForecasts = Object.keys(dailyData).map(day => {
    const data = dailyData[day];
    const highTemp = Math.max(...data.temps).toFixed(2);
    const lowTemp = Math.min(...data.temps).toFixed(2);
    const weatherDescription = [...data.weatherDescriptions].join(', '); // Join all descriptions
    const weatherIcon = [...data.weatherIcons][0]; // Use the first icon
    const windSpeed = data.windSpeeds.length ? (data.windSpeeds.reduce((a, b) => a + b, 0) / data.windSpeeds.length).toFixed(2) : 'N/A';
    const windDirection = data.windDirections.length ? (data.windDirections.reduce((a, b) => a + b, 0) / data.windDirections.length).toFixed(0) : 'N/A';
    const cloudiness = data.cloudinessValues.length ? Math.round(data.cloudinessValues.reduce((a, b) => a + b, 0) / data.cloudinessValues.length) : 'N/A';
    const humidity = data.humidityValues.length ? Math.round(data.humidityValues.reduce((a, b) => a + b, 0) / data.humidityValues.length) : 'N/A';
    const pressure = data.pressureValues.length ? Math.round(data.pressureValues.reduce((a, b) => a + b, 0) / data.pressureValues.length) : 'N/A';

    return `
      <div class="weather-item">
        <div class="date">${new Date(day).toLocaleDateString('en-EN')}</div>
        <div class="icon">
          <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
        </div>
        <div class="temperature">High: ${highTemp}°C / Low: ${lowTemp}°C</div>
        <div class="description">${weatherDescription}</div>
        <div class="wind">Wind: ${windSpeed} m/s ${windDirection}°</div>
        <div class="cloudiness">Cloudiness: ${cloudiness}%</div>
        <div class="humidity">Humidity: ${humidity}%</div>
        <div class="pressure">Pressure: ${pressure} hPa</div>
      </div>
    `;
  }).join('');

  weatherInfoElement.innerHTML = dailyForecasts;
}
