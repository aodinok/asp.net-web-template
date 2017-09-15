import { call, put, takeLatest, race, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { getAuthToken, setAuthToken, removeAuthToken } from '../../services/authToken'
import { fetchToken, killToken } from '../../services/apiClient'

const LOGIN = 'ccad-otp/auth/LOGIN'
const LOGIN_SUCCESS = 'ccad-otp/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'ccad-otp/auth/LOGIN_FAIL'
const LOGOUT = 'ccad-otp/auth/LOGOUT'
const LOGOUT_SUCCESS = 'ccad-otp/auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'ccad-otp/auth/LOGOUT_FAIL'

const initialState = {
  loggingIn: false,
  loggingOut: false,
  username: null,
  expiresAt: null,
  error: null,
  ...getAuthToken()
}

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
        token: action.token,
        username: action.username,
        expiresAt: action.expiresAt,
        error: null
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        username: null,
        token: null,
        expiresAt: null,
        error: action.error
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
        username: null,
        token: null,
        expiresAt: null,
        error: null
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        error: action.error
      }
    default:
      return state
  }
}

export function login (payload) {
  return {type: LOGIN, payload}
}

function* doLogin(action) {
  let expiresIn = 0
  try {
    const response = yield call(fetchToken, action.payload)
    if (response.error) {
      throw new Error(response.error_description || response.error)
    }
    expiresIn = response.expires_in
    yield call(setAuthToken, response)
    const token = yield call(setAuthToken, response)
    yield put({type: LOGIN_SUCCESS, ...token})
  } catch (e) {
    yield put({type: LOGIN_FAIL, error: e.message})
  }

  // auto logout on token expiration
  if (expiresIn > 0) {
    const winner = yield race({
      logoutByUser: take(LOGOUT),
      logoutByTimeout: call(delay, expiresIn * 1000)
    })
    if (winner.logoutByTimeout) {
      yield put({type: LOGOUT})
    }
  }
}

export function logout (payload) {
  return {type: LOGOUT, payload}
}

function* doLogout(action) {
  try {
    yield call(killToken, action.payload)
    yield call(removeAuthToken)
    yield put({type: LOGOUT_SUCCESS})
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
