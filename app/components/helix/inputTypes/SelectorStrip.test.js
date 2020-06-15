import React from 'react';
import SelectorStrip from './SelectorStrip';

describe('SelectorStrip', () => {
  const options = [
    {
      value: 'opt-1',
      label: 'First Option',
      disabled: false
    },
    {
      value: 'opt-2',
      label: 'Second Option',
      disabled: true
    }
  ];
  const defaultProps = {
    options,
    selectorName: 'test-selector',
    label: 'Select Option',
    input: {
      value: ''
    }
  };
  const wrapper = (props) => {
    return shallow(<SelectorStrip {...defaultProps} {...props} />);
  };

  const mounted = (props) => {
    return mount(<SelectorStrip {...defaultProps} {...props} />);
  };

  test('should render a label property', () => {
    const label = wrapper().find('.SelectorStrip-label').text();
    expect(label).toEqual(defaultProps.label);
  });

  test('should add hxRequired class if required prop is true`', () => {
    expect(wrapper({ required: true }).find('.hxRequired').length).toEqual(1);
  });

  describe('options', () => {
    test('input properties render option one values correctly', () => {
      const firstOption = wrapper().find('input').first().props();
      expect(firstOption.value).toEqual('opt-1');
      expect(firstOption.id).toEqual('opt-1');
      expect(firstOption.type).toEqual('radio');
      expect(firstOption.name).toEqual('test-selector');
      expect(firstOption.disabled).toEqual(false);
      expect(wrapper().find('label').first().text()).toEqual('First Option');
    });

    test('input properties render option two values correctly', () => {
      const firstOption = wrapper().find('input').last().props();
      expect(firstOption.value).toEqual('opt-2');
      expect(firstOption.id).toEqual('opt-2');
      expect(firstOption.type).toEqual('radio');
      expect(firstOption.name).toEqual('test-selector');
      expect(firstOption.disabled).toEqual(true);
      expect(wrapper().find('label').last().text()).toEqual('Second Option');
    });

    test('option checked value is set based on input.value', () => {
      const input = wrapper({ input: { value: 'opt-1' } }).find('input');
      expect(input.first().prop('checked')).toBeTruthy();
      expect(input.last().prop('checked')).toBeFalsy();
    });
  });

  test('error component is rendered if input has been touched or an error exists', () => {
    const error = mounted({ meta: { touched: true, error: ['Error!!'] } }).find('hx-error');
    expect(error.length).toBeTruthy();
    expect(error.text()).toEqual('Error!!');
  });

  test('error component is not rendered if input has not been touched', () => {
    const error = mounted({ meta: { touched: false, error: ['Error!!'] } }).find('hx-error');
    expect(error.length).toBeFalsy();
  });
});
