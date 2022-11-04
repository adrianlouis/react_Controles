import React from 'react'
import { Link } from 'react-router-dom'
import css from './css/header.css'
import { GlobalContext } from './GlobalContext'

const Header = () => {
  const context = React.useContext(GlobalContext)
  
  return (
    <div className='header'>
      <span>Bem vindo, Sr. {context.userLogado.nome}</span>
      <Link className='ldeSubFooterBtn' to='/' >logout</Link>
    </div>
  )
}

export default Header
