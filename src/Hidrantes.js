import React from 'react'
import { Link } from 'react-router-dom'
import css from './css/hd.css'

const Hidrantes = () => {
  return (
    <div className='hdContainer'>

        <Link to='/home'>Home</Link>

      <div className='listaDeHds'>

        <div className='hdCard'>


            <div className='hdInfo'>
                <span>Num</span>
                <p>1</p>
            </div>

            <div className='hdInfo'>
                <span>Tipo</span>
                <p>1</p>
            </div>

            <div className='hdInfo'>
                <span>Local</span>
                <p>Subsolo</p>
            </div>

            <div className='hdInfo'>
                <span>Sinalização</span>
                <p>Ok</p>
            </div>

            <div className='hdInfo'>
                <span>Mangueiras</span>
                <p>Ok</p>
            </div>

            <div className='hdInfo'>
                <span>Chave Storz</span>
                <p>Ok</p>
            </div>
            
            <div className='hdInfo'>
                <span>Abrigo</span>
                <p>Ok</p>
            </div>

        </div>

      </div>

    </div>
  )
}

export default Hidrantes
