import { setItem as localStorageSetItem } from '../../services/localStorage';
import axios from 'axios';
import { ROOT_URL } from '../../config/networkSettings';

// Types
import {
  SIGNUP_LOADING,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_LOADING,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  RESET_VALUES,
} from '../types';

// Initial States
export const initialState = {
  isLoading: false,
  error: false,
  success: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case SIGNUP_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true
      };
    case LOGIN_LOADING:
      return {
        ...state, isLoading: true, error: false, success: false, user: null
      };
    case LOGIN_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false, user: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, user: action.payload
      };
    case LOGOUT_LOADING:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case LOGOUT_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true
      };
    case RESET_VALUES:
      return { ...state, isLoading: false, error: false, success: false };
    default:
      return state;
  }
};

// Actions
export const createUser = params => async (dispatch) => {
  dispatch({ type: SIGNUP_LOADING });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/creaateUser`, params);
    console.log('response: ' + response);
    if (response !== 'user-exists') {
      localStorageSetItem('user', response.data);
    }
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const loginUser = params => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/loginUser`, params);
    if (response.data) {
      localStorageSetItem('user', response.data);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: LOGIN_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logoutUser = params => async (dispatch) => {
  dispatch({ type: LOGOUT_LOADING });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/logoutUser`, params);
    if (response.data) {
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const resetValues = () => async (dispatch) => {
  dispatch({ type: RESET_VALUES });
};