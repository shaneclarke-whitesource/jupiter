import React from 'react';
import renderer from 'react-test-renderer';
import Submit from './Submit';

describe('Submit', () => {
  const props = {
    label: 'Submit!'
  };
  test('it renders correct props', () => {
    const component = renderer.create(<Submit {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Label prop is rendered', () => {
    const wrapper = shallow(<Submit {...props} />);
    expect(wrapper.prop('label')).toEqual('Submit!');
  });
});
