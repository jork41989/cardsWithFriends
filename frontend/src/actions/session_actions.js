import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';
import { getTheCurUser } from './users_actions';


export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});


export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(() => (
    dispatch(login(user))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const login = user => dispatch => {

  return (APIUtil.login(user).then(res => {
    const { token } = res.data; 
    localStorage.setItem('jwtToken', token); 
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  .then(() => dispatch(getTheCurUser()))
    .catch(err => {
      dispatch(receiveErrors(err.response.data))
    })
}))}



export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
};
