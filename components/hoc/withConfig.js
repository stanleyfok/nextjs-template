import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withConfig = (Child) => {
  class ConfigComponent extends Component {
    static async getInitialProps(ctx) {
      let childProps = {};

      if (Child.getInitialProps) {
        childProps = await Child.getInitialProps(ctx);
      }

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
