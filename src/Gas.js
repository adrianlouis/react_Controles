import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './css/gas.css'
import IconesBottom from './IconesBottom'
import IconsBottom from './IconsBottom'
import {ordemNumerica} from './funcoes/filtroFuncoes'
import { GlobalContext } from './GlobalContext'

const Gas = () => {

    const ctx = useContext(GlobalContext) 
    const [showContent, setShowContent] = React.useState(false)
    const navigate = useNavigate()
    const gases = ctx.userLogado.gas 
    const funcaoNum = ()=> ordemNumerica(gases)
    const novoItem = ()=>navigate('/gasnovo')
 

    function handleContent(){
        setShowContent(!showContent)
    }

    function home(){
        navigate('/home')
    }

    function sel(){
        console.log('dah')
    }

  return (
    <div className='gasContainer'>

        {ctx.userLogado.gas.map((item)=>{
            return <>
                <div key={item.id} className='gasCard' onClick={({currentTarget})=>handleContent(currentTarget)}>

                <div className='gasCardData'>
                    <div>
                    <span>Data: </span>
                    <span>{item.diaCriado}</span>
                    </div>
                        
                    <div>
                    <span>Hora: </span>
                    <span>{item.horaCriado}</span>

                    </div>
                </div>

                {showContent && <div className='gasCardContent'>

                <div className='gasCardWrapper'>
                    <span>Loja 128: </span>
                    <span>{item.l128}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 132: </span>
                    <span>{item.l132}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 137: </span>
                    <span>{item.l137}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 141: </span>
                    <span>{item.l141}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 152: </span>
                    <span>{item.l152}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 154: </span>
                    <span>{item.l154}</span>
                </div>

                <div className='gasCardWrapper'>
                    <span>Loja 157: </span>
                    <span>{item.l157}</span>
                </div>


                </div>}

                <div className='act'>
                    <i className="fa-solid fa-trash-can"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>

                </div>
            </>
        })}


        


        <IconsBottom modalFiltro={[{icone:"fa-solid fa-arrow-down-1-9", acao:funcaoNum}, {icone:"fa-solid fa-calendar-day", acao:sel}]} modalBuscar={{valorInicial:'', acao:sel, disabled:'Selecione um item', opt:['a', 'b']}} iconesDefault={[{icone:"fa-solid fa-house", acao:home}, {icone:"fa-solid fa-file-circle-plus", acao:novoItem }]} />
        {/* <IconesBottom /> */}

    </div>
  )
}

export default Gas
