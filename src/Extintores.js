import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { Link, useNavigate } from 'react-router-dom'
import MenuFooter from './MenuFooter'

import {itemAvariado, ordemCrescenteDecrescente} from './funcoes/filtroFuncoes'

const Extintores = () => {

    const context = useContext(GlobalContext)
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
    }

    const [toggle, setToggle] = React.useState(false)
    const navigate = useNavigate()
    const [extintores, setExtintores] = React.useState(context.userLogado.ext)
    const [selectLocal, setSelectLocal] = React.useState('')

    function toggleDetail(el){
       const avaria = el.nextSibling.classList
       el.classList.toggle('shadowInset')
       avaria.toggle('avariaInvisible')
       setToggle(!toggle)
        
    }

    function excluirExtintor(elem, id){
        
        const filtrado = context.userLogado.ext.filter((filtro)=>{
            return filtro.id !== id
        })

        context.setUserLogado({...context.userLogado, ext:[...filtrado]})
    }

    React.useEffect(()=>{
        setExtintores(context.userLogado.ext)
    },[context.userLogado])

    // FILTRAR EXTINTORES COM AVARIA USANDO FUNÇÃO EXTERNA 
    function handleAvaria(){
        const itens = itemAvariado(context.userLogado.ext)

        if(context.itensFiltrados === ''){
            context.setItensFiltrados(itens[0])
            context.setTipoFiltro('avariados')
        }else if (JSON.stringify(itens[0]) === JSON.stringify(context.itensFiltrados)){
            context.setItensFiltrados(itens[1])
            context.setTipoFiltro('não avariados')
        }else{
            context.setTipoFiltro('')
            context.setItensFiltrados('')
        }
    }

    // APLICAR FILTRO CRESCENTE, DEPOIS DECRESCENTE, DEPOIS REMOVER O FILTRO AO CLICAR NO MESMO ICONE
    function handleOrdem(){
        const res = ordemCrescenteDecrescente(context.userLogado.ext)
        if (context.itensFiltrados === ''){
            context.setItensFiltrados(res[0])
            context.setTipoFiltro('ordem numérica crescente')
        }else if (JSON.stringify(context.itensFiltrados) === JSON.stringify(res[0])){
            context.setItensFiltrados(res[1])
            context.setTipoFiltro('ordem numérica decrescente')
        }else{
            context.setTipoFiltro('')
            context.setItensFiltrados('')
        }
    }

  return (
    <div>
  
        {!context.itensFiltrados && extintores.map((item)=>{
            return <div key={item.id+'ext'} className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>Extintor número</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>Local:</span>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <span>Tipo:</span>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <span>Agente extintor:</span>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>Ult. Rec</span>
                <p>{item.ultRec.mes} - {item.ultRec.ano}</p>
            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>Ult. Ret</span>
                <p>{item.ultRet}</p>
            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail shadow' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }

            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>Avarias</span>
                <p className='extSpanAvarias'>{item.avaria}</p>
            </div>
            
            <div id='hdActions'>
                <i className="fa-solid fa-pen-to-square" onClick={()=>navigate(`extedit?id=${item.id}`)}></i>
                <i className="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}></i>

            </div>
        </div>


        })}

        {context.itensFiltrados && context.itensFiltrados.map((item)=>{
            return <div key={item.id+'ext'} className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>Extintor tipo {item.tipo}</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>Local:</span>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <span>Tipo:</span>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <span>Agente extintor:</span>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>Ult. Rec</span>
                <p>{item.ultRec.mes} - {item.ultRec.ano}</p>
            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>Ult. Ret</span>
                <p>{item.ultRet}</p>

            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail shadow' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }

            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>Avarias</span>
                <p className='extSpanAvarias'>{item.avaria}</p>
            </div>

            <div id='hdActions'>
                <i className="fa-solid fa-pen-to-square" onClick={()=>navigate(`extedit?id=${item.id}`)}></i>
                <i className="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}></i>
            </div>
        </div>

        })}

        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>Não foi encontrado extintor com o filtro aplicado.</p>
        </div>}

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

        mainFiltro={
            [
                {i: <i className="fa-solid fa-arrow-down-1-9" onClick={()=>handleOrdem()}></i>},
                {i: <i className="fa-solid fa-fire-extinguisher"></i>},
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)}></i>},
                {i: <i className="fa-solid fa-circle-info" onClick={()=>handleAvaria()} ></i>},
                {i: <i className="fa-solid fa-calendar-day"></i>},
                {i: <i className="fa-solid fa-calendar-check"></i>},
            ]
        }

        itens = {context.userLogado.ext}

        filtroLocais={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']}

        FiltroOptDisValue={'Escolha o local'}

        filtroLocalValue={selectLocal}

        filtroHandleChange={({target})=>setSelectLocal(target.value)}


        
        />


    </div>
  )
}

export default Extintores
