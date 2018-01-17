import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const footer = render(<Footer />);
    expect(toJson(footer)).toMatchSnapshot();
  });
});
