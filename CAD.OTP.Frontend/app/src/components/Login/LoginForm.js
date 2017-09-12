import React from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import styles from './styles.css'

export const Login = (props) => (
  <form styleName='container' onSubmit={props.handleSubmit}>
    <div styleName='title'>Please login to continue.</div>
    <div styleName='field'>
      <label htmlFor='username'>Username: </label>
      <Field name="username" component="input" type="text" />
    </div>
    <div styleName='field'>
      <label htmlFor='password'>Password: </label>
      <Field name="password" component="input" type="password" />
    </div>
    <button styleName='loginBtn' type='submit'>Login</button>
  </form>
)

Login.propTypes = {
  handleSubmit : PropTypes.func
}

export default reduxForm({form: 'login'})(CSSModules(Login, styles))
