import React from 'react';
import renderer from 'react-test-renderer';
import PhoneField from './PhoneField';

describe('PhoneField', () => {
  let mounted;
  const defaultProps = {
    input: {
      onChange: jest.fn(),
      onBlur: jest.fn()
    },
    meta: {},
    name: 'phone name',
    id: 'fooId',
    label: 'Phone test'
  };

  beforeEach(() => {
    mounted = mount(<PhoneField {...defaultProps} />);
  });

  test('it renders with props', () => {
    const component = renderer.create(<PhoneField {...defaultProps} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('it calls input onChange prop when onChange is called', () => {
    const spy = jest.spyOn(mounted.instance(), 'formatValue');
    const onChangeArgs = [
      true,
      1234567890,
      { iso2: 'US' },
      '(123) 456 7890'
    ];
    const expected = {
      valid: true,
      inputValue: 1234567890,
      number: '1234567890',
      countryCode: 'US'
    };
    mounted.instance().onChange(...onChangeArgs);
    expect(mounted.prop('input').onChange).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(mounted.prop('input').onChange).toHaveBeenCalledWith(expected);
  });

  test('it calls input onBlur prop when onBlur is invoked', () => {
    const spy = jest.spyOn(mounted.instance(), 'formatValue');
    const onChangeArgs = [
      true,
      1234567890,
      { iso2: 'US' },
      '(123) 456 7890'
    ];
    const expected = {
      valid: true,
      inputValue: 1234567890,
      number: '1234567890',
      countryCode: 'US'
    };
    mounted.instance().onBlur(...onChangeArgs);
    expect(mounted.prop('input').onBlur).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(mounted.prop('input').onBlur).toHaveBeenCalledWith(expected);
  });

  test('format value formats and returns the args', () => {
    const onChangeArgs = [
      true,
      1234567890,
      { iso2: 'US' },
      '(123) 456 7890'
    ];
    const expected = {
      valid: true,
      inputValue: 1234567890,
      number: '1234567890',
      countryCode: 'US'
    };
    const returned = mounted.instance().formatValue(...onChangeArgs);
    expect(returned).toEqual(expected);
  });
});
