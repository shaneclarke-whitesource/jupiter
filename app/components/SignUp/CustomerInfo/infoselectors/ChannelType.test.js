import React from 'react';
import enzyme from 'enzyme';
import { renderWithForm, mountWithForm } from '../../../../../test/provider';
import { t } from '../../../../../test/i18n/mocks';
import ChannelType from './ChannelType';

describe('Product', () => {
  const mockHandleChange = jest.fn();
  const defaultProps = {
    handleChange: mockHandleChange,
    productType: '',
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<ChannelType {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(ChannelType, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('dropdown options are disabled if product type is undefined', () => {
    const wrapperProps = shallow({ productType: '' }).find('#channel-select-popover').props();
    expect(wrapperProps.disabled).toBeTruthy();
  });

  test('dropdown options are disabled if product type is not managed_vmc', () => {
    const wrapperProps = shallow({ productType: 'aws' }).find('#channel-select-popover').props();
    expect(wrapperProps.disabled).toBeTruthy();
  });

  test('dropdown options are enaled if product type is managed_vmc', () => {
    const wrapperProps = shallow({ productType: 'managed_vmc' }).find('#channel-select-popover').props();
    expect(wrapperProps.disabled).toBeFalsy();
  });

  test('tooltip prop is rendered', () => {
    const mounted = mountWithForm(ChannelType, { defaultProps });
    expect(mounted.find('hx-tooltip').length).toEqual(1);
    expect(mounted.find('hx-tooltip').text())
      .toEqual('Only Managed VMware Cloud customers have access to select channel');
  });

  // test('handleChange is invoked', () => {
  //   const props = {
  //     ...defaultProps,
  //     productType: 'managed_vmc'
  //   };
  //   // const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: 'aws' });
  //   const mounted = mountWithForm(ChannelType, { props });
  //   expect(mockHandleChange).toHaveBeenCalledTimes(1);
  // });
});
