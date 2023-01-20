import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { Link, useNavigate } from 'react-router-dom'
import MenuFooter from './MenuFooter'

import {itemAvariado, Filtro} from './funcoes/filtroFuncoes'
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

        if (context.itensFiltrados){
            const nFiltrados = context.itensFiltrados.filter((f)=>{if(f.id !== id){return f}})
            context.setItensFiltrados(nFiltrados)
        }

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
        setSelectExtTipo('')
    },[context.modalFooter])

    // FILTRAR EXTINTORES COM AVARIA USANDO FUNÇÃO EXTERNA 
    function handleAvaria(){
        const itens = itemAvariado(context.userLogado.ext)

        const ext = new Filtro(context.userLogado.ext)

        if(context.itensFiltrados === ''){
            context.setItensFiltrados(ext.avariados())
            // context.setItensFiltrados(itens[0])
            context.setTipoFiltro('com avarias')
        }else if (JSON.stringify(ext.avariados()) === JSON.stringify(context.itensFiltrados)){
            context.setItensFiltrados(ext.naoAvariados())
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

    // FUNÇÃO PARA FILTRAR EXTINTORES COM RECARGA VENCIDA OU NO MÊS DE VENCER
    function recarga(){

        const extRecargaVencida = extintores.filter((f)=>{
            if (Number(f.ultRec.ano) <= new Date().getFullYear()){
                return f
            }
        }).sort((a, b)=>{
            return a.ultRec.ano - b.ultRec.ano
        }).filter((f)=>{
            if (f.ultRec.mes <= new Date().getMonth() && Number(f.ultRec.ano) === new Date().getFullYear() || Number(f.ultRec.ano) < new Date().getFullYear() ){
                return f
            }
        })

       if (JSON.stringify(context.itensFiltrados) !== JSON.stringify(extRecargaVencida)){
            context.setItensFiltrados(extRecargaVencida)
            context.setTipoFiltro(' com recarga vencida')
       }else{
            context.setItensFiltrados('')
            context.setTipoFiltro('')
       }
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
                <i className="fa-solid fa-hashtag"></i>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <i className="fa-solid fa-location-dot"/>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <i className="fa-solid fa-fire-extinguisher"></i>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <i className="fa-solid fa-flask-vial"></i>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <i className="fa-solid fa-calendar-day"></i>
                <p>{mesParaString(item.ultRec.mes)} de {item.ultRec.ano}</p>
                {/* <p>{attd(item.ultRec.mes)} de {item.ultRec.ano}</p> */}
                {/* <p>{new Date(item.ultRec.mes+1+' 1 '+item.ultRec.ano)}</p> */}
            </div>

            <div id='extProxRet' className='hdInfo' >
                <i className="fa-solid fa-calendar-check"></i>
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
                <i className="fa-solid fa-hashtag"></i>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <i className="fa-solid fa-location-dot"/>
                <p>{item.local}</p>
            </div>

            <div id='extTipo' className='hdInfo' >
                <i className="fa-solid fa-fire-extinguisher"></i>
                <p>{item.tipo}</p>
            </div>

            <div id='extAgente' className='hdInfo' >
                <i className="fa-solid fa-flask-vial"></i>
                {item.tipo === 'A' && <p>AP</p>}
                {item.tipo === 'B' && <p>PQS</p>}
                {item.tipo === 'C' && <p>CO²</p>}
            </div>

            <div id='extProxRec' className='hdInfo' >
                <i className="fa-solid fa-calendar-day"></i>
                <p>{mesParaString(item.ultRec.mes)} de {item.ultRec.ano}</p>
                {/* <p>{attd(item.ultRec.mes)} de {item.ultRec.ano}</p> */}
                {/* <p>{new Date(item.ultRec.mes+1+' 1 '+item.ultRec.ano)}</p> */}
            </div>

            <div id='extProxRet' className='hdInfo' >
                <i className="fa-solid fa-calendar-check"></i>
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
                {i: <Link to='/'><i className="fa-solid fa-door-open"></i></Link>},
            ]
        }

        mainFiltro={
            [
                // {i: <i className="fa-solid fa-arrow-down-1-9 filtroAtivo" ></i>},
                
                {i: <i className="fa-solid fa-fire-extinguisher" onClick={()=>context.setModalFooter(4)}></i>},
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)}></i>},
                // {i: <i className="fa-solid fa-circle-info" onClick={()=>handleAvaria()} ></i>},
                {i: <i className="fa-solid fa-circle-info" onClick={()=>handleAvaria()} ></i>},
                {i: <i className="fa-solid fa-calendar-day" onClick={()=>recarga()} ></i>},
                {i: <i className="fa-solid fa-calendar-check" onClick={()=>hidrostatico()}></i>},
            ]
        }

        itens = {context.userLogado.ext}

        buscarPlaceholder='Buscar pelo Número'

       //FILTRO POR TIPO DE EXTINTOR
       filtroTipoDeExt={{
            opt:['A', 'B', 'C'],
            placeholder:'Escolha a classe do extintor',
            change:({target})=>setSelectExtTipo(target.value),
            value:selectExtTipo
       }}

        //FILTRO DE LOCAL
        filtroLocal = {{
            opt:['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI'],
            placeholder:'Escolha o local',
            change:({target})=>setSelectLocal(target.value),
            value:selectLocal
        }}

        
        />


    </div>
  )
}

export default Extintores
