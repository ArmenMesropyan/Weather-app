import 'bulma/css/bulma.min.css';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

export default function generateSlider() {
    const slider = tns({
        container: '.my-slider',
    });
    return slider;
}