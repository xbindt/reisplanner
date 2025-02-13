import { createGlobalStyle } from 'styled-components';

const colors = {
  color1: '#264653',
  color2: '#2a9d8f',
  color3: '#e9c46a',
  color4: '#f4a261',
  color5: '#e76f51',
};

const myTheme = {
  fontbase: 'Georgia,Times New Roman,serif',
  fontsecondary: 'krona_oneregular, sans-serif',
  basetextcolor: colors.color1,
  basecolor: colors.color1,
  secondarycolor: '#222222',
  basebackgroundcolor: colors.color3,
  warningcolor: '#ff0000',
  basehoverbackgroundcolor: '#333333',
  basehovercolor: '#ffffff',
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
        font-size: 1em;
        color: ${myTheme.basecolor};
        * {
            box-sizing: border-box;
        }
    }

    body {
        font-size: 1em;
        @media (max-width: 600px) {
            font-size: 14px;
        }
        background-color: ${myTheme.basebackgroundcolor};
    }

    main {
        max-width: 1024px;
        margin: 1em auto
    }
`;
