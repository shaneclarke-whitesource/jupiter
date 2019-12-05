import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import DropDown from './Dropdown';

describe('Dropdown', () => {
  let wrapper;
  const onChangeHandler = jest.fn();
  const defaultProps = {
    label: 'Dropdown Label',
    id: 'dropdown-id',
    input: { onChange: onChangeHandler },
    options: [{
      value: 'option-1',
      label: 'First Choice'
    },
    {
      value: 'option-2',
      label: 'Second Choice'
    }]
  };

  beforeEach(() => {
    wrapper = shallow(<DropDown {...defaultProps} />);
  });

  test('it renders with appropriate props', () => {
    const component = renderer.create(<DropDown {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders multiple options based on data prop', () => {
    const options = wrapper.find('option');
    expect(options.length).toEqual(2);
  });

  test('it renders label for each option', () => {
    const options = wrapper.find('option');
    expect(options.first().text()).toEqual('First Choice');
    expect(options.at(1).text()).toEqual('Second Choice');
  });

  test('it calls onChange prop when option is chosen', () => {
    expect(defaultProps.input.onChange).toHaveBeenCalledTimes(0);
    wrapper.find('select').simulate('change', '', { value: ['option-2'] });
    expect(defaultProps.input.onChange).toHaveBeenCalled();
  });
});