import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
  it('renders correctly with imagePath=/', () => {
    const header = shallow(<Header imagePath="/"/>);
    expect(toJson(header)).toMatchSnapshot();
  });

  it('renders correctly with imagePath=https://ssl-gumtree.classistatic.com/jobs/job-app/', () => {
    const header = shallow(<Header imagePath="https://ssl-gumtree.classistatic.com/jobs/job-app/"/>);
    expect(toJson(header)).toMatchSnapshot();
  });
});
