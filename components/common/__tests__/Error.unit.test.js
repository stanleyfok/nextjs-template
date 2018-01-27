import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as Error } from '../Error';
import { t } from '../../../lib/testHelper';

describe('<Error />', () => {
  it('should render correctly with statusCode', () => {
    const error = shallow(<Error t={t} statusCode='404' />);
    expect(toJson(error)).toMatchSnapshot();
  });

  it('should render correctly without statusCode', () => {
    const error = shallow(<Error t={t} />);
    expect(toJson(error)).toMatchSnapshot();
  });
});
