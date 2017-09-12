import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'

// import auth, { rootSaga as authSaga } from './auth'
//
// export const sagas = [authSaga]

export default combineReducers({
  auth,
  form: formReducer
})
