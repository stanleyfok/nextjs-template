import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';

import Header from './Header';
import Footer from './Footer';

// progress bar
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = props => (
  <div>
    <Header />
    <div className="container">
      {props.children}
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
