import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import Header from './Header';
import Footer from './Footer/Footer';

// progress bar
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = props => [
  <Header key="0" />,
  <div key="1" className="container">
    {props.children}
  </div>,
  <Footer key="2" />,
];

export default Layout;
