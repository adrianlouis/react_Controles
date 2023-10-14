import React from 'react'
import { Link } from 'react-router-dom'
import css from './css/innerHeader.css'

const InnerHeader = () => {
  return (
    <div className='innerHeader'>
      <Link className='ldeSubFooterBtn' to='/home'>Home</Link>
      <Link className='ldeSubFooterBtn' to='/'>Logout</Link>
    </div>
  )
}

export default InnerHeader
