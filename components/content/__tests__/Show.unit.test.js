import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as Show } from '../Show';
import ApiClient from '../../../lib/api-client';
import { config } from '../../../lib/testHelper';

const apiClient = new ApiClient('.');

describe('<Show />', () => {
  it('should render correctly with result', async () => {
    const result = await apiClient.getShow('975');

    const footer = shallow(<Show config={config} result={result}/>);
    expect(toJson(footer)).toMatchSnapshot();
  });
});
