import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as Footer } from '../Footer';
import { t } from '../../../lib/testHelper';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const footer = shallow(<Footer t={t}/>);
    expect(toJson(footer)).toMatchSnapshot();
  });
});
