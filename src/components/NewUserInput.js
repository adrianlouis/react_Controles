import React from 'react'
import css from './../css/newUserInput.css'

const NewUserInput = ({tipo, valor, onchange, placeholder, classe}) => {
  return (
    <div>
      <input id='inpgax' className={classe} type={tipo} placeholder={placeholder} value={valor} onChange={onchange}></input>
    </div>
  )
}

export default NewUserInput
