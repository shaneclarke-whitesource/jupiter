import React from 'react';
import Header from './Header';

describe('modal/Header', () => {
  it('renders children', () => {
    const headerContent = '<p>Modal Header Content</p>';
    const wrapper = shallow(<Header>{headerContent}</Header>).find('hx-modalhead');
    expect(wrapper.text()).toEqual(headerContent);
  });

  it('renders content', () => {
    const wrapper = shallow(<Header content="Modal Header" />).find('hx-modalhead');
    expect(wrapper.text()).toEqual('Modal Header');
  });
});
