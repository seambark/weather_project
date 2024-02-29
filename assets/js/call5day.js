
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
  // Initialize an object to hold our aggregated data
  const dailyData = {};

  // Process each weather data entry
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    const time = item.dt_txt.split(' ')[1];

    // Create a new entry if one does not exist for this date
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        weatherDescription: null,
        weatherIcon: null,
        windSpeeds: [],
        windDirections: [],
        cloudinessValues: [],
        humidityValues: [],
        pressureValues: []
      };
    }

    // Aggregate data
    dailyData[date].temps.push(item.main.temp);
    dailyData[date].windSpeeds.push(item.wind.speed);
    dailyData[date].windDirections.push(item.wind.deg);
    dailyData[date].cloudinessValues.push(item.clouds.all);
    dailyData[date].humidityValues.push(item.main.humidity);
    dailyData[date].pressureValues.push(item.main.pressure);

    // If the time is 9 AM, use this entry's weather description and icon
    if (time === "09:00:00") {
      dailyData[date].weatherDescription = item.weather[0].description;
      dailyData[date].weatherIcon = item.weather[0].icon;
    }
  });

  // Calculate the average, high, and low values for each day
  Object.keys(dailyData).forEach(date => {
    const data = dailyData[date];
    const total = (array) => array.reduce((sum, x) => sum + x, 0);

    data.highTemp = Math.max(...data.temps);
    data.lowTemp = Math.min(...data.temps);
    data.avgWindSpeed = total(data.windSpeeds) / data.windSpeeds.length;
    data.avgWindDirection = total(data.windDirections) / data.windDirections.length;
    data.avgCloudiness = total(data.cloudinessValues) / data.cloudinessValues.length;
    data.avgHumidity = total(data.humidityValues) / data.humidityValues.length;
    data.avgPressure = total(data.pressureValues) / data.pressureValues.length;
  });

  return dailyData;
}

function renderWeather(weatherData, weatherInfoElement) {
  const dailyData = aggregateDailyData(weatherData.list);

  // Map over each day and generate the HTML
  const dailyForecasts = Object.keys(dailyData).map(day => {
    const data = dailyData[day];

    return `
      <div class="weather-item">
        <div class="date">${new Date(day).toLocaleDateString('en-EN', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        <div class="icon">
          <img src="https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png" alt="${data.weatherDescription}">
        </div>
        <div class="temperature">High: ${data.highTemp.toFixed(2)}°C / Low: ${data.lowTemp.toFixed(2)}°C</div>
        <div class="description">${data.weatherDescription}</div>
        <div class="wind">Wind: ${data.avgWindSpeed.toFixed(2)} m/s ${data.avgWindDirection.toFixed(0)}°</div>
        <div class="cloudiness">Cloudiness: ${data.avgCloudiness.toFixed(0)}%</div>
        <div class="humidity">Humidity: ${data.avgHumidity.toFixed(0)}%</div>
        <div class="pressure">Pressure: ${data.avgPressure.toFixed(0)} hPa</div>
      </div>
    `;
  }).join('');

  weatherInfoElement.innerHTML = dailyForecasts;
}
