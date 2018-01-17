import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import path from 'path';

import stylesheet from '../assets/styles/bundle.scss';
import config from '../configs/config';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="shortcut icon" href={path.join(config.paths.images, 'favicon.png')} />
          {/* CSS Begin */}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossOrigin="anonymous" />
          {config.env === 'dev' ?
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            :
            <link rel="stylesheet" href={path.join(config.paths.styles, 'bundle.css')} />
          }
          {/* CSS End */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
