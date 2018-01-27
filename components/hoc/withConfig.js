import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withConfig = (Child) => {
  class ConfigComponent extends Component {
    static async getInitialProps(ctx) {
      const newCtx = Object.assign({}, ctx);
      const childProps = await Child.getInitialProps(newCtx);

      return childProps;
    }

    render() {
      const { config } = this.context;

      return (
        <Child {...this.props} config={config} />
      );
    }
  }

  ConfigComponent.contextTypes = {
    config: PropTypes.object,
  };

  return ConfigComponent;
};

export default withConfig;
