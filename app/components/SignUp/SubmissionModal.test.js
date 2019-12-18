import React from 'react';
import { SubmissionModal } from './SubmissionModal';
import { t } from '../../../test/i18n/mocks';
import { renderWithForm } from '../../../test/provider';

describe('SubmissionModal', () => {
  let wrapper;
  const defaultProps = {
    success: false,
    wasSubmitted: true,
    error: {
      code: 400,
      message: 'Invalid Password'
    },
    t,
    pending: false,
    username: 'user-1'
  };
  test('it renders', () => {
    const rendered = renderWithForm(SubmissionModal, { ...defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it returns correct modal text when there is a success', () => {
    wrapper = shallow(<SubmissionModal {...defaultProps} success />);
    expect(wrapper.find('h1').text()).toEqual('Success!');
    expect(wrapper.find('p').text()).toEqual('User user-1 has been created');
  });
  test('it returns invalid password error when message is "Invalid Password"', () => {
    const wrappedError = shallow(<SubmissionModal {...defaultProps} />);
    expect(wrappedError.find('h1').text()).toEqual('Error');
    expect(wrappedError.find('p').text()).toEqual(
      'Invalid Password. Please try using a more secure password.'
    );
  });

  test('it returns username error when error message relates to username', () => {
    const props = {
      error: {
        code: 400,
        message: 'User name already in use.'
      }
    };
    const wrappedError = shallow(<SubmissionModal {...defaultProps} {...props} />);
    expect(wrappedError.find('h1').text()).toEqual('Error');
    expect(wrappedError.find('p').text()).toEqual(
      'The username user-1 is already taken. Please try a different one.'
    );
  });
  test('it returns correct 401 message', () => {
    const props = {
      error: {
        code: 401
      }
    };
    const wrappedError = shallow(<SubmissionModal {...defaultProps} {...props} />);
    expect(wrappedError.find('p').text()).toEqual(
      'Not Authorized'
    );
  });
  test('it returns correct 500 message', () => {
    const props = {
      error: {
        code: 500
      }
    };
    const wrappedError = shallow(<SubmissionModal {...defaultProps} {...props} />);
    expect(wrappedError.find('p').text()).toEqual(
      'Error connecting to server'
    );
  });
  test('it returns correct default message', () => {
    const props = {
      error: {
        code: 501,
        message: 'test message'
      }
    };
    const wrappedError = shallow(<SubmissionModal {...defaultProps} {...props} />);
    expect(wrappedError.find('p').text()).toEqual(
      'There was an error processing your request: test message'
    );
  });
  test('it returns empty if pending is true', () => {
    const wrappedError = shallow(<SubmissionModal {...defaultProps} wasSubmitted={false} />);
    expect(wrappedError.find('.submission-modal').text()).toEqual('');
  });
});
