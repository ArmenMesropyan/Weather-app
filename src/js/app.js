import './plugins';
import '../css/main.css';
import forecast from './controllers/forecast';
import formUI from './view/form';
import forecastUI from './view/forecast';

async function onInputChange(input) {
    forecastUI.init(forecast.getForecast(input.value));
}

document.addEventListener('DOMContentLoaded', () => {
    formUI.search.addEventListener('input', (e) => {
        onInputChange(e.target);
    });
});