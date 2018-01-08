import React from 'react';
import path from 'path';

import config from '../configs/config';

const Header = () => (
  <div className="header">
    <div className="container">
      <img src={path.join(config.paths.images, 'favicon.png')} />
      <span>This is header</span>
    </div>
  </div>
);

export default Header;
