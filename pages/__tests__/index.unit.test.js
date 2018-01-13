import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Index from '../index';

describe('<Index />', () => {
  it('renders correctly', () => {
    const index = shallow(<Index />);
    expect(toJson(index)).toMatchSnapshot();
  });
});
