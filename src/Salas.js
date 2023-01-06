import React from 'react'
import css from './css/salas.css'

const Salas = () => {
  return (
    <div>
      <h1>Salistas</h1>
        <div className='cardCont'>
            <div className='cardSalista'>

                <div className='cardFoto'>

                </div>

                <div className='cardNomes flex'>
                    <p>MH Vida</p>
                </div>

                <div className='cardSubnomes flex'>
                    <p>sala: 230</p>
                    <p>Louis - Psicologia</p>
                    <p>Psicologia Forense</p>
                </div>

                <div className='cardFooter flex'>
                    <p>08:00h às 17:30h</p>
                    <p>Interfonar para liberar paciente</p>
                </div>

            </div>

            <div className='cardSalistaVerso'>
                <h1>MH Vida</h1>
            </div>
        </div>
    </div>
  )
}

export default Salas
