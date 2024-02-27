const OPEN_WEATHER_API_KEY = '62bc430c2e97afc5954eee5d617b781e';

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

async function get5DayForecast(latitude, longitude) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
  const response = await fetch(forecastUrl);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
}

function renderWeather(weatherData, weatherInfoElement) {
  // Group by day
  const dailyData = weatherData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000); // dt is in seconds
    const day = date.toISOString().split('T')[0]; // Get the date as 'YYYY-MM-DD'
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});

  // Select all data for each day
  const dailyForecasts = Object.keys(dailyData).map(day => {
    const dayData = dailyData[day];
    const allTemps = dayData.map(item => item.main.temp); // Get all temperatures for the day
    const highTemp = Math.round(Math.max(...allTemps)); // Find the maximum temperature
    const lowTemp = Math.round(Math.min(...allTemps)); // Find the minimum temperature
    const date = new Date(dayData[0].dt * 1000); // Use the first item's date
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const weatherIcon = dayData[0].weather[0].icon; // Use the first item's weather icon
    const weatherDescription = dayData[0].weather[0].description; // Use the first item's weather description

    return `
      <div class="weather-item">
        <div class="date">${formattedDate}</div>
        <div class="icon"><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}"></div>
        <div class="temperature">${highTemp}°C / ${lowTemp}°C</div>
        <div class="description">${weatherDescription}</div>
      </div>
    `;
  }).join('');

  weatherInfoElement.innerHTML = dailyForecasts;
}
