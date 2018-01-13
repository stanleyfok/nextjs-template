import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import ApiClient from '../../lib/api-client';
import Index from '../index';

const apiClient = new ApiClient('.');

describe('<Index />', () => {
  it('getInitialProps should return object with status code', async () => {
    const props = await Index.getInitialProps();

    expect(props).toBeDefined();
    expect(props.data).toHaveLength(10);
    expect(props.statusCode).toBe(200);
  });

  it('should render correctly with searchable result', async () => {
    const res = await apiClient.getShows('batman');

    const index = render(<Index {...res} />);
    expect(toJson(index)).toMatchSnapshot();
  });

  it('should render correctly with non-searchable result', async () => {
    const res = await apiClient.getShows('helloword');

    const index = render(<Index {...res} />);
    expect(toJson(index)).toMatchSnapshot();
  });
});
