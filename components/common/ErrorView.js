import React from 'react';
import PropTypes from 'prop-types';

const ErrorView = ({ message }) => (
  <div className="error">
    <p>{message}</p>
  </div>
);

ErrorView.propTypes = {
  message: PropTypes.string,
};

export default ErrorView;
