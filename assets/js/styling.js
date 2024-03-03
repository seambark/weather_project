// const API_KEY = `613ac7d721406d59cec6506314044e4a`;
let weather = {};
let clothes = document.getElementById("clothes")
let addbutton = document.getElementById("searchButton")
let currentbener =document.getElementById("current")
let bannercurrent =document.getElementById("bannercurrent")


//빈값이면 버튼 블락

// function buttondisabled() {
    
//     const locationValue = document.getElementById("location").value.trim();
//     console.log(locationValue)
//     if (locationValue ==="" ) {

//         document.getElementById('searchButton').disabled = true;
//     } else {
//         document.getElementById('searchButton').disabled = false;
//     }
// }

// document.getElementById("location").addEventListener("input", buttondisabled);

// buttondisabled();

//->block 대신 alert 뜨게 만듦

// document.addEventListener('DOMContentLoaded', function () {
//     const locationInput = document.getElementById('location');
//     const searchButton = document.getElementById('searchButton');
  
//      locationInput.addEventListener('keydown', async (event) => {
//        if (event.key === 'Enter') {
//          searchButton.click();
//        }
//      });
  
//      searchButton.addEventListener('click', async () => {
//        const city = locationInput.value.trim();
  
//        if (!city) {
//          alert('도시 이름을 입력해 주세요.', {
//            title: '알림',
//            icon: 'warning',
//          });
//          return;
//        }

//        try {
//              const coordinates = await getCoordinates(city);
//              if (!coordinates) {
//                alert('도시를 찾을 수 없습니다.', {
//                  title: '알림',
//                  icon: 'warning',
//                });
//                return;
//              }
//              const weatherData = await get5DayForecast(coordinates.lat, coordinates.lon);
//              renderWeather(weatherData, weatherInfoElement);
//            } catch (error) {
//              console.error(error);
//              alert('날씨 정보를 불러오는데 실패했습니다. 다시 시도해 주세요', {
//                title: '알림',
//                icon: 'warning',
//              });
//            }
//          });
//      });
  

//enter 입력
  
// let input = document.getElementById("location");

// input.addEventListener("keypress", (e)=>{
//     if (e.key == "Enter") {
//         e.preventDefault();
//         addbutton.click()
//         input.value = "";

//       //  buttondisabled();
//     }
// }
// );

//지역 검색 날씨정보

const locationinput= async()=>{
    try{
const searchInput = document.getElementById("location").value
let encodedSearchInput = encodeURIComponent(searchInput);
        console.log("keyword", searchInput);
        
        const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&q=${encodedSearchInput}&appid=${config.apikey}&lang=kr`);

    const weatherdata = await fetch(url)
    const data = await weatherdata.json()
 
//잘못된 지역 검색시 에러   
    if(data.cod ===200){
        weather = data;
    render();
    clothes.style.display = "";

    }else if(data.cod ==="404"){
        throw new Error(weather.message)
    }
    }catch(error){
        //alert("지역을 찾을 수 없습니다. 정확한 지역명을 입력해주세요")
        //currenterrorRender(error.message)
    }
};

//현재 날씨 렌더링

const currentweather = async (latitude, longitude) => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apikey}`);
    const weatherdata = await fetch(url);
    const data = await weatherdata.json();
    weather = data;
    render();
    console.log("sdsd", weather);
};



    let render = () => {

        let c = weather.main.temp - 273.15
        let localTime = new Date(weather.dt * 1000);
        let currentMonth = localTime.toLocaleString('en', { month: 'long' });
        let currentDate = localTime.getDate();
    
        let weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        
// 날씨에 따라 이미지, 아이콘 바뀌는 기능
if (weather.weather[0].main === "Clouds") {
    currentbener.classList.remove("bg_clear_sky","bg_shower_rain","bg_thunderstorm","bg_rain","bg_snow","bg_mist")
    currentbener.classList.add("bg_few_clouds")
    weatherview = 
    `<div class="temp">
        <strong class="temp_num">${c.toFixed(0)}</strong>
        <span class="temp_words">${weather.weather[0].main}</span>
    </div>
    <div class="value">
        <span>${weather.name}</span>
        <span>${currentMonth}&nbsp${currentDate}</span>
    </div>
    <div class="other">
        <span class="wind">
            <span>Wind</span>
            <span>${weather.wind.speed}</span>
        </span>
        <span class="humidity">
            <span>Humidity</span>
            <span>${weather.main.humidity}%</span>
        </span>
    </div>`;
}else if (weather.weather[0].main === "Clear") {
    currentbener.classList.add("bg_clear_sky")
    currentbener.classList.remove("bg_few_clouds","bg_shower_rain","bg_thunderstorm","bg_rain","bg_mist","bg_snow");
    weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        }else if (weather.weather[0].main === "shower rain") {
            currentbener.classList.add("bg_shower_rain")
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_thunderstorm","bg_rain","bg_mist","bg_snow");
            weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
                }
        else if(weather.weather[0].main === "Thunderstorm"){
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_rain","bg_mist","bg_shower_rain","bg_snow")
            currentbener.classList.add("bg_thunderstorm")
            weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        }else if(weather.weather[0].main === "Rain"){
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_mist","bg_shower_rain","bg_snow")
            currentbener.classList.add("bg_rain")
            weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        }else if(weather.weather[0].main === "Snow"){
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_shower_rain","bg_thunderstorm","bg_rain")
            currentbener.classList.add("bg_snow")
            weatherview = 
            `<div class="temp">
                <strong class="temp_num">${c.toFixed(0)}</strong>
                <span class="temp_words">${weather.weather[0].main}</span>
            </div>
            <div class="value">
                <span>${weather.name}</span>
                <span>${currentMonth}&nbsp${currentDate}</span>
            </div>
            <div class="other">
                <span class="wind">
                    <span>Wind</span>
                    <span>${weather.wind.speed}</span>
                </span>
                <span class="humidity">
                    <span>Humidity</span>
                    <span>${weather.main.humidity}%</span>
                </span>
            </div>`;
        }else if(weather.weather[0].main === "Mist"){
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_shower_rain","bg_thunderstorm","bg_rain","bg_snow")
            currentbener.classList.add("bg_mist")
            weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        }else if(weather.weather[0].main === "Fog"){
            currentbener.classList.remove("bg_few_clouds","bg_clear_sky","bg_shower_rain","bg_thunderstorm","bg_rain","bg_snow")
            currentbener.classList.add("bg_mist")
            weatherview = 
                    `<div class="temp">
                        <strong class="temp_num">${c.toFixed(0)}</strong>
                        <span class="temp_words">${weather.weather[0].main}</span>
                    </div>
                    <div class="value">
                        <span>${weather.name}</span>
                        <span>${currentMonth}&nbsp${currentDate}</span>
                    </div>
                    <div class="other">
                        <span class="wind">
                            <span>Wind</span>
                            <span>${weather.wind.speed}</span>
                        </span>
                        <span class="humidity">
                            <span>Humidity</span>
                            <span>${weather.main.humidity}%</span>
                        </span>
                    </div>`;
        };
        
    

//기온에 따라 옷추천
    if(c.toFixed(0) <=4){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_01.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"매우 추운 날이네요! 두꺼운 아우터입고 체온을 따뜻히 유지하세요"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 패딩, 두꺼운 코트, 목도리, 기모제품</p>
                    </div>`
    }else if(c.toFixed(0) >=5 && c.toFixed(0) <=8){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_02.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"큰 추위 없는 날씨네요! 하지만 외출 시 보온에 신경 써주세요"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 코트, 가죽자켓, 히트텍, 니트, 레깅스</p>
                    </div>`
    } else if(c.toFixed(0) >=9 && c.toFixed(0) <=11){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_03.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"약간 쌀쌀하지만 활동하기 좋은 날이네요! 오늘의 추천 코디는"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹</p>
                    </div>`
    } else if(c.toFixed(0) >=12 && c.toFixed(0) <=16){
        clothes.innerHTML=`<div class="clothes_icon">
        <img src="../assets/img/temperatura_step_03.png">
    </div>
    <div class="clothes_bubble">
        <p class="clothes_phrase">"나들이하기 좋은 날이네요! 계절이 바뀌는 만큼 감기 조심하세요"</p><br>
        <p class="clothes_recommend">*추천 코디 : 자켓, 가디건, 야상, 스타킹, 청바지, 면바지</p>
    </div>
        `
    } else if(c.toFixed(0) >=17 && c.toFixed(0) <=19){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_06.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"완전한 봄, 가을 날씨입니다! 오늘의 코디는"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 얇은 니트, 맨투맨, 가디건, 청바지</p>
                    </div>`
    } else if(c.toFixed(0) >=20 && c.toFixed(0) <=22){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_05.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"야외활동하기 너무 좋은 날씨입니다! 간단한 산책이라도 어떨까요?"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 얇은 가디건, 긴팔, 면바지, 청바지</p>
                    </div>`
    } else if(c.toFixed(0) >=23 && c.toFixed(0) <=27){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_07.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"무더위는 아니지만 활동하기에 더운 날씨입니다. 수분보충을 잘 해주세요"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 반팔, 얇은 셔츠, 반바지, 면바지</p>
                    </div>`
    } else if(c.toFixed(0) >=28){
        clothes.innerHTML=`
        <div class="clothes_icon">
                        <img src="../assets/img/temperatura_step_08.png">
                    </div>
                    <div class="clothes_bubble">
                        <p class="clothes_phrase">"매우 더운 날씨입니다! 외출을 자제하시고 온열질환 조심하세요"</p><br>
                        <p class="clothes_recommend">*추천 코디 : 민소매, 반팔, 반바지, 원피스</p>
                    </div>`
    } ;

    document.getElementById("bannercurrent").innerHTML = weatherview;
};

//에러 렌더링

const currenterrorRender=(errorMessage)=>{
    const errorHtml =`
    <div class="currentweather">
        <div>
            "지역을 찾을 수 없습니다. 정확한 지역을 입력하세요"
        </div>
    </div>`

    clothes.style.display = "데이터를 불러오지 못해 코디 추천이 불가능합니다";


    document.getElementById("current").innerHTML=errorHtml
}

//유저의 현재 위치에 맞게 현재날씨를 보여줌
// const userposition = (position) => {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;
//     console.log("현재 위치", lat, lng);
//     currentweather(lat, lng);
// };

// const userpositionError = () => {
//     alert("현재 위치를 찾을 수 없습니다");
// };

// const getLocation = () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(userposition, userpositionError);
//     } else {
//         console.log("Geolocation is not supported by this browser.");
//     }
// };

// getLocation();