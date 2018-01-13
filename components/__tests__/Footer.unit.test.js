import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const footer = shallow(<Footer />);
    expect(toJson(footer)).toMatchSnapshot();
  });
});
