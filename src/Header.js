import React from 'react'
import css from './css/header.css'
import { GlobalContext } from './GlobalContext'

const Header = () => {
  const context = React.useContext(GlobalContext)
  // console.log(context.userLogado.nome)

  // context.userLogado.map((item)=>{
  //   console.log(item)
  // })

  return (
    <div className='header'>
      <span>Bem vindo, Sr. {context.userLogado.nome}</span>
    </div>
  )
}

export default Header
