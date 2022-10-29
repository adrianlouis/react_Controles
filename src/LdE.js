import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'

const LdE = () => {
    const navigate = useNavigate()
    const context = React.useContext(GlobalContext)
    const [linhasTextArea, setLinhasTextArea] = React.useState('')

    function expandir(elem, avaria){

        if (avaria){
            if ( elem.parentNode.style.height !== '250px'){
                elem.parentNode.style.height = '250px'
            }else{
                elem.parentNode.style.height = '80px'
            }
        }else{
            if (elem.parentNode.style.height !== '125px'){
                elem.parentNode.style.height = '125px'
            }else{
                elem.parentNode.style.height = '80px'

            }
        }
    }

    function excluirLde(elem, idLde){

        const item = context.userLogado.lde.filter((filtro)=>{
            return filtro.id !== idLde.id
        })

       context.setUserLogado(prev => ({...prev, lde:[ ...item ]}))
        
    }
    
  return (
    <>

    {context.userLogado && context.userLogado.lde.map((item)=>{
        return <div key={item.id} className='ldeContainer'>
        <div className='contSuperior'  onClick={(e)=>expandir(e.currentTarget, item.avaria)}>
            <div className='ldeUnidade' >
                <p>Número</p>
                <p>{item.num}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Local</p>
                <p>{item.local}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Autonomia</p>
                <p>{item.dur}</p>
            </div>
            </div>
            { item.avaria && <div className='contInferior'>
                <textarea disabled value={item.avaria} ></textarea>
            </div>}

            <div className='cardAcoes'>
                <span className='notReady' onClick={()=>console.log(context.userLogado)}>Editar</span>
                <span className='notReady' onClick={({currentTarget})=>excluirLde(currentTarget ,item)}>Excluir</span>
                
            </div>
        </div>
    })}

   
    




    <div className='ldeSubFooter'>
        <span className='ldeSubFooterBtn' >filtro</span>
        <Link className='ldeSubFooterBtn' to='/ldeNovo' >nova LdE</Link>
        <span className='ldeSubFooterBtn' onClick={()=>navigate('/home')}>voltar</span>
    </div>
      
    </>
  )
}

export default LdE
