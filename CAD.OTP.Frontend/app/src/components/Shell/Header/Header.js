import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './styles.css'

const Header = ({title, logo, username, isLoggedIn, onLogout}) =>
  <nav styleName='navbar'>
    <span styleName='title'>{title}</span>
    <img styleName='logo' alt="logo" src={logo} />
    {isLoggedIn && <div styleName='username'>{username}</div>}
    {isLoggedIn && <button styleName='logout' onClick={onLogout}>Logout</button>}
  </nav>

Header.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
}

export default CSSModules(Header, styles)
