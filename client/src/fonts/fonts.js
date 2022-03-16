import { createGlobalStyle } from 'styled-components';

import LusitanaBold from './Lusitana-Bold.ttf';
import LusitanaRegular from './Lusitana-Regular.ttf';

import RalewayBold from './Raleway-VariableFont_wght.ttf';

const FontStyle = createGlobalStyle`
    @font-face {
        font-family: 'Lusitana-Bold';
        src: url(${LusitanaBold}) format('tff');
        font-weight: 700
        
    }
    @font-face {
        font-family: 'Lusitana-Regular';
        src: url(${LusitanaRegular}) format('tff');
    }
    @font-face {
        font-family: 'Raleway-Bold';
        src: url(${RalewayBold}) format('tff');
        font-weight: 900;
    }
    `;

export default FontStyle;
