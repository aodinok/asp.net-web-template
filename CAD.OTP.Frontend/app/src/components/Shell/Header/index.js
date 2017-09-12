import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from './Header'
import { logout } from '../../../redux/modules/auth'

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header {...this.props} />
    )
  }
}

HeaderContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: !!state.auth.username,
  ...ownProps
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
