import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme1, GlobalStyles } from '../theme/globalStyle';
import Header from './header/Header';
import Loader from './Loader';


const Layout = (props) => (
<main>
    <ThemeProvider theme={theme1} >
    <Fragment>
        <Header />
        {props.children}
        <Loader />
    </Fragment>
    </ThemeProvider>
    <GlobalStyles />
</main>
)

export default Layout