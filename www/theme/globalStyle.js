import styled, { createGlobalStyle, css } from 'styled-components';

const myTheme = {
    fontbase: 'Georgia,Times New Roman,serif',
    fontsecondary: 'krona_oneregular, sans-serif',
    basetextcolor: '#333333',
    basecolor: '#333333',
    secondarycolor: '#222222',
    basebackgroundcolor: '#fede54',
};
export const theme1 = myTheme;

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'krona_oneregular';
        font-display: auto;
        src: url('/static/fonts/kronaone-regular-webfont.woff2') format('woff2'),
            url('/static/fonts/kronaone-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    html {
        font-family: ${myTheme.fontbase};
        font-weight: 400;
        font-size: 14px;
        color: ${myTheme.basecolor};
        * {
            box-sizing: border-box;
        }
    }

    body {
        font-size: 1em;
        background-color: ${myTheme.basebackgroundcolor};
    }

    main {
        max-width: 1024px;
        margin: 1em auto
    }
`;