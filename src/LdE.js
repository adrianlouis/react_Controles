import React from 'react'
import css from './css/lde.css'
import {Link} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'

const LdE = () => {
    const context = React.useContext(GlobalContext)
    const [ordenados, setOrdenados] = React.useState([])
    const [itemOrdem, setItemOrdem] = React.useState([])


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
    
    function sort(){
        setItemOrdem([])

        const numeros = Object.keys(context.userLogado.lde).map((item)=>{
            return Number(context.userLogado.lde[item].num)
        })
  
        const ordenados = numeros.sort((a,b)=>{
            return a - b
        })

        ordenados.forEach((cada)=>{
            context.userLogado.lde.map((item)=>{
                if (item.num === String(cada)){
                    setItemOrdem(prev => ([...prev, item]))
                }
            })
        })
        
    }
    
  return (
    <>

<div className='ldeUpperFooter'>
        <Link className='ldeSubFooterBtn' to='/home' >home</Link>
        <Link className='ldeSubFooterBtn' to='/' >logout</Link>
    </div>

    {itemOrdem.length === 0 && context.userLogado && context.userLogado.lde.map((item, index)=>{
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
                {/* <span className='notReady' onClick={()=>console.log(context.userLogado)}>Editar</span> */}
                <Link className='ldeSubFooterBtn' to={`edit/id?id=${item.id}&ind=${index}`}>Editar</Link>
                <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirLde(currentTarget ,item)}>Excluir</span>
                
            </div>
        </div>
    })}


    {itemOrdem.length !== 0 && context.userLogado && itemOrdem.map((item, index)=>{
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
                {/* <span className='notReady' onClick={()=>console.log(context.userLogado)}>Editar</span> */}
                <Link className='ldeSubFooterBtn' to={`edit/id?id=${item.id}&ind=${index}`}>Editar</Link>
                <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirLde(currentTarget ,item)}>Excluir</span>
                
            </div>
        </div>
    })}


    {/* <div className='ldeSubFooter'>
        <span className='filtroLdE'>filtrar por 
            <select>
                <option selected disabled>- - - - -</option>
                <optgroup label='local'>
                <option>subsolo</option>
                <option>térreo</option>
                <option>2º pav</option>
                <option>3º pav</option>
                <option>4º pav</option>
                </optgroup>
                <optgroup label="autonomia">
                <option>1h</option>
                <option>2h</option>
                <option>3h</option>
                <option>4h</option>
                <option>5h</option>
                <option>6h+</option>
                </optgroup>


            </select>
        </span>

    </div> */}

    <div className='ldeSubFooter'>
        <span className='notReady' onClick={sort} >filtro por Num</span>
        <Link className='ldeSubFooterBtn' to='/ldeNovo' >nova LdE</Link>
        <span className='notReady' >pesquisar</span>
    </div>
      
    </>
  )
}

export default LdE
