import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = props => (
  <Head>
    {props.title ?
      <title>{props.title}</title> : ''
    }
    {props.description ?
      <meta name="description" content={props.description} /> : ''
    }
  </Head>
);

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Meta;
