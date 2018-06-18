import React from "react";
import PropTypes from "prop-types";

import withI18N from "components/hoc/withI18N";

const ErrorView = ({ message }) => (
  <div className="error">
    <p>{message}</p>
  </div>
);

ErrorView.propTypes = {
  message: PropTypes.string
};

export default ErrorView;
