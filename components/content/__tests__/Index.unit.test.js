import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as Index } from '../Index';
import ApiClient from '../../../lib/api-client';
import { t } from '../../../lib/testHelper';

const apiClient = new ApiClient('.');

describe('<Index />', () => {
  it('should render correctly with result', async () => {
    const result = await apiClient.getShows('batman');

    const footer = shallow(<Index t={t} result={result}/>);
    expect(toJson(footer)).toMatchSnapshot();
  });
});
