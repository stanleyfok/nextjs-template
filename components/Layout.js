import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => [
  <Header key="0" />,
  <div key="1" className="container">
    {props.children}
  </div>,
  <Footer key="2" />,
];

export default Layout;
