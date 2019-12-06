import { renderWithForm, mountWithForm } from '../../../../test/provider';
import Radio from './Radio';

describe('Radio', () => {
  let wrapper;
  const props = {
    fieldName: 'radio-buttons',
    options: [
      {
        id: 'option-1',
        label: 'First Option',
        value: 'first-option'
      },
      {
        id: 'option-2',
        label: 'Second Option',
        value: 'second-option'
      }
    ]
  };
  beforeEach(() => {
    wrapper = mountWithForm(Radio, { ...props });
  });

  test('renders with appropriate props', () => {
    const component = renderWithForm(Radio, { ...props }).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('it renders a radio for each option', () => {
    expect(wrapper.find('hx-radio-control').length).toEqual(2);
  });

  test('it renders the option labels', () => {
    const labels = wrapper.find('label').map((label) => label.text());
    expect(labels).toEqual([
      'First Option',
      'Second Option'
    ]);
  });

  test('it assigns the value prop correctly', () => {
    const labels = wrapper.find('input').map((label) => label.prop('value'));
    expect(labels).toEqual([
      'first-option',
      'second-option'
    ]);
  });

  test('it assigns the same name for both radio buttons', () => {
    const labels = wrapper.find('input').map((label) => label.prop('name'));
    expect(labels).toEqual([
      'radio-buttons',
      'radio-buttons'
    ]);
  });
});
