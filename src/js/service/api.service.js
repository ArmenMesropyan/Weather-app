import axios from 'axios';
import API_ENV from '../config/api.config';

class APIService {
    constructor(api) {
        this.api = api;
    }

    async getForecast(cityId) {
        try {
            const resposne = await axios.get(`${this.api.url}/weather?id=${cityId}&appid=${this.api.apiKey}`);
            return resposne.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const apiService = new APIService(API_ENV);

export default apiService;