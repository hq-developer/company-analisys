import React from 'react';
import { render } from '@testing-library/react';

import Component from './index';

describe('<TableComponent/>', () => {
  it('should render the component', () => {
    const { container } = render(
        <Component
            headers={["Col1", "Col2", "Col3"]}
            dataSource={[
                [1, 2, 3],
                ['one', 'two', 'three'],
            ]}
        />
    );
    expect(container).toMatchSnapshot();
  });
    
});