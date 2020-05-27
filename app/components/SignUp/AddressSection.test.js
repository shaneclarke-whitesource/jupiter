import React from 'react';
import { mountWithForm } from '../../../test/provider';
import { t } from '../../../test/i18n/mocks';
import AddressSectionForm, { AddressSection } from './AddressSection';
import enzyme from 'enzyme';

describe('AddressSection', () => {
  const submit = jest.fn();
  const defaultProps = {
    t,
    setCountry: jest.fn(),
    country: 'US',
    handleSubmit: submit,
    valid: true,
    history: {
      push: jest.fn()
    }
  };

  const shallow = (props) => {
    return enzyme.shallow(<AddressSection {...defaultProps} {...props} />);
  };

  test('it renders correct labels', () => {
    const labels = shallow().find('Field').map((field) => field.prop('label'));
    expect(labels).toEqual([
      'City',
      'Street',
      'Zipcode',
      'Country',
      'State'
    ]);
  });

  test('it changes the country state when onChange is invoked', () => {
    const mounted = mountWithForm(AddressSectionForm, { defaultProps, withRouter: true });
    const event = {
      target: {
        value: 'AF'
      }
    };
    mounted.find('CountryDropdown').simulate('change', event);
    expect(mounted.find('CountryDropdown').props().value).toEqual('AF');
  });

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').first().simulate('click');
    expect(push).toBeCalledWith('/');
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('form').simulate('submit');
    expect(submit).toBeCalled();
  });

  test('next button is disabled if form is not valid', () => {
    const wrapper = shallow({ valid: false }).find('Submit').last();
    expect(wrapper.prop('disabled')).toBeTruthy();
  });
});
