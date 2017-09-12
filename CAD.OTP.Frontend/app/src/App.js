import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'

import createStore from './redux/create'

import Login from './components/Login'
import Shell from './components/Shell'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'

import './App.css'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Shell isLoggedIn={window.isAuthenticated}>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Shell>
    </Router>
  </Provider>
)

export default App
