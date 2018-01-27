import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Document from '../_document';
import { config } from '../../lib/testHelper';

describe('<Document />', () => {
  it('should render correctly', () => {
    const document = shallow(<Document config={config}/>);
    expect(toJson(document)).toMatchSnapshot();
  });
});
