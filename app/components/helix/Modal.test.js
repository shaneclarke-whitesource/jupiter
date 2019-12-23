import React from 'react';
import * as enzyme from 'enzyme';
import Modal from './Modal';
import renderer from 'react-test-renderer';

describe('Modal', () => {
  const defaultProps = { id: 'fooId' };
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();
  const defaultMountProps = { onClose: onCloseMock, onOpen: onOpenMock };
  const defaultContent = <p>Modal content</p>;
  const shallow = (props = defaultProps, content = defaultContent) => {
    return enzyme.shallow(<Modal {...props}>{content}</Modal>).find('hx-modal');
  };
  const mount = (props = defaultProps, content = defaultContent) => {
    return enzyme.mount(<Modal {...props} {...defaultMountProps}>{content}</Modal>);
  };

  it('renders with props and default props', () => {
    const rendered = renderer.create(<Modal {...defaultProps} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders children', () => {
    expect(shallow().prop('children')).toEqual(<p>Modal content</p>);
  });

  it('renders with className prop', () => {
    const modal = shallow({ className: 'modalClass', ...defaultProps });
    expect(modal.prop('class')).toEqual('Modal modalClass medium');
  });

  it('Sets modal open attribute to true', () => {
    const modal = shallow({ isOpen: true, ...defaultProps });
    expect(modal.prop('open')).toBeTruthy();
  });

  it('does not set modal open attribute to false', () => {
    const modal = shallow({ isOpen: false, ...defaultProps });
    expect(modal.prop('open')).toEqual(null);
  });

  it('calls onClose when closed', () => {
    const modal = mount();
    modal.prop('onClose')();
    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('componentDidMount adds event listeners', () => {
    const instance = mount().instance();
    instance.hxModal.addEventListener = jest.fn();
    instance.componentDidMount();
    expect(instance.hxModal.addEventListener).toHaveBeenCalledTimes(2);
    expect(instance.hxModal.addEventListener).toHaveBeenCalledWith('open', onOpenMock);
    expect(instance.hxModal.addEventListener).toHaveBeenCalledWith('close', onCloseMock);
  });

  it('componentWillUnmount removes all event listeners', () => {
    const instance = mount().instance();
    instance.hxModal.removeEventListener = jest.fn();
    instance.componentWillUnmount();
    expect(instance.hxModal.removeEventListener).toHaveBeenCalledTimes(2);
    expect(instance.hxModal.removeEventListener).toHaveBeenCalledWith('open', onOpenMock);
    expect(instance.hxModal.removeEventListener).toHaveBeenCalledWith('close', onCloseMock);
  });

  describe('size', () => {
    it('renders large', () => {
      const modal = shallow({ size: 'large' });
      expect(modal.prop('class')).toEqual('Modal  large');
    });

    it('renders medium', () => {
      const modal = shallow({ size: 'medium' });
      expect(modal.prop('class')).toEqual('Modal  medium');
    });

    it('renders small', () => {
      const modal = shallow({ size: 'small' });
      expect(modal.prop('class')).toEqual('Modal  small');
    });
  });
});
