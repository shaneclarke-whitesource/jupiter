import React from 'react';
import Body from './Body';

describe('modal/Body', () => {
  it('renders children', () => {
    const bodyContent = '<p>Modal Body Content</p>';
    const wrapper = shallow(<Body>{bodyContent}</Body>).find('hx-modalbody');
    expect(wrapper.text()).toEqual(bodyContent);
  });
});
