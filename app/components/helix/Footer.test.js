import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { t } from '../../../test/i18n/mocks';

describe('Footer', () => {
  test('it renders', () => {
    const component = renderer.create(<Footer t={t} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correct year', () => {
    global.Date.getFullYear = jest.fn().mockReturnValue('2013');
    const wrapper = shallow(<Footer t={t} />);
    const d = global.Date.getFullYear;
    console.log(wrapper.find('#foot').text());
  });
});
