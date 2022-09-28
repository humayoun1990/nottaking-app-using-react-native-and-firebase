import { async } from "@firebase/util";
import axios from "axios";

export const getWeather = async (city) => {
    let weather = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=845908cc0d2255c4aef11efa1869d731');
    let currTemperature = (weather.data.main.temp) - 273.15
    console.log(currTemperature)
    return currTemperature;
}