const API_KEY = `613ac7d721406d59cec6506314044e4a`;
let weather = {};
let clothes = document.getElementById("clothes")
let addbutton = document.getElementById("searchButton")

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

document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location');
    const searchButton = document.getElementById('searchButton');
  
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
     });
  });

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
    console.log("keyword", searchInput)
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}`);
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
        currenterrorRender(error.message)
    }

};

//현재 날씨 렌더링

const currentweather = async (latitude, longitude) => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const weatherdata = await fetch(url);
    const data = await weatherdata.json();
    weather = data;
    render();
    console.log("sdsd", weather);
};

    const render = () => {

        let c = weather.main.temp - 273.15
        let c_max = weather.main.temp_max - 273.15;
        let c_min = weather.main.temp_min - 273.15;
    
        let weatherview = 
        `<div id="current">
        
        <div id="current" class="weather-container">
                    
            <div class="weather-text">
            <div>지역 : ${weather.name}</div>
            <div>현재기온: ${c.toFixed(0)} °C</div>
            <div>날씨: ${weather.weather[0].main}</div>
            <div>습도: ${weather.main.humidity}%</div>
            <div>기압: ${weather.main.pressure}hPa</div>
            <div>최고기온: ${c_max.toFixed(0)} °C</div>
            <div>최저기온: ${c_min.toFixed(0)} °C</div>
        </div>`;
        
// 날씨에 따라 이미지, 아이콘 바뀌는 기능
        if (weather.weather[0].main === "Clouds") {
            weatherview += `<img src="../assets/img/broken_clouds.png">`;
        }else if(weather.weather[0].main === "Clear"){
            weatherview +=`<img src="../assets/img/clear_sky.png">`
        }else if(weather.weather[0].main === "Thunderstorm"){
            weatherview +=`<img src="../assets/img/thunderstorm.png">`
        }else if(weather.weather[0].main === "Rain"){
            weatherview +=`<img src="../assets/img/shower_rain.png">`
        }else if(weather.weather[0].main === "Snow"){
            weatherview +=`<img src="../assets/img/snow.png">`
        }else if(weather.weather[0].main === "Mist"){
            weatherview +=`<img src="../assets/img/mist.png">`
        }else if(weather.weather[0].main === "Fog"){
            weatherview +=`<img src="../assets/img/mist.png">`
        };
    

//기온에 따라 옷추천
    if(c <= 4 ){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_01.png">
        </div>
        <div>
            <h2>"매우 추운 날이네요! 두꺼운 아우터입고 체온을 따뜻히 유지하세요"</h2>
            <h3>추천 코디 : 패딩, 두꺼운 코트, 목도리, 기모제품</h3>
        </div>`
    }else if(c >=5 && c <=8){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_02.png">
        </div>
        <div>
            <h2>"큰 추위 없는 날씨네요! 하지만 외출 시 보온에 신경 써주세요"</h2>
            <h3>추천 코디 : 코트, 가죽자켓, 히트텍, 니트, 레깅스</h3>
        </div>`
    } else if(c =9 && c <=11){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_03.png">
        </div>
        <div>
            <h2>"약간 쌀쌀하지만 활동하기 좋은 날이네요! 오늘의 추천 코디는"</h2>
            <h3>추천 코디 : 자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹</h3>
        </div>`
    } else if(c =12 && c <=16){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_01.png">
        </div>
        <div>
            <h2>"나들이하기 좋은 날이네요! 계절이 바뀌는 만큼 감기 조심하세요"</h2>
            <h3>추천 코디 : 자켓, 가디건, 야상, 스타킹, 청바지, 면바지</h3>
        </div>`
    } else if(c =17 && c <=19){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_06.png">
        </div>
        <div>
            <h2>"완전한 봄, 가을 날씨입니다! 오늘의 코디는"</h2>
            <h3>추천 코디 : 얇은 니트, 맨투맨, 가디건, 청바지</h3>
        </div>`
    } else if(c =20 && c <=22){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_05.png">
        </div>
        <div>
            <h2>"멘트??"</h2>
            <h3>추천 코디 : 얇은 가디건, 긴팔, 면바지, 청바지</h3>
        </div>`
    } else if(c =23 && c <=27){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_07.png">
        </div>
        <div>
            <h2>"멘트??"</h2>
            <h3>추천 코디 : 반팔, 얇은 셔츠, 반바지, 면바지</h3>
        </div>`
    } else if(c =28){
        clothes.innerHTML=`
        <div>
        <img src="../assets/img/temperatura_step_08.png">
        </div>
        <div>
            <h2>"매우 더운 날씨입니다! 외출을 자제하시고 온열질환 조심하세요"</h2>
            <h3>추천 코디 : 민소매, 반팔, 반바지, 원피스</h3>
        </div>`
    } ;

    document.getElementById("current").innerHTML = weatherview;
};

//에러 렌더링

const currenterrorRender=(errorMessage)=>{
    const errorHtml =`<div>
        "지역을 찾을 수 없습니다. 정확한 지역을 입력하세요"
    </div>`

    clothes.style.display = "none";
    

    document.getElementById("current").innerHTML=errorHtml
}

//유저의 현재 위치에 맞게 현재날씨를 보여줌
const userposition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("현재 위치", lat, lng);
    currentweather(lat, lng);
};

const userpositionError = () => {
    alert("현재 위치를 찾을 수 없습니다");
};

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userposition, userpositionError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

getLocation();