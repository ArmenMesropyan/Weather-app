import apiService from '../service/api.service';
import formatDate from '../helpers/date';

class Forecast {
    constructor(api) {
        this.api = api;
        this.lastForecast = null;
    }

    serializeForecast(forecast) {
        const {
            city: { name, id, country },
        } = forecast;

        const data = {
            id,
            name,
            country,
            countryImg: `https://www.countryflags.io/${country}/flat/64.png`,
        };

        const res = forecast.list.map(({ main, weather: [weatherInfo], dt_txt: date }) => ({
            date: formatDate(date),
            weather: weatherInfo.main,
            img: `https://openweathermap.org/img/w/${weatherInfo.icon}.png`,
            temperature: Math.round(main.temp - 273),
            humidity: `${main.humidity}%`,
            pressure: Math.round(main.pressure * 0.00750063755419211 * 100),
        }));

        this.lastForecast = res;
        return {
            list: res.reverse(),
            data,
        };
    }

    async getForecast(info) {
        try {
            const forecast = await this.api.getForecast(info);
            const result = this.serializeForecast(forecast);
            return result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const forecast = new Forecast(apiService);

export default forecast;