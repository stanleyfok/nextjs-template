import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

// for hot reload purpose
// also allow webpack to extract it
import 'assets/styles/main.scss';
import favIcon from 'assets/images/favicon.png';

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
    <Head>
      <link rel="shortcut icon" href={favIcon} />
    </Head>
    <Header />
    <div className="container">{props.children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Layout;
