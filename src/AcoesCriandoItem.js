import React from 'react'
import { Link } from 'react-router-dom'
import css from './css/acoesCriandoItem.css'

const AcoesCriandoItem = ({salvar, voltar}) => {
  return (
    <div id='acoesCriandoItemContainer'>
        <Link to={voltar}><i className="fa-solid fa-angles-left shadow"></i></Link>
        <i className="fa-solid fa-floppy-disk shadow" onClick={salvar}></i>
    </div>
  )
}

export default AcoesCriandoItem
