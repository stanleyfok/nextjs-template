import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Layout from '../Layout';

describe('<Layout />', () => {
  it('should render correctly with no children', () => {
    const layout = shallow(<Layout/>);
    expect(toJson(layout)).toMatchSnapshot();
  });

  it('should render correctly with some children', () => {
    const layout = shallow(<Layout>
      <div>Hello World 1</div>
      <p>Hello World 2</p>
      <span>Hello World 3</span>
    </Layout>);
    expect(toJson(layout)).toMatchSnapshot();
  });
});
