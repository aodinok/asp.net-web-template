import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { login } from '../../redux/modules/auth'

class LoginContainer extends React.Component {
  componentWillReceiveProps (nextProps) {
    const { isLoggedIn, history } = this.props
    if (!isLoggedIn && nextProps.isLoggedIn) {
      history.push('/home')
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this.props.onSubmit} />
    )
  }
}

LoginContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.username
})

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(login(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
