import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'

import createStore from './redux/create'

import Login from './components/Login'
import Shell from './components/Shell'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'

import './App.css'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Shell>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound}/>
        </Switch>
      </Shell>
    </Router>
  </Provider>
)

export default App
