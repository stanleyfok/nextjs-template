import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import ApiClient from '../../lib/api-client';
import Show from '../show';

const apiClient = new ApiClient('.');

describe('<Show />', () => {
  it('getInitialProps should return object with status code', async () => {
    let props = await Show.getInitialProps({ query: { id: '975' } });

    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props.statusCode).toBe(200);
    expect(props.data.id).toBe(975);

    props = await Show.getInitialProps({ query: { id: '123456789' } });

    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props.statusCode).toBe(404);
  });

  it('should render correctly with searchable result', async () => {
    const res = await apiClient.getShow('975');

    const show = render(<Show {...res} />);
    expect(toJson(show)).toMatchSnapshot();
  });

  it('should render correctly with non-searchable result', async () => {
    const res = await apiClient.getShow('123456789');

    const show = render(<Show {...res} />);
    expect(toJson(show)).toMatchSnapshot();
  });
});
