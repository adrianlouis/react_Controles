import React from 'react'
import { Link } from 'react-router-dom'
import css from './css/acoesCriandoItem.css'

const AcoesCriandoItem = ({salvar, voltar}) => {
  return (
    <div id='acoesCriandoItemContainer'>
        <Link to={voltar}><i className="fa-solid fa-angles-left"></i></Link>
        <i className="fa-solid fa-floppy-disk" onClick={salvar}></i>
    </div>
  )
}

export default AcoesCriandoItem
