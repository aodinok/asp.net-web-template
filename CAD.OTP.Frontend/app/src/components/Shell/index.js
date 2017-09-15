import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'

import Header from './Header'
import Footer from './Footer'
import Logo from '../../images/logo.svg'
import styles from './styles.css'

const Shell = ({children}) => (
  <div styleName='container'>
    <Header
      title='Performance Dashboard'
      logo={Logo}
    />
    <div styleName='content'>
      {children}
    </div>
    <Footer />
  </div>
)


Shell.propTypes = {
  children: PropTypes.node
}

export default CSSModules(Shell, styles)
