import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import Header from './Header'
import IconesBottom from './IconesBottom'
import MenuFooter from './MenuFooter'

const LdE = () => {
    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const luzes = context.userLogado.lde
    const [filtroNumerico, setFiltroNumerico] = React.useState('')
    const [filtroAutonomia, setFiltroAutonomia] = React.useState('')
    const [filtroLocal, setFiltroLocal] = React.useState('')
    const [filtroAvarias, setFiltroAvarias] = React.useState('')
    const [resFiltragem, setResFiltragem] = React.useState('')
    const [buscarValue, setBuscarValue] = React.useState('')
    const [valor, setValor] = React.useState('')
    
    function expandir(elem, avaria){

        const avarias = elem.parentNode.classList
        avarias.toggle('ldeContainerAvaria')

    }

    function excluirLde(elem, idLde){
        const item = context.userLogado.lde.filter((filtro)=>{
            return filtro.id !== idLde.id
        })
       context.setUserLogado(prev => ({...prev, lde:[ ...item ]}))
       navigate('/lde')
    }

    function ldeMenu(){
        const modal = document.querySelector('.ldeModal')
        const menu1 = document.querySelector('#ldeMenuHamburguer1')
        const menu2 = document.querySelector('#ldeMenuHamburguer2')
        const menu3 = document.querySelector('#ldeMenuHamburguer3')
        if ( modal.style.top === '0px'){
            modal.style.top = '-100%'
            menu1.style.transform='rotate(0deg)'
            menu2.style.opacity='1'
            menu2.style.width='30px'
            menu3.style.transform='rotate(0deg)'
            menu3.style.transform='rotate(0deg)'
        }else{
            modal.style.top = '0px'
            menu1.style.transform='rotate(45deg) translate(9px, 7px)'
            menu2.style.opacity='0'
            menu2.style.width='0'
            menu3.style.transform='rotate(-45deg) translate(5px, -5px)'
            // menu3.style.transform=''

        }
    }

    function limparFiltros(){
        setFiltroNumerico('')
        setFiltroAutonomia('')
        setFiltroAvarias('')
        setFiltroLocal('')
        setResFiltragem('')
        ldeMenu()
    }

    function crescente(itens){
        const crescente = []
        Object.keys(itens).map((item)=>{
            return Number(itens[item].num)}).sort((a,b)=>{
                return a - b
            }).forEach((cada)=>{
                itens.map((item)=>{
                    if (item.num === String(cada)){
                        crescente.push(item)
                    }
                })
            })
            setResFiltragem(crescente)
            context.setUserLogado({...context.userLogado, lde:[...crescente]})
        }

    function dcrescente(itens){
            const decrescente = []
            Object.keys(itens).map((item)=>{
                return Number(itens[item].num)}).sort((a,b)=>{
                    return b - a
                }).forEach((cada)=>{
                    itens.map((item)=>{
                        if (item.num === String(cada)){
                            decrescente.push(item)
                        }
                    })
                })
           setResFiltragem(decrescente)
           context.setUserLogado({...context.userLogado, lde:[...decrescente]})

    }

    React.useEffect(()=>{
        if (filtroNumerico === 'Crescente'){
            crescente(luzes)
            ldeMenu()
        }else if (filtroNumerico === 'Decrescente'){
            dcrescente(luzes)
            ldeMenu()
        }
        setFiltroNumerico('')
    },[filtroNumerico])

     function autonomia(itens){
        const res = itens.filter((fill)=>{
            return fill.dur === filtroAutonomia
        })
        setResFiltragem(res)
    }
    
    React.useEffect(()=>{
        if (filtroAutonomia !== ''){
           autonomia(luzes)
            ldeMenu()
        }
        setFiltroAutonomia('')
    },[filtroAutonomia])

    function local(itens){
        const res = itens.filter((fill)=>{
            return fill.local === filtroLocal
        })
        setResFiltragem(res)
    }

    React.useEffect(()=>{
        if(filtroLocal){
            local(luzes)
            ldeMenu()
        }
        setFiltroLocal('')
    },[filtroLocal])

    function avarias(itens){
        const res = itens.filter((fill)=>{
            if (filtroAvarias === 'Com avarias'){
                return fill.avaria !== ''
            }else if(filtroAvarias === 'Sem avarias') {
                return fill.avaria === ''
            }else{
                return itens
            }
        })
        setResFiltragem(res)
    }

    React.useEffect(()=>{
        if (filtroAvarias){
            avarias(luzes)
            ldeMenu()
        }
        setFiltroAvarias('')
    },[filtroAvarias])

    function handleBuscar(el){
        console.log(el.value)
    }

    function filtroNum(value){
        setValor(value)

        const filtrado = context.userLogado.lde.filter((filtro)=>{
            return filtro.num === value
        })

        if (filtrado.length > 0){
            setResFiltragem(filtrado)
        }else{
            setResFiltragem('')
        }

    }

    
  return (
    <>

        {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
            return <div key={item.id} className='ldeContainer'>
            <div className='contSuperior'  onClick={({currentTarget})=>expandir(currentTarget, item.avaria)}>
                <div className='ldeUnidade' >
                    <p>N??mero</p>
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

                {item.avaria && <i id='iconeAvaria' className="fa-solid fa-circle-exclamation"></i>}
                </div>

                { item.avaria && <>
                    <div className='contInferior'>
                        <textarea disabled value={item.avaria} ></textarea>
                    </div>
                </>}

                <div className='cardAcoes'>
                    {/* <span className='notReady' onClick={()=>console.log(context.userLogado)}>Editar</span> */}
                    <Link to={`edit/id?id=${item.id}&ind=${index}`}><i className="fa-solid fa-pen-to-square shadow"></i></Link>
                    <i className="fa-solid fa-trash-can shadow" onClick={({currentTarget})=>excluirLde(currentTarget ,item)}></i>
                    
                </div>
            </div>
        })}

        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
                <p>N??o foram encontradas Luzes de Emerg??ncia com o n??mero digitado.</p>
            </div>
        }

        {context.itensFiltrados && context.itensFiltrados.map((item, index)=>{
            return <div key={item.id} className='ldeContainer'>
            <div className='contSuperior'  onClick={(e)=>expandir(e.currentTarget, item.avaria)}>
                <div className='ldeUnidade' >
                    <p>N??mero</p>
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
                {item.avaria && <i id='iconeAvaria' className="fa-solid fa-circle-exclamation"></i>}
                </div>
                { item.avaria && <>
                    
                    <div className='contInferior'>
                        <textarea disabled value={item.avaria} ></textarea>
                    </div>
                </>}

                <div className='cardAcoes'>
                    <Link className='ldeSubFooterBtn' to={`edit/id?id=${item.id}&ind=${index}`}>Editar</Link>
                    <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirLde(currentTarget ,item)}>Excluir</span>
                    
                </div>
            </div>
        })}

        <MenuFooter 
        
        mainIcons={
            [
              {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
              {i: <Link to='/ldenovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
              {i: <i className="fa-solid fa-magnifying-glass"></i>},
              {i: <i className="fa-solid fa-sliders" ></i>}
            ]
          }

          itens = {context.userLogado.lde}
        
        />

        {/* <IconesBottom itens={context.userLogado.lde} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/ldenovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-location-dot", "fa-solid fa-clock", "fa-solid fa-circle-info" ]} indexModalLocal={1} indexAvarias={3} indexNum={0} indexBuscar={1} indexAutonomia={2} selectLocalOptions={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'T??rreo', 'Brigada', 'Escada A', 'Escada B', 'Escada C', '2?? Pav A', '2?? Pav B', '2?? Pav Escada C', '3?? Pav A', '3?? Pav B', '3?? Pav Escada C', '4?? Pav A', '4?? Pav B', '4?? Pav Escada C', 'CMI']} autonomiaOptions={['1h', '2h', '3h', '4h', '5h', '6h']} /> */}
      
    </> 
  )
}

export default LdE
