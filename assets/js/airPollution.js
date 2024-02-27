// const API_KEY = `ddc973d36c3a537a40a8c855f6a1089d`;

const lat = 50;
const lon = 50;

const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`

const getAirPollutionInfo = async () => {
  const data = await fetch(url)
  const airPollutionInfo = await data.json();
  console.log('airPollutionInfo', airPollutionInfo)
}

getAirPollutionInfo();