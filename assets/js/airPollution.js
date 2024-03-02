//대기오염 정보 보여주는 element
const airPollutionInfoHTML = document.getElementById('air-pollution-info');

//대기오염 정보 보여주는 element - mobile
const airPollutionInfoMobileHTML = document.getElementById('air-pollution-info-mobile')

async function getPollutionInfo(lat, lng) {
  //대기오염 정보 조회
  const airPollutionInfo = await getAirPollutionInfo(lat,lng);
  const airPollutionValue = airPollutionInfo.list[0].main.aqi;
  const airPollutionNum = airPollutionInfo.list[0].components.pm10
  let airPollutionIndicator = "";

  // 모든 상태의 'on' 클래스를 삭제하는 함수
  function removeOnClass() {
      const pollutionLevels = ['good', 'fair', 'moderate', 'poor', 'very_poor'];
      for (let level of pollutionLevels) {
          const element = document.getElementsByClassName('pollution ' + level)[0];
          element.classList.remove('on');
          airPollutionInfoMobileHTML.classList.remove('on');
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
}


//현재 대기오염 정보 불러오는 함수
async function getAirPollutionInfo(lat, lng) {

  //현재 대기오염 정보 불러오는 api
  // 파라미터로 위도, 경도값 필요로함 -> getCoordinates(city)함수로 정보 가져옴
  const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${config.apikey}`
  const data = await fetch(airPollutionUrl);
  const airPollutionInfo = await data.json();
  return airPollutionInfo;
}

function renderAirPollutionInfo(airPollutionNum, airPollutionIndicator, airPollutionInfoHTML) {
  const pollutionLevels = ['good', 'fair', 'moderate', 'poor', 'very_poor'];
  let html = '';
  let html2 = '';
  const renderLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']

      for(let i=0; pollutionLevels.length > i; i++) {
        let level = pollutionLevels[i]
        let renderLevel = renderLevels[i]
        if(noLocation) {
          html += `<div class="pollution ${level}">`;
        } else {
          html += `<div class="pollution ${level}`;
          if (airPollutionIndicator === level) {
            html += ` on"><span class="pollution_num">${airPollutionNum}<span class="unit">㎍/㎥</span></span>`;
            html2 += `<div class="pollution ${level} on"><span class="pollution_num">${airPollutionNum}<span class="unit">㎍/㎥</span></span><span class="status">${renderLevel}</span></div>`;
          } else {
            html += `">`;
          }
        }
        html += `<span class="status">${renderLevel}</span></div>`;
      }
      if(noLocation) {
        html2 += `<div class="pollution"><span>미세먼지 정보가 없습니다.</span></div>`
      }
  airPollutionInfoHTML.innerHTML = html;
  document.getElementById('air-pollution-info-mobile').innerHTML = html2;
}
