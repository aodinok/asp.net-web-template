import React from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import styles from './styles.css'

export const Login = ({handleSubmit, loginError}) => (
  <form styleName='container' onSubmit={handleSubmit}>
    <div styleName='title'>Please login to continue.</div>
    <div styleName='field'>
      <label htmlFor='username'>Username: </label>
      <Field name="username" component="input" type="text" />
    </div>
    <div styleName='field'>
      <label htmlFor='password'>Password: </label>
      <Field name="password" component="input" type="password" />
    </div>
    <div>
      <button styleName='loginBtn' type='submit'>Login</button>
      {loginError && <div styleName='errorMessage'>{loginError}</div>}
    </div>
  </form>
)

Login.propTypes = {
  handleSubmit : PropTypes.func,
  loginError: PropTypes.string
}

export default reduxForm({form: 'login'})(CSSModules(Login, styles))
