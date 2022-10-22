import React from 'react'
import css from './css/header.css'
import { GlobalContext } from './GlobalContext'

const Header = () => {
  const context = React.useContext(GlobalContext)
  console.log(context.userLogado)
  return (
    <div className='header'>
      <span>Bem vindo, Sr. {context.userLogado[0].perfil.nome}</span>
    </div>
  )
}

export default Header
