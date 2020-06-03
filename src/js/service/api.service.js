import axios from 'axios';
import API_ENV from '../config/api.config';

class APIService {
    constructor(api) {
        this.api = api;
    }

    async getUserForecast({ latitude, longitude }) {
        try {
            const resposne = await axios.get(`${this.api.url}/weather?lat=${latitude}&lon=${longitude}&appid=${this.api.apiKey}`);
            return resposne.data;
        } catch (error) {
            throw new Error('Error response');
        }
    }

    async getForecast(info) {
        try {
            let response;

            if (info.latitude) {
                response = await this.getUserForecast(info);
                return response;
            }
            response = await axios.get(`${this.api.url}/weather?q=${info}&appid=${this.api.apiKey}`);

            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const apiService = new APIService(API_ENV);

export default apiService;