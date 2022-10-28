import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'

const LdE = () => {
    const navigate = useNavigate()
    const context = React.useContext(GlobalContext)

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

    
  return (
    <>

    {context.userLogado.lde.map((item)=>{
        // console.log(context.userLogado.lde[item].num)
        return <div key={item.num} className='ldeContainer'>
        <div className='contSuperior'  onClick={(e)=>expandir(e.currentTarget, item.avaria)}>
            <div className='ldeUnidade' >
                <p>Núm</p>
                <p>{item.num}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Pav</p>
                <p>{item.local}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Duração</p>
                <p>{item.dur}</p>
            </div>
            </div>
            { item.avaria && <div className='contInferior'>
                <textarea disabled value={item.avaria} ></textarea>
            </div>}

            <div className='cardAcoes'>
                <span className='notReady'>Editar</span>
                <span className='notReady'>Excluir</span>
                
            </div>
        </div>
    })}

   
    




    <div className='ldeSubFooter'>
        <Link className='ldeSubFooterBtn' to='/ldeNovo' >novo registro</Link>
        <span className='ldeSubFooterBtn' onClick={()=>navigate('/home')}>voltar</span>
    </div>
      
    </>
  )
}

export default LdE
