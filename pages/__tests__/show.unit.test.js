import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as ShowPage } from '../show';
import { t, config, apiClient } from '../../lib/testHelper';

describe('<ShowPage />', () => {
  it('getInitialProps should return object with status code', async () => {
    let props = await ShowPage.getInitialProps({ query: { id: '975' }, config });

    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props.result.statusCode).toEqual(200);
    expect(props.result.data.id).toEqual(975);

    props = await ShowPage.getInitialProps({ query: { id: '123456789' }, config });

    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props).toBeDefined();
    expect(props.result.statusCode).toEqual(404);
  });

  it('should render correctly with searchable result', async () => {
    const result = await apiClient.getShow('975');

    const show = shallow(<ShowPage t={t} result={result} />);
    expect(toJson(show)).toMatchSnapshot();
  });

  it('should render correctly with non-searchable result', async () => {
    const result = await apiClient.getShow('123456789');

    const show = shallow(<ShowPage t={t} result={result} />);
    expect(toJson(show)).toMatchSnapshot();
  });
});
