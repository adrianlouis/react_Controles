import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { Link, useNavigate } from 'react-router-dom'
import MenuFooter from './MenuFooter'

import {itemAvariado} from './funcoes/filtroFuncoes'
import { mesParaString } from './funcoes/extDatas'

const Extintores = () => {

    const context = useContext(GlobalContext)
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
        
    }

    const [toggle, setToggle] = React.useState(false)
    const navigate = useNavigate()
    const [extintores, setExtintores] = React.useState(context.userLogado.ext)
    const [selectLocal, setSelectLocal] = React.useState('')
    const [selectExtTipo, setSelectExtTipo] = React.useState('')

    const extClasseA = extintores.filter((f)=>{
        if (f.tipo === 'A'){
            return f
        }
    })
    const extClasseB = extintores.filter((f)=>{
        if (f.tipo === 'B'){
            return f
        }
    })
    const extClasseC = extintores.filter((f)=>{
        if (f.tipo === 'C'){
            return f
        }
    })

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
        if (selectExtTipo === 'A'){
            context.setItensFiltrados(extClasseA)
            context.setTipoFiltro('classe A')
        }else if (selectExtTipo === 'B'){
            context.setItensFiltrados(extClasseB)
            context.setTipoFiltro('classe B')
        }else if (selectExtTipo === 'C'){
            context.setItensFiltrados(extClasseC)
            context.setTipoFiltro('classe C')
        }
    },[selectExtTipo])

    React.useEffect(()=>{
        setExtintores(context.userLogado.ext)
    },[context.userLogado])

    React.useEffect(()=>{
        context.setItensFiltrados('')
        setSelectExtTipo('')
        context.setTipoFiltro('')
        setSelectLocal('')
    },[context.modalFooter])

    // FILTRAR EXTINTORES COM AVARIA USANDO FUNÇÃO EXTERNA 
    function handleAvaria(){
        const itens = itemAvariado(context.userLogado.ext)

        if(context.itensFiltrados === ''){
            context.setItensFiltrados(itens[0])
            context.setTipoFiltro('com avarias')
        }else if (JSON.stringify(itens[0]) === JSON.stringify(context.itensFiltrados)){
            context.setItensFiltrados(itens[1])
            context.setTipoFiltro('sem avarias')
        }else{
            context.setTipoFiltro('')
            context.setItensFiltrados('')
        }
    }

  
    function hidrostatico(){
        const res = extintores.filter((f)=>{
            if (f.ultRet < new Date().getFullYear()){
                return f
            }
        })

        if (JSON.stringify(res) !== JSON.stringify(context.itensFiltrados)){
            context.setItensFiltrados(res)
            context.setTipoFiltro(' com reteste vencido')
        }else{
            context.setItensFiltrados('')
        }

    }

    function reteste(){
        const anoReteste = extintores.filter((f)=>{
            if (Number(f.ultRec.ano) <= new Date().getFullYear()){
                return f
            }
        })
    }


    // ATUALIZAÇÃO DOS MESES EM EXT DO USER LOGADO - REMOVER APOS O PRIMEIRO CLICK DO USER
    function att(){
const meses = extintores.map((m)=>{
    if (m.ultRec.mes === 'Jan'){
        return 0
    }else if (m.ultRec.mes === 'Fev'){
        return 1
    }else if (m.ultRec.mes === 'Mar'){
        return 2
    }else if (m.ultRec.mes === 'Abr'){
        return 3
    }else if (m.ultRec.mes === 'Mai'){
        return 4
    }else if (m.ultRec.mes === 'Jun'){
        return 5
    }else if (m.ultRec.mes === 'Jul'){
        return 6
    }else if (m.ultRec.mes === 'Ago'){
        return 7
    }else if (m.ultRec.mes === 'Set'){
        return 8
    }else if (m.ultRec.mes === 'Out'){
        return 9
    }else if (m.ultRec.mes === 'Nov'){
        return 10
    }else if (m.ultRec.mes === 'Dez'){
        return 11
    }
})
const conversao = extintores.map((m, i)=>{
    return {...m, ultRec:{...m.ultRec, mes:meses[i]}}
})
context.setUserLogado({...context.userLogado, ext:[...conversao]})
}


  return (
    <div>

        {/* <button onClick={()=>att()} >Att</button> */}
  
        {!context.itensFiltrados && extintores.map((item)=>{
            return <div key={item.id+'ext'} className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>extintor número</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>local</span>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <span>classe:</span>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <span>tipo</span>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>última recarga</span>
                <p>{mesParaString(item.ultRec.mes)} de {item.ultRec.ano}</p>
                {/* <p>{attd(item.ultRec.mes)} de {item.ultRec.ano}</p> */}
                {/* <p>{new Date(item.ultRec.mes+1+' 1 '+item.ultRec.ano)}</p> */}
            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>próximo reteste</span>
                <p>{item.ultRet}</p>
            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail shadow' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }

            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>avarias</span>
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
                <span>extintor número</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>local</span>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <span>classe:</span>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <span>tipo</span>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>última recarga</span>
                <p>{mesParaString(item.ultRec.mes)} de {item.ultRec.ano}</p>
                {/* <p>{attd(item.ultRec.mes)} de {item.ultRec.ano}</p> */}
                {/* <p>{new Date(item.ultRec.mes+1+' 1 '+item.ultRec.ano)}</p> */}
            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>próximo reteste</span>
                <p>{item.ultRet}</p>
            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail shadow' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }

            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>avarias</span>
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
                // {i: <i className="fa-solid fa-arrow-down-1-9 filtroAtivo" onClick={({currentTarget})=>handleOrdem(currentTarget)}></i>},
                {i: <i className="fa-solid fa-fire-extinguisher" onClick={()=>context.setModalFooter(4)}></i>},
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)}></i>},
                {i: <i className="fa-solid fa-circle-info" onClick={()=>handleAvaria()} ></i>},
                {i: <i className="fa-solid fa-calendar-day" onClick={()=>reteste()} ></i>},
                {i: <i className="fa-solid fa-calendar-check" onClick={()=>hidrostatico()}></i>},
            ]
        }

        itens = {context.userLogado.ext}

        filtroLocais={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']}
        selExtTipo={['A', 'B', 'C']}

        FiltroOptDisValue={'Escolha o local'}
        selExtTipoPlaceholder={'Escolha a classe do extintor'}

        filtroLocalValue={selectLocal}
        selExtTipoValue={selectExtTipo}

        filtroHandleChange={({target})=>setSelectLocal(target.value)}
        selExtTipoChange={({target})=>setSelectExtTipo(target.value)}

        
        />


    </div>
  )
}

export default Extintores
