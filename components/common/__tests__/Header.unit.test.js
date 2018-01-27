import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as Header } from '../Header';
import { t, config } from '../../../lib/testHelper';

describe('<Header />', () => {
  it('should render correctly with imagePath=/', () => {
    const header = shallow(<Header t={t} config={config}/>);
    expect(toJson(header)).toMatchSnapshot();
  });
});
