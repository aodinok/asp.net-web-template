import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm'
import { login } from '../../redux/modules/auth'

class LoginContainer extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/home' />
    }

    return (
      <LoginForm onSubmit={this.props.onSubmit} loginError={this.props.loginError} />
    )
  }
}

LoginContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  loginError: PropTypes.string,
  history: PropTypes.object
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.token,
  loginError: state.auth.error
})

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(login(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
