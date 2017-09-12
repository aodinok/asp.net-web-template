import { call, put, takeLatest } from 'redux-saga/effects'

const LOGIN = 'ccad-otp/auth/LOGIN'
const LOGIN_SUCCESS = 'ccad-otp/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'ccad-otp/auth/LOGIN_FAIL'
const LOGOUT = 'ccad-otp/auth/LOGOUT'
const LOGOUT_SUCCESS = 'ccad-otp/auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'ccad-otp/auth/LOGOUT_FAIL'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        username: action.username
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        username: null,
        loginError: action.error
      }
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        username: null
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      }
    default:
      return state
  }
}

export function login (payload) {
  return {type: LOGIN, payload}
}

function* doLogin(action) {
  try {
    const response = yield call(() => fetch('./token'), action.payload)
    yield put({type: LOGIN_SUCCESS, token: response.token, username: 'fakeUser'})
  } catch (e) {
    yield put({type: LOGIN_FAIL, message: e.message})
  }
}

export function logout (payload) {
  return {type: LOGOUT, payload}
}

function* doLogout(action) {
  try {
    const response = yield call(() => fetch('./logout'), action.payload)
    yield put({type: LOGOUT_SUCCESS, token: response.token})
  } catch (e) {
    yield put({type: LOGOUT_FAIL, message: e.message})
  }
}

export function* rootSaga() {
  yield [
    takeLatest(LOGIN, doLogin),
    takeLatest(LOGOUT, doLogout)
  ]
}
