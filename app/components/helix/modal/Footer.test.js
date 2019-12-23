import React from 'react';
import Footer from './Footer';

describe('modal/Footer', () => {
  it('renders children', () => {
    const footerContent = '<p>Modal Footer Content</p>';
    const wrapper = shallow(<Footer>{footerContent}</Footer>).find('hx-modalfoot');
    expect(wrapper.text()).toEqual(footerContent);
  });
});
