let openSearch = document.querySelector(".open_search");
let header = document.querySelector(".header");
let noLocation = false;

openSearch.addEventListener("click", function () {
  header.classList.toggle("active");
});

let locationInput, searchButton;

locationInput = document.getElementById('location');
searchButton = document.getElementById('searchButton');


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
    // call 5 day rendering
    fetchAndRender5DayForecast(coordinates.lat, coordinates.lon, weatherInfoElement);

    // styling rendering
    const locationinput = async (latitude, longitude) => {
      const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apikey}`);
      const weatherdata = await fetch(url)
      const data = await weatherdata.json()
      weather = data;
      render();
      clothes.style.display = "";
    };
    locationinput(coordinates.lat, coordinates.lon);

    //현재날씨 렌더링
    const currentweather = async (latitude, longitude) => {
      const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apikey}`);
      const weatherdata = await fetch(url);
      const data = await weatherdata.json();
      weather = data;
      render();
      console.log("sdsd", weather);
    };


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

getLocation();
