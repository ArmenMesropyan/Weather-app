import apiService from '../service/api.service';
import cityData from '../data/city.list.min.json';

class Forecast {
    constructor(api, cities) {
        this.api = api;
        this.cities = cities;
        this.lastForecast = null;
    }

    getCityIdByCityName(cityName) {
        return this.cities.find((city) => city.name === cityName).id;
    }

    serializeForecast() {
        const {
            name,
            id,
            weather,
            main,
            visibility,
            sys,
        } = this.lastForecast;
        console.log(main);
        const res = {
            id,
            name,
            weather: weather[0].main,
            img: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
            temperature: Math.round(main.temp - 273),
            humidity: `${main.humidity}%`,
            pressure: Math.round(main.pressure * 0.00750063755419211 * 100),
            visibility: visibility / 1000,
            country: sys.country,
            countryImg: `https://www.countryflags.io/${sys.country}/flat/64.png`,
        };

        this.lastForecast = res;
        return res;
    }

    async getForecastById(id) {
        const response = await this.api.getForecast(id);
        this.lastForecast = response;
        return response;
    }

    async getForecast(city) {
        const cityId = this.getCityIdByCityName(city);
        await this.getForecastById(cityId);
        console.log(this.serializeForecast());
        return this.serializeForecast();
    }
}

const forecast = new Forecast(apiService, cityData);

export default forecast;