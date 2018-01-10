import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Meta from '../Meta';

describe('<Meta />', () => {
  it('renders correctly with no properties', () => {
    const meta = shallow(<Meta />);
    expect(toJson(meta)).toMatchSnapshot();
  });

  it('renders correctly with only title', () => {
    const meta = shallow(<Meta title="Page Title"/>);
    expect(toJson(meta)).toMatchSnapshot();
  });

  it('renders correctly with only description', () => {
    const meta = shallow(<Meta description="Page Description"/>);
    expect(toJson(meta)).toMatchSnapshot();
  });
});
