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

    static forecastTemplate({
        name,
        weather,
        img,
        temperature,
        humidity,
        pressure,
        visibility,
        countryImg,
    }) {
        return `
          <li class="forecast-data__item country-info media">
              <figure class="country-info__icon media-left">
                  <img src="${countryImg}">
              </figure>
              <p class="country-info__name media-content">
                  ${name}
              </p>
          </li>
          <li class="forecast-data__item weather-info content">
              <ul class="weather-info__list">
                  <li class="weather-info__main">
                      <img src="${img}" alt="${weather}" class="weather-info__img">
                      <p class="weather-info__text">${weather}</p>
                  </li>
                  <li class="weather-info__temperature">
                      <p class="weather-info__temperature-text">Temperature: ${temperature} &#176</p>
                  </li>
                  <li class="weather-info__humidity">
                      <p class="weather-info__humidity-text">Humidity: ${humidity}</p>
                  </li>
                  <li class="weather-info__pressure">
                      <p class="weather-info__pressure-text">Pressure: ${pressure} mmHg</p>
                  </li>
                  <li class="weather-info__visibility">
                      <p class="weather-info__visibility-text">Visibility: ${visibility} Km</p>
                  </li>
              </ul>
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
    }

    showError() {
        this.clearIcons();
        this.clearContainer();
        this.field.insertAdjacentHTML('beforeend', ForecastUI.IconTemplate(false));
    }

    showForecast(forecast) {
        this.clearIcons();
        this.clearContainer();
        this.container.classList.add('card-content');
        this.field.insertAdjacentHTML('beforeend', ForecastUI.IconTemplate(true));
        this.container.insertAdjacentHTML('afterbegin', ForecastUI.forecastTemplate(forecast));
    }

    async init(forecast) {
        try {
            const res = await forecast;
            this.showForecast(res);
        } catch (error) {
            console.log(error);
            this.showError();
        }
    }
}

const forecastUI = new ForecastUI(
    '.forecast-form__field',
    '.forecast-data__list',
);

export default forecastUI;