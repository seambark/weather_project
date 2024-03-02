let weatherInfoElement;

weatherInfoElement = document.getElementById('weather-info');

async function call5DayRender(data) {
  const weatherData = await get5DayForecast(coordinates.lat, coordinates.lon);
  renderWeather(weatherData, weatherInfoElement);
}


async function getCoordinates(city) {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${config.apikey}`;
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
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${config.apikey}`;
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

    // Create a new entry if one does not exist for this date
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        weatherDescriptions: [], // Changed to array to collect all descriptions
        weatherIcons: [], // Changed to array to collect all icons
        weatherIconsImg: [],
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
    dailyData[date].weatherDescriptions.push(item.weather[0].description); // Collect all descriptions
    dailyData[date].weatherIcons.push(item.weather[0].icon); // Collect all icons
  });

  // Calculate the average, high, and low values for each day and find the most frequent description and icon
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

    // Determine the most frequent weather description and icon
    const mistConditions = ['mist', 'smoke', 'haze', 'sand/dust whirls', 'fog', 'sand', 'dust', 'volcanic ash', 'squalls', 'tornado'];
    const rainConditions = ['light rain', 'moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain'];

    const mostFrequent = (array) => array.sort((a, b) =>
      array.filter(v => v === a).length
      - array.filter(v => v === b).length)
      .pop();
    data.weatherDescription = mostFrequent(data.weatherDescriptions);
    data.weatherIcon = mostFrequent(data.weatherIcons);
    if (data.weatherDescription === 'clear sky') {
      data.weatherIconImg = 'clear_sky';
    } else if (data.weatherDescription === 'few clouds') {
      data.weatherIconImg = 'few_clouds';
    } else if (data.weatherDescription === 'scattered clouds') {
      data.weatherIconImg = 'scattered_clouds';
    } else if (data.weatherDescription === 'broken clouds' | data.weatherDescription === 'overcast clouds') {
      data.weatherIconImg = 'broken_clouds';
    } else if (data.weatherDescription === 'shower rain' | data.weatherDescription.includes('Drizzle')) {
      data.weatherIconImg = 'shower_rain';
    } else if (data.weatherDescription === 'rain' | rainConditions.some(condition => data.weatherDescription.includes(condition))) {
      data.weatherIconImg = 'rain';
    } else if (data.weatherDescription.includes('thunderstorm')) {
      data.weatherIconImg = 'thunderstorm';
    } else if (data.weatherDescription.includes('snow') | data.weatherDescription.includes('sleet') | data.weatherDescription.includes('freezing')) {
      data.weatherIconImg = 'snow';
    } else if (mistConditions.some(condition => data.weatherDescription.includes(condition))) {
      data.weatherIconImg = 'mist';
    }

  });

  return dailyData;
}


function renderWeather(weatherData, weatherInfoElement) {
  const dailyData = aggregateDailyData(weatherData.list);

  // Map over each day and generate the HTML
  const dailyForecasts = Object.keys(dailyData).map(day => {
    const data = dailyData[day];

    return `
    <li class="weather_item">
    <span class="date">${new Date(day).toLocaleDateString('en-EN', { weekday: 'short' })}</span>
    <div class="detail">
        <div class="icon">
            <img src="../assets/img/${data.weatherIconImg}.png" alt="${data.weatherDescription}">
        </div>
        <p class="temperature"><span>${data.lowTemp.toFixed(2)} / ${data.highTemp.toFixed(2)}</span></p>
        <p class="description">${data.weatherDescription}</p>
    </div>
    </li>
    `;
  }).join('');



  //   return `
  //     <div class="weather-item">
  //       <div class="date">${new Date(day).toLocaleDateString('en-EN', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
  //       <div class="icon">
  //         <img src="../assets/img/${data.weatherIconImg}.png" alt="${data.weatherDescription}">
  //       </div>
  //       <div class="temperature">${data.lowTemp.toFixed(2)}°C / ${data.highTemp.toFixed(2)}°C</div>
  //       <div class="description">${data.weatherDescription}</div>
  //       <div class="wind">Wind: ${data.avgWindSpeed.toFixed(2)} m/s ${data.avgWindDirection.toFixed(0)}°</div>
  //       <div class="cloudiness">Cloudiness: ${data.avgCloudiness.toFixed(0)}%</div>
  //       <div class="humidity">Humidity: ${data.avgHumidity.toFixed(0)}%</div>
  //       <div class="pressure">Pressure: ${data.avgPressure.toFixed(0)} hPa</div>
  //     </div>
  //   `;
  // }).join('');

  weatherInfoElement.innerHTML = dailyForecasts;
}
