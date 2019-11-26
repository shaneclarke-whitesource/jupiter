import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  const props = {
    label: 'Click Me!'
  };
  test('it renders correct props', () => {
    const component = renderer.create(<Button {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Label prop is rendered', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.text()).toEqual('Click Me!');
  });
});
