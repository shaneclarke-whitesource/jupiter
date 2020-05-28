import React from 'react';
import renderer from 'react-test-renderer';
import Popover from './Popover';

describe('Popover', () => {
  const defaultProps = {
    title: 'Role',
    role: 'Aviator',
    id: 'default-id',
    children: '<h1>Popover Content</h1>'
  };

  test('it renders correct props', () => {
    const component = renderer.create(<Popover {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders child content', () => {
    const popover = shallow(<Popover {...defaultProps} isOpen />).find('hx-popover');
    expect(popover.text()).toEqual('<h1>Popover Content</h1>');
  });

  test('it sets popover open attribute to true if isOpen is true', () => {
    const popover = shallow(<Popover {...defaultProps} isOpen />).find('hx-popover');
    expect(popover.prop('open')).toEqual(undefined);
  });

  test('it sets popover open attribute if isOpen is true', () => {
    const popover = shallow(<Popover {...defaultProps} />).find('hx-popover');
    expect(popover.prop('open')).toBeFalsy();
  });
});
