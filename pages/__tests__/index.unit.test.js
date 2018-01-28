import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as IndexPage } from '../index';
import { config, t, apiClient } from '../../lib/testHelper';

describe('<IndexPage />', () => {
  it('getInitialProps should return object with status code', async () => {
    const props = await IndexPage.getInitialProps({ config });

    expect(props).toBeDefined();
    expect(props.result.data).toHaveLength(10);
    expect(props.result.statusCode).toEqual(200);
  });

  it('should render correctly with searchable result', async () => {
    const result = await apiClient.getShows('batman');

    const index = shallow(<IndexPage t={t} result={result} />);
    expect(toJson(index)).toMatchSnapshot();
  });

  it('should render correctly with non-searchable result', async () => {
    const result = await apiClient.getShows('helloword');

    const index = shallow(<IndexPage t={t} result={result} />);
    expect(toJson(index)).toMatchSnapshot();
  });
});
