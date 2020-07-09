import React from 'react';
import { mountWithForm, renderWithForm } from '../../../../test/provider';
import CustomerTypeForm, { CustomerType } from './CustomerType';
const { t } = global;

describe('CustomerType', () => {
  const handleChangeMock = jest.fn();
  const defaultProps = {
    handleChange: handleChangeMock,
    t
  };

  const shallowWrapper = (props) => {
    return shallow(<CustomerType {...defaultProps} {...props} />);
  };

  const mounted = (props) => {
    return mountWithForm(CustomerType, { defaultProps, props });
  };

  test('it renders', () => {
    const rendered = renderWithForm(CustomerTypeForm, {}).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('customer type values to match Field options', () => {
    const { options } = shallowWrapper().find('Field').props();
    const labels = options.map((label) => label.label);
    const values = options.map((value) => value.value);
    expect(labels).toEqual([
      'Rackspace',
      'RBU',
      'Onica'
    ]);
    expect(values).toEqual([
      'rackspace',
      'rbu',
      'onica'
    ]);
  });

  test('handleChange prop is invoked in dropdown', () => {
    mounted().find('select').simulate('change');
    expect(handleChangeMock).toHaveBeenCalled();
  });
});
