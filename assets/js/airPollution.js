//검색창 input 값 element
const searchInput = document.getElementById('location');

//검색 버튼 element
const searchButton = document.getElementById('searchButton');

//대기오염 정보 보여주는 element
const airPollutionInfoHTML = document.getElementById('air-pollution-info');

//대기오염 정보 보여주는 element - mobile
const airPollutionInfoMobileHTML = document.getElementById('air-pollution-info-mobile')

//'Enter' key 눌렀을 때 이벤트(검색)
searchInput.addEventListener('keydown', async (event) => {
  if(event.key === 'Enter') {
    searchButton.click();
  }
})

//검색 버튼 클릭 했을 때 이벤트(검색)
searchButton.addEventListener('click', async() => {
  //const city = searchInput.value.trim();
  const city = searchInput.value.trim();
  if (!city) {
    alert('도시 이름을 입력해 주세요.', {
        title: '알림',
        icon: 'warning',
      });
      return;
}
  
  try {
    const coordinates = await getCoordinatesInfo(city);
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
    const airPollutionNum = airPollutionInfo.list[0].components.pm10
    let airPollutionIndicator = "";

    // 모든 상태의 'on' 클래스를 삭제하는 함수
    function removeOnClass() {
        const pollutionLevels = ['good', 'fair', 'moderate', 'poor', 'very_poor'];
        for (let level of pollutionLevels) {
            const element = document.getElementsByClassName('pollution ' + level)[0];
            const element2 = document.getElementsByClassName('pollution ' + level)[0]
            console.log('element2', element2.classList)
            element.classList.remove('on');
            element2.classList.remove('on');
        }
    }

    // 신규 대기오염 상태에 따라 'on' 클래스 추가
    removeOnClass();
    if(airPollutionValue == 1) {
        airPollutionIndicator = "good"
        document.getElementsByClassName('pollution good')[0].classList.add('on')
    } else if(airPollutionValue == 2){
        airPollutionIndicator = "fair"  
        document.getElementsByClassName('pollution fair')[0].classList.add('on')
    } else if(airPollutionValue == 3) {
        airPollutionIndicator = "moderate"
        document.getElementsByClassName('pollution moderate')[0].classList.add('on')
    } else if(airPollutionValue == 4) {
        airPollutionIndicator = "poor"
        document.getElementsByClassName('pollution poor')[0].classList.add('on')
    } else {
        airPollutionIndicator = "very_poor" 
        document.getElementsByClassName('pollution very_poor')[0].classList.add('on')
    }

    renderAirPollutionInfo(airPollutionNum, airPollutionIndicator, airPollutionInfoHTML);

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
  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${config.apikey}`
  const data = await fetch(airPollutionUrl);
  const airPollutionInfo = await data.json();
  return airPollutionInfo;
}

async function getCoordinatesInfo(city) {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${config.apikey}`;
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

function renderAirPollutionInfo(airPollutionNum, airPollutionIndicator, airPollutionInfoHTML) {
  const pollutionLevels = ['good', 'fair', 'moderate', 'poor', 'very_poor'];
  let html = '';
  let html2 = '';
  const renderLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']

      for(let i=0; pollutionLevels.length > i; i++) {
        let level = pollutionLevels[i]
        let renderLevel = renderLevels[i]
        html += `<div class="pollution ${level}`;
        if (airPollutionIndicator === level) {
          html += ` on"><span class="pollution_num">${airPollutionNum}<span class="unit">㎍/㎥</span></span>`;
          html2 += `<div class="pollution ${level} on"><span class="pollution_num">${airPollutionNum}<span class="unit">㎍/㎥</span></span>`;
        } else {
          html += `">`;
        }
        html += `<span class="status">${renderLevel}</span></div>`;
        html2 += `<span class="status">${renderLevel}</span></div>`;
      }
  airPollutionInfoHTML.innerHTML = html;
  airPollutionInfoMobileHTML.innerHTML = html2;
}

