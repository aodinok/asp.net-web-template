import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './styles.css'

const copyright = 'Oleksandr Odinok'
const contactInfo = 'niberium@gmail.com'

const Footer = () =>
  <footer styleName='footer'>
    <span>{copyright}</span>
    <span>{contactInfo}</span>
  </footer>

export default CSSModules(Footer, styles)
