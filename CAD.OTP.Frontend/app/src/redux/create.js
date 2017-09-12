import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/reducer'

// sagas
import { rootSaga as authSaga } from './modules/auth'

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunkMiddleware, sagaMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware)
))

sagaMiddleware.run(authSaga)

export default function() {
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default)
    })
  }

  return store
}
