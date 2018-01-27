import React from 'react';
import PropTypes from 'prop-types';

class ConfigProvider extends React.Component {
  getChildContext() {
    const { config } = this.props;
    return { config };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

ConfigProvider.propTypes = {
  config: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.element.isRequired,
  ]),
};

ConfigProvider.childContextTypes = {
  config: PropTypes.object.isRequired,
};

export default ConfigProvider;
