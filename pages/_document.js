import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import urljoin from 'url-join';

import config from 'configs/config';

export default class MyDocument extends Document {
  render() {
    const stylePath = config.paths.static;

    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="stylesheet" href={urljoin(stylePath, 'styles', 'main.css')} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
