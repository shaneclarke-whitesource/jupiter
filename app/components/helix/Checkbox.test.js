import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    id: 'option-1',
    input: { onChange: jest.fn() },
    content: 'Select Me'
  };
  test('renders with appropriate props', () => {
    const component = renderer.create(<Checkbox {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('it calls onChange if input changes', () => {
    const input = shallow(<Checkbox {...defaultProps} />).find('input');
    input.simulate('change');
    expect(defaultProps.input.onChange).toHaveBeenCalled();
  });
});
