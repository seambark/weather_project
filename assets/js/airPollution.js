const API_KEY = `ddc973d36c3a537a40a8c855f6a1089d`;
//검색창 input 값 element
const searchInput = document.getElementById('location');

//검색 버튼 element
const searchButton = document.getElementById('search');

//대기오염 정보 보여주는 element
const airPollutionInfoHTML = document.getElementById('air-pollution-info')

//'Enter' key 눌렀을 때 이벤트(검색)
searchInput.addEventListener('keydown', async (event) => {
  if(event.key === 'Enter') {
    searchButton.click();
  }
})

//검색 버튼 클릭 했을 때 이벤트(검색)
searchButton.addEventListener('click', async() => {
  const city = searchInput.value.trim();
  
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
    //대기오염 정보 조회
    const airPollutionInfo = await getAirPollutionInfo(coordinates.lat, coordinates.lon);

    const airPollutionValue = airPollutionInfo.list[0].main.aqi;
    let airPollutionIndicator = "";
    let airPollutionIcon = "";
    const airPollutionNum = airPollutionInfo.list[0].components.pm10
    if(airPollutionValue == 1) {
      airPollutionIndicator = "Good"
      airPollutionIcon = `../assets/img/airPollution_good.png`
    } else if(airPollutionValue == 2){
      airPollutionIndicator = "Fair"
      airPollutionIcon = `../assets/img/airPollution_fair.png`
    } else if(airPollutionValue == 3) {
      airPollutionIndicator = "Moderate"
      airPollutionIcon = `../assets/img/airPollution_moderate.png`
    } else if(airPollutionValue == 4) {
      airPollutionIndicator = "Poor"
      airPollutionIcon = `../assets/img/airPollution_poor.png`
    } else {
      airPollutionIndicator = "Very Poor" 
      airPollutionIcon = `../assets/img/airPollution_very_poor.png` 
    }
    const renderInfo = {
      airPollutionIndicator,
      airPollutionIcon,
      airPollutionNum
    }

    render(renderInfo, airPollutionInfoHTML);

    // const predict = await predictAirPollutionInfo(coordinates.lat, coordinates.lon)
    
  } catch (error) {
    console.error(error);
    alert('날씨 정보를 불러오는데 실패했습니다. 다시 시도해 주세요', {
      title: '알림',
      icon: 'warning',
    });
  }
})


//현재 대기오염 정보 불러오는 함수
async function getAirPollutionInfo(lat, lon) {

  //현재 대기오염 정보 불러오는 api
  // 파라미터로 위도, 경도값 필요로함 -> getCoordinates(city)함수로 정보 가져옴
  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  const data = await fetch(airPollutionUrl);
  const airPollutionInfo = await data.json();
  return airPollutionInfo;
}

//대기오염 예측 정보 불러오는 함수
async function predictAirPollutionInfo(lat, lon) {

  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  const data = await fetch(airPollutionUrl);
  const airPollutionInfo = await data.json();
  const dt = new Date((airPollutionInfo.list[0].dt))
}

async function getCoordinates(city) {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
  const response = await fetch(geocodingUrl);

  if (!response.ok) {
    throw new Error('Failed to get coordinates');
  }

  const geocodingData = await response.json();
  if (geocodingData && geocodingData.length > 0) {
    return {
      lat: geocodingData[0].lat,
      lon: geocodingData[0].lon,
    };
  } else {
    return null;
  }
}

function render(renderInfo, airPollutionInfoHTML) {
  const html = 
  `<div class="air-pollution">

    <div class="air-pollution-icon"><img src=${renderInfo.airPollutionIcon}
    />
    </div>
    
    <div class="air-pollution-value">${renderInfo.airPollutionIndicator}</div>
    <div>미세먼지</div>
    <div class="air-pollution-num">${renderInfo.airPollutionNum} ㎍/㎥</div>
    
  </div>`;
  airPollutionInfoHTML.innerHTML = html;
}