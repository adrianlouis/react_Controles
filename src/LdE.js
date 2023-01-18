import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import Header from './Header'
import IconesBottom from './IconesBottom'
import MenuFooter from './MenuFooter'
import { extFiltroNum, filtroAvaria} from './funcoes/filtroFuncoes'

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
    const [selectLocal, setSelectLocal] = React.useState('')
    const [selectLdeBateria, setSelectLdeBateria] = React.useState('')


    const [ind, setInd] = React.useState(0)
    
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

    function handleFiltroNum(){
        if (ind === 0){
            setInd(1)
            context.setTipoFiltro('em ordem crescente')
        }else if (ind === 1){
            setInd( 2)
            context.setTipoFiltro('em ordem decrescente')
        }else{
            setInd(0)
            context.setTipoFiltro('')
        }

        extFiltroNum( context.setItensFiltrados, context.userLogado.lde, ind)
    }

    function iconeBateria(bateria){
        if (bateria === '1h' || bateria === ''){
            return <i className="fa-solid fa-battery-empty"></i>
        }else if (bateria === '2h'){
            return <i className="fa-solid fa-battery-quarter"></i>
        }else if (bateria === '3h'){
            return <i className="fa-solid fa-battery-half"></i>
        }else if (bateria === '4h'){
            return <i className="fa-solid fa-battery-three-quarters"></i>
        }else if (bateria === '5h'){
            return <i className="fa-solid fa-battery-full"></i>
        }else if (bateria === '6h'){
            return <i className="fa-solid fa-battery-full"></i>
        }
    }
    
  return (
    <>

        {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
            return <div key={item.id} className='ldeContainer'>
            <div className='contSuperior'  onClick={({currentTarget})=>expandir(currentTarget, item.avaria)}>
                <div className='ldeUnidade' >
                    <i className="fa-solid fa-hashtag"></i>
                    <p>{item.num}</p>
                </div>
                <div className='ldeUnidade'>
                    <i className="fa-solid fa-location-dot"/>   
                    <p>{item.local}</p>
                </div>
                <div className='ldeUnidade'>
                    {iconeBateria(item.dur)}
                    <p>{item.dur} </p>
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
                <p>Não foram encontradas Luzes de Emergência com o número digitado.</p>
            </div>
        }

        {context.itensFiltrados && context.itensFiltrados.map((item, index)=>{
            return <div key={item.id} className='ldeContainer'>
            <div className='contSuperior'  onClick={(e)=>expandir(e.currentTarget, item.avaria)}>
                <div className='ldeUnidade' >
                    <i className="fa-solid fa-hashtag"></i>
                    <p>{item.num}</p>
                </div>
                <div className='ldeUnidade'>
                    <i className="fa-solid fa-location-dot"/> 
                    <p>{item.local}</p>
                </div>
                <div className='ldeUnidade'>
                    {iconeBateria(item.dur)}
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
              {i: <i className="fa-solid fa-magnifying-glass"></i>,
            click: ()=>{context.setModalFooter(1)}},
              {i: <i className="fa-solid fa-sliders" ></i>,
              click: ()=>context.setModalFooter(2)},
            ]
          }

          mainFiltro={
            [
                {i: <i class="fa-solid fa-hashtag" onClick={()=>handleFiltroNum()} ></i>},
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)} ></i>},
                {i: <i className="fa-solid fa-battery-three-quarters" onClick={()=>context.setModalFooter(5)} ></i>},
                {i: <i className="fa-solid fa-circle-info"  onClick={()=>filtroAvaria(context.userLogado.lde, context)} ></i>},
            ]
        }

          itens = {context.userLogado.lde}

          buscarPlaceholder='Buscar pelo Número'

          //FILTRO DE LOCAL
          filtroOptDisValue={'Escolha o local'} 
          filtroLocalValue={selectLocal}
          filtroHandleChange={({target})=>setSelectLocal(target.value)}

            //FILTRO DE BATERIA
            selLdeBateria={['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas']}
            selLdePlaceholder='Escolha a duração'
            selectLdeBateria={selectLdeBateria}
            selLdeBateriaChange={({target})=>setSelectLdeBateria(target.value)}
            // selExtTipoChange={({target})=>setSelectExtTipo(target.value)}


          filtroLocais={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']}

        
        />

        {/* <IconesBottom itens={context.userLogado.lde} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/ldenovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-location-dot", "fa-solid fa-clock", "fa-solid fa-circle-info" ]} indexModalLocal={1} indexAvarias={3} indexNum={0} indexBuscar={1} indexAutonomia={2} selectLocalOptions={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Térreo', 'Brigada', 'Escada A', 'Escada B', 'Escada C', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C', 'CMI']} autonomiaOptions={['1h', '2h', '3h', '4h', '5h', '6h']} /> */}
      
    </> 
  )
}

export default LdE
