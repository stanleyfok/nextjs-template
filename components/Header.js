import React from 'react';
import path from 'path';

import config from '../configs/config';

const Header = () => (
  <div className="header">
    <img src={path.join(config.paths.images, 'favicon.png')} />
    <span>This is header</span>
  </div>
);

export default Header;
