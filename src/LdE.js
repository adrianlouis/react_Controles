import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import Header from './Header'
import IconesBottom from './IconesBottom'

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

    // React.useEffect(()=>{
    //     if(valor === ''){
    //         console.log('ZERADO')
    //     }
    // },[valor])
    
    
  return (
    <>


    {/* <div className='ldeUpperFooter' >
        <div id='ldeMenu'  onClick={ldeMenu}>
            <span id='ldeMenuHamburguer1'></span>
            <span id='ldeMenuHamburguer2'></span>
            <span id='ldeMenuHamburguer3'></span>
        </div>
    </div>

    <div className='ldeModal'>

        <Link className='ldeSubFooterBtn' to='/home' >home</Link>

         
        <span>Filtrar por:</span>
        
        <Select selectValorInicial={filtroNumerico} selectOnChange={({target})=>setFiltroNumerico(target.value)} optionDisabledValue='Números' options={['Crescente', 'Decrescente']} />
        <Select selectValorInicial={filtroAutonomia} selectOnChange={({target})=>setFiltroAutonomia(target.value)} optionDisabledValue='Autonomia' options={['1h', '2h', '3h', '4h', '5h', '6h']} />
        <Select selectValorInicial={filtroLocal} selectOnChange={({target})=>setFiltroLocal(target.value)} optionDisabledValue='Localização' options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']}  />
        <Select selectValorInicial={filtroAvarias} selectOnChange={({target})=>setFiltroAvarias(target.value)} optionDisabledValue='Avarias' options={['Com avarias', 'Sem avarias']}  />

        <button className='ldeSubFooterBtn' onClick={limparFiltros} >Limpar filtro</button>

        <Link className='ldeSubFooterBtn' to='/' >logout</Link>

    </div> */}

    {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
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
            {item.avaria && <p className='ldeNotificacaoAvaria'>+</p>}
            </div>
            { item.avaria && <>
                
                <div className='contInferior'>
                    <textarea disabled value={item.avaria} ></textarea>
                </div>
            </>}

            <div className='cardAcoes'>
                {/* <span className='notReady' onClick={()=>console.log(context.userLogado)}>Editar</span> */}
                <Link className='ldeSubFooterBtn' to={`edit/id?id=${item.id}&ind=${index}`}>Editar</Link>
                <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirLde(currentTarget ,item)}>Excluir</span>
                
            </div>
        </div>
    })}

    {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>Não foram encontradas Luzes de Emergência com o número digitado.</p>
        </div>}

    {context.itensFiltrados && context.itensFiltrados.map((item, index)=>{
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
            {item.avaria && <p className='ldeNotificacaoAvaria'>+</p>}
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

    {/* <div className='ldeSubFooter'>
        <Link className='ldeSubFooterBtn' to='/ldeNovo' >nova LdE</Link>
    </div> */}

    {/* <IconesBottom buscarChange={({target})=>setBuscarValue(target.value)} buscarValor={buscarValue} novoItem='/ldenovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-clock", "fa-solid fa-circle-info" ]} /> */}
    <IconesBottom itens={context.userLogado.lde} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/ldenovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-clock", "fa-solid fa-circle-info" ]} />
      
    </> 
  )
}

export default LdE
