import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Meta from '../Meta';

describe('<Meta />', () => {
  it('should render correctly with no properties', () => {
    const meta = shallow(<Meta />);

    expect(toJson(meta)).toMatchSnapshot();
  });

  it('should render correctly with only title', () => {
    const meta = shallow(<Meta title="Page Title"/>);

    expect(toJson(meta)).toMatchSnapshot();
    expect(meta.find('title').text()).toEqual('Page Title');
  });

  it('should render correctly with only description', () => {
    const meta = shallow(<Meta description="Page Description"/>);

    expect(toJson(meta)).toMatchSnapshot();
    expect(meta.find('meta[name="description"]').prop('content')).toEqual('Page Description');
  });
});
