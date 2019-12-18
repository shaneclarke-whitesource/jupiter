import signUpReducer, { INITIAL_STATE } from './signUpReducer';
import { SUBMIT_FAILURE, SUBMIT_SUCCESS, SUBMIT_PENDING } from '../actions/signUpUser';

describe('reducers/signUpReducer', () => {
  test('it should return the initial state', () => {
    expect(signUpReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  test('it should handle SUBMIT_PENDING', () => {
    expect(
      signUpReducer([], {
        type: SUBMIT_PENDING,
        pending: true
      })
    ).toEqual(
      {
        pending: true,
        error: {},
        success: false,
        user: null
      }
    );
  });
  test('it should handle SUBMIT_SUCCESS', () => {
    const data = { user: 'test user' };
    expect(
      signUpReducer([], {
        type: SUBMIT_SUCCESS,
        pending: false,
        data
      })
    ).toEqual(
      {
        success: true,
        pending: false,
        user: data,
        error: {}
      }
    );
  });
  test('it should handle SUBMIT_FAILURE', () => {
    const error = { error: 'test error' };
    expect(
      signUpReducer([], {
        type: SUBMIT_FAILURE,
        pending: false,
        error: { error }
      })
    ).toEqual(
      {
        pending: false,
        user: null,
        success: false,
        error
      }
    );
  });
});
