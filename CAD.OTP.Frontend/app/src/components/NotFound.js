import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () =>
  <div style={{margin: '20px'}}>
    <h3>Page Not Found</h3>
    Unfortunately the content you’re looking for is not here.
    There may be a misspelling in your web address or you may have clicked a link for content that no longer exists.
    <h5>You can try to go <Link to='/home'>Home</Link></h5>
  </div>

export default NotFound
