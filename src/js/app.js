import './plugins';
import '../css/main.css';
import forecast from './controllers/forecast';
import formUI from './view/form';

async function onInputChange(input) {
    await forecast.getForecast(input.value)
        .then((res) => {
            console.log('res: ', res);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    formUI.search.addEventListener('input', (e) => {
        onInputChange(e.target);
    });
});