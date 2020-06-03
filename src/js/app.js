import './plugins';
import '../css/main.css';
import forecast from './controllers/forecast';
import formUI from './view/form';
import forecastUI from './view/forecast';

function showUserForecast() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
        forecastUI.init(forecast.getForecast(coords));
    });
}

async function onInputChange(input) {
    if (!input.value) {
        showUserForecast();
        return;
    }
    forecastUI.init(forecast.getForecast(input.value));
}

document.addEventListener('DOMContentLoaded', () => {
    showUserForecast();

    // Events

    formUI.search.addEventListener('input', (e) => {
        onInputChange(e.target);
    });
});