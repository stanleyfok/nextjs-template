import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import Layout from '../Layout';

describe('<Layout />', () => {
  it('renders correctly with no children', () => {
    const layout = render(<Layout/>);
    expect(toJson(layout)).toMatchSnapshot();
  });

  it('renders correctly with some children', () => {
    const layout = render(
      <Layout>
        <div>Hello World 1</div>
        <p>Hello World 2</p>
        <span>Hello World 3</span>
      </Layout>
    );
    expect(toJson(layout)).toMatchSnapshot();
  });
});
