import React from 'react';
import SignUpSection from './SignUpSection';

describe('SignUpSection', () => {
  const child = <h1>I am the child!</h1>;

  test('it renders children', () => {
    const wrapper = mount(<SignUpSection>{child}</SignUpSection>);
    expect(wrapper.containsMatchingElement(child)).toBeTruthy();
  });
});
