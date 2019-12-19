import React from 'react';
import { renderWithForm, mountWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import CustomerTypeForm, { CustomerType } from './CustomerType';

describe('CustomerType', () => {
  let wrapper;
  const setAddressMock = jest.fn();
  const defaultProps = {
    setAddress: setAddressMock,
    t
  };
  beforeEach(() => {
    wrapper = mountWithForm(CustomerTypeForm, { ...defaultProps });
  });

  test('it renders', () => {
    const rendered = renderWithForm(CustomerTypeForm, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it calls setAddress with ADDRESS_FIELDS keys and values', () => {
    const event = {
      target: {
        checked: true
      }
    };
    const shallowWrapper = shallow(<CustomerType {...defaultProps} />);
    shallowWrapper.instance().handleChange(event);
    expect(setAddressMock).toHaveBeenLastCalledWith('state', 'Tokyo');
  });

  test('it calls setAddress with ADDRESS_FIELDS keys and empty values', () => {
    const event = {
      target: {
        checked: false
      }
    };
    const shallowWrapper = shallow(<CustomerType {...defaultProps} />);
    shallowWrapper.instance().handleChange(event);
    expect(setAddressMock).toHaveBeenLastCalledWith('state', '');
  });

  test('it renders the content props in the Checkbox component', () => {
    expect(wrapper.find('label').text()).toEqual('Is this for an RBU customer?');
  });
});
