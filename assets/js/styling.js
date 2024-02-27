const API_KEY = `613ac7d721406d59cec6506314044e4a`
let weather = [];


const currentweather=async ()=>{
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}`);
    const weatherdata = await fetch(url);
    const data = await weatherdata.json();
    weather = data;
    console.log("sdsd", weather)
};

currentweather();sd