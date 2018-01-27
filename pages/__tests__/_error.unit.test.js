import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { undecorated as ErrorPage } from '../_error';
import { t } from '../../lib/testHelper';

describe('<ErrorPage />', () => {
  it('getInitialProps should return object with status code', () => {
    let props = ErrorPage.getInitialProps({ res: { statusCode: 404 } });
    expect(props).toEqual({ statusCode: 404 });

    props = ErrorPage.getInitialProps({ err: { statusCode: 404 } });
    expect(props).toEqual({ statusCode: 404 });

    props = ErrorPage.getInitialProps({
      res: { statusCode: 404 },
      err: { statusCode: 500 },
    });

    expect(props).toEqual({ statusCode: 404 });
  });

  it('should render correctly without status code', () => {
    const error = shallow(<ErrorPage t={t} />);
    expect(toJson(error)).toMatchSnapshot();
  });

  it('should render correctly with status code', () => {
    const error = shallow(<ErrorPage t={t} statusCode={404} />);
    expect(toJson(error)).toMatchSnapshot();
  });
});
