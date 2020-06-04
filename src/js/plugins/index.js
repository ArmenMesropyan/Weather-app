import 'bulma/css/bulma.min.css';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

export default function generateSlider() {
    tns({
        container: '.my-slider',
    });
}