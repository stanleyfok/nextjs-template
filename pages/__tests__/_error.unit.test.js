import React from 'react';
import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import Error from '../_error';

describe('<Error />', () => {
  it('getInitialProps should return object with status code', () => {
    let props = Error.getInitialProps({ res: { statusCode: 404 } });
    expect(props).toEqual({ statusCode: 404 });

    props = Error.getInitialProps({ err: { statusCode: 404 } });
    expect(props).toEqual({ statusCode: 404 });

    props = Error.getInitialProps({
      res: { statusCode: 404 },
      err: { statusCode: 500 },
    });

    expect(props).toEqual({ statusCode: 404 });
  });

  it('should render correctly without status code', () => {
    const document = render(<Error />);
    expect(toJson(document)).toMatchSnapshot();
  });

  it('should render correctly with status code', () => {
    const document = render(<Error statusCode={404} />);
    expect(toJson(document)).toMatchSnapshot();
  });
});
