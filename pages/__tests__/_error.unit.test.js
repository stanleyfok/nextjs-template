import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import Error from '../_error';

describe('<Error />', () => {
  it('getInitialProps will return object with status code', () => {
    let object = Error.getInitialProps({ res: { statusCode: 404 } });
    expect(object).toEqual({ statusCode: 404 });

    object = Error.getInitialProps({ err: { statusCode: 404 } });
    expect(object).toEqual({ statusCode: 404 });

    object = Error.getInitialProps({
      res: { statusCode: 404 },
      err: { statusCode: 500 },
    });

    expect(object).toEqual({ statusCode: 404 });
  });

  it('renders correctly without status code', () => {
    const document = render(<Error />);
    expect(toJson(document)).toMatchSnapshot();
  });

  it('renders correctly with status code', () => {
    const document = render(<Error statusCode={404} />);
    expect(toJson(document)).toMatchSnapshot();
  });
});
