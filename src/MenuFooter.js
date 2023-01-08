import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import css from './css/lde.css'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import {itemPorLocal, buscar} from './funcoes/filtroFuncoes'

const MenuFooter = ({selExtTipoValue, selExtTipoChange, selExtTipo, selExtTipoPlaceholder, mainIcons, mainFiltro, itens, filtroLocais, FiltroOptDisValue, filtroHandleChange, filtroLocalValue}) => {

    const context = useContext(GlobalContext)
    const [inputBuscarValor, setInputBuscarValor] = React.useState('')
    
    // BUSCAR ITENS PELO NUM
    function inputBuscar(v){
        setInputBuscarValor(v)
        context.setItensFiltrados(buscar(itens, v))
    }

    // SETAR ITENS FILTRADOS POR LOCAL
    React.useEffect(()=>{
        if (filtroLocalValue !== ''){
            const filtroLocal = itemPorLocal(itens, filtroLocalValue)
            context.setItensFiltrados(filtroLocal)
            context.setTipoFiltro(' - '+filtroLocalValue)

        }
    },[filtroLocalValue])

    // LIMPAR ITENS FILTRADOS E INPUT CADA VEZ QUE MUDAR O MODAL DO FOOTER
    React.useEffect(()=>{
        setInputBuscarValor('')
        context.setItensFiltrados('')
    },[context.modalFooter])

  return (
    <>
      <div className='ldeSubFooter'>

        {/* MODAL PADRAO */}
        {context.modalFooter === 0 && <div id='mainIcons' className='barrasFooter mainFooterBar'>
            {mainIcons.map((item, ind)=>{
                return <span key={item+ind} onClick={item.click} >{item.i}</span>
            })}
        </div >}

        {/* MODAL BUSCAR */}
        {context.modalFooter === 1 && <div id='contBuscar' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(0)} ></i>
            <input placeholder='Buscar pelo Número' value={inputBuscarValor} onChange={({target})=>inputBuscar(target.value)} />
            <i className="fa-solid fa-magnifying-glass"  ></i>
        </div>}

        {/* MODAL FILTROS */}
        {context.modalFooter === 2 && <div id='contFiltro' className='barrasFooter'  >

            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(0)} ></i>
            {mainFiltro.map((item, ind)=>{
                return <p key={item+ind}>
                {item.i}
                </p>
            })}
        </div>}

        {/* MODAL LOCAL */}
       {context.modalFooter === 3 && <div id='contLocal' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(2)} ></i>
            <Select options={filtroLocais} optionDisabledValue={FiltroOptDisValue} selectOnChange={filtroHandleChange} selectValorInicial={filtroLocalValue} />
        </div>}

        {/* MODAL TIPO DE EXTINTOR */}
        {context.modalFooter === 4 && <div id='contExtTipo' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(2)} ></i>
            <Select options={selExtTipo} optionDisabledValue={selExtTipoPlaceholder} selectOnChange={selExtTipoChange} selectValorInicial={selExtTipoValue} />
            
            </div>}

        {/* SPAN SOBRE O RESULTADO DOS FILTROS */}
        {context.itensFiltrados && <span id='resultadoFiltro'>
            {context.itensFiltrados.length} {context.itensFiltrados.length === 0 || context.itensFiltrados.length === 1?'item':'itens'} {context.tipoFiltro}
        </span>}

      </div>
    </>
  )
}

export default MenuFooter
