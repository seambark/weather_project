let openSearch = document.querySelector(".open_search");
let header = document.querySelector(".header");
let noLocation = false;
let isSearching = false;

openSearch.addEventListener("click", function () {
  header.classList.toggle("active");
});

let locationInput = document.getElementById('location');
let searchButton = document.getElementById('searchButton');

locationInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter' && !isSearching) {
    searchButton.click();
  }
});

searchButton.addEventListener('click', async () => {
  if (isSearching) return; // 이미 검색이 진행 중이면 함수 실행을 중지
  isSearching = true; // 검색 시작

  const city = locationInput.value.trim();

  if (!city) {
    alert('도시 이름을 입력해 주세요.', {
      title: '알림',
      icon: 'warning',
    });
    isSearching = false; // 검색 상태를 리셋
    return;
  }

  try {
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      alert('도시를 찾을 수 없습니다.', {
        title: '알림',
        icon: 'warning',
      });
      isSearching = false; // 검색 상태를 리셋
      return;
    }

    noLocation = false;

    // call 5 day rendering
    fetchAndRender5DayForecast(coordinates.lat, coordinates.lon, weatherInfoElement);

    // styling rendering
    currentweather(coordinates.lat, coordinates.lon)

    // airPollution rendering
    getPollutionInfo(coordinates.lat, coordinates.lon)
    
    // festival renndering
    festivalData(city);
    swiperRender();


  } catch (error) {
    console.error(error);
    alert('날씨 정보를 불러오는데 실패했습니다. 다시 시도해 주세요', {
      title: '알림',
      icon: 'warning',
    });
  }finally {
    isSearching = false;
  }
});


// 도시를 검색하면 도시의 위도, 경도를 알려줌
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


//유저의 현재 위치에 맞게 현재날씨를 보여줌
const userposition = async (position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("현재 위치", lat, lng);
  await currentweather(lat, lng);
  await fetchAndRender5DayForecast(lat, lng, weatherInfoElement)
  await getPollutionInfo(lat, lng);
};

const userpositionError = () => {
  alert("현재 위치를 찾을 수 없습니다");
  noLocation = true;
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(userposition, userpositionError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

const weatherConditions = (condition) => {
  const mistConditions = ['mist', 'smoke', 'haze', 'sand/dust whirls', 'fog', 'sand', 'dust', 'volcanic ash', 'squalls', 'tornado'];
  const rainConditions = ['light rain', 'moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain'];
  let conditionIcon;

  if (condition === 'clear sky') {
    conditionIcon = 'clear_sky';
  } else if (condition === 'few clouds') {
    conditionIcon = 'few_clouds';
  } else if (condition === 'scattered clouds') {
    conditionIcon = 'scattered_clouds';
  } else if (condition === 'broken clouds' || condition === 'overcast clouds') {
    conditionIcon = 'broken_clouds';
  } else if (condition === 'shower rain' || condition.includes('drizzle')) {
    conditionIcon = 'shower_rain';
  } else if (condition === 'rain' || rainConditions.some(c => condition.includes(c))) {
    conditionIcon = 'rain';
  } else if (condition.includes('thunderstorm')) {
    conditionIcon = 'thunderstorm';
  } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('freezing')) {
    conditionIcon = 'snow';
  } else if (mistConditions.some(c => condition.includes(c))) {
    conditionIcon = 'mist';
  }

  return conditionIcon;
}

getLocation();