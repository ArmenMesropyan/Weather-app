import generateSlider from '../plugins';

class ForecastUI {
    constructor(field, container) {
        this.field = document.querySelector(field);
        this.container = document.querySelector(container);
        this.lastSearch = null;
    }

    static IconTemplate(bool) {
        const icon = bool ? 'check' : 'times';
        return `
          <span class="icon is-small is-right input-icon"><i class="fas fa-${icon}"></i></span>
        `;
    }

    static forecastInfoTemplate({ countryImg, name }) {
        return `
            <div class="forecast-data__item country-info media">
                <figure class="country-info__icon media-left">
                    <img src="${countryImg}">
                </figure>
                <p class="country-info__name media-content">
                    ${name}
                </p>
            </div>
        `;
    }

    static forecastTemplate({
        weather,
        img,
        temperature,
        humidity,
        pressure,
        date,
    }) {
        return `
          <li>
            <div class="forecast-data__item weather-info content">
                <ul class="weather-info__list">
                    <li class="weather-info__main">
                        <img src="${img}" alt="${weather}" class="weather-info__img">
                        <p class="weather-info__text">${weather}</p>
                    </li>
                    <li class="weather-info__temperature">
                        <p class="weather-info__temperature-text">Temperature: ${temperature} &#176 C</p>
                    </li>
                    <li class="weather-info__humidity">
                        <p class="weather-info__humidity-text">Humidity: ${humidity}</p>
                    </li>
                    <li class="weather-info__pressure">
                        <p class="weather-info__pressure-text">Pressure: ${pressure} mmHg</p>
                    </li>
                    <li class="weather-info__date">
                        <p class="weather-info__date-text">Date: ${date}</p>
                    </li>
                </ul>
            </div>
          </li>
        `;
    }

    clearIcons() {
        const element = this.field.querySelector('.input-icon');
        if (!element) return;

        this.field.removeChild(element);
    }

    clearContainer() {
        this.container.classList.remove('card-content');
        this.container.innerHTML = '';
        const infoElem = this.container.closest('section').querySelector('.country-info');
        if (infoElem) infoElem.parentElement.removeChild(infoElem);
    }

    showError() {
        this.clearIcons();
        this.field.insertAdjacentHTML('beforeend', ForecastUI.IconTemplate(false));
    }

    clearSlider() {
        const parent = this.container.closest('section');
        const controller = parent.querySelector('.tns-controls');
        const navigation = parent.querySelector('.tns-nav');

        if (!controller) return;

        controller.parentElement.removeChild(controller);
        navigation.parentElement.removeChild(navigation);
    }

    showForecast({ list, data }) {
        this.clearIcons();
        this.clearContainer();
        this.clearSlider();
        this.container.classList.add('card-content');
        this.field.insertAdjacentHTML('beforeend', ForecastUI.IconTemplate(true));

        this.container.insertAdjacentHTML('beforebegin', ForecastUI.forecastInfoTemplate(data));
        list.forEach((item) => {
            this.container.insertAdjacentHTML('afterbegin', ForecastUI.forecastTemplate(item));
        });
        generateSlider();
    }


    async init(forecast) {
        try {
            const res = await forecast;
            this.showForecast(res);
        } catch (error) {
            this.showError();
        }
    }
}

const forecastUI = new ForecastUI(
    '.forecast-form__field',
    '.forecast-data__list',
);

export default forecastUI;