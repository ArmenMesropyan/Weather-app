import apiService from '../service/api.service';

class Forecast {
    constructor(api) {
        this.api = api;
        this.lastForecast = null;
    }

    serializeForecast(forecast) {
        const {
            name,
            id,
            weather,
            main,
            visibility,
            sys,
        } = forecast;

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

    async getForecast(city) {
        const forecast = await this.api.getForecast(city);
        const result = this.serializeForecast(forecast);

        return result;
    }
}

const forecast = new Forecast(apiService);

export default forecast;