import React, { useContext } from 'react'
import css from './css/salas.css'
import {virarCardSalista} from './funcoes/funcoesSalista'
import MenuFooter from './MenuFooter'
import { GlobalContext } from './GlobalContext'
import { Link } from 'react-router-dom'


const Salas = () => {

    const context = useContext(GlobalContext)
  return (
    <div>
      <h1>Salistas</h1>
        <div className='cardCont' onClick={({currentTarget})=>{virarCardSalista(currentTarget)}} >
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

        <MenuFooter 

            mainIcons={
                [
                    {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
                    {i: <Link to='/extnovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
                    {i: <i className="fa-solid fa-magnifying-glass"></i>,
                    click: ()=>{context.setModalFooter(1)} },
                    {i: <i className="fa-solid fa-sliders" ></i>,
                    click: ()=>context.setModalFooter(2)},
                ]
            }

            itens={context.userLogado.ext}

        />

    </div>
  )
}

export default Salas
