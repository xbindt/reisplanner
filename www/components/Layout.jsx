import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme1, GlobalStyles } from '../theme/globalStyle';
import Header from './Header';
import Loader from './Loader';

const Layout = ({ children }) => (
  <main>
    <ThemeProvider theme={theme1}>
      <Fragment>
        <Header />
        henk
        {children}
        <Loader />
      </Fragment>
    </ThemeProvider>
    <GlobalStyles />
  </main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {};

export default Layout;
