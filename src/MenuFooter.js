import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import css from './css/lde.css'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import {itemPorLocal, buscar} from './funcoes/filtroFuncoes'

const MenuFooter = ({filtroTipoDeExt, ldeSelect, filtroLocal, buscarPlaceholder, mainIcons, mainFiltro, itens}) => {

    const context = useContext(GlobalContext)
    const [inputBuscarValor, setInputBuscarValor] = React.useState('')

    // BUSCAR ITENS PELO NUM
    function inputBuscar(v){
        setInputBuscarValor(v)
        context.setItensFiltrados(buscar(itens, v))
    }

    // SETAR ITENS FILTRADOS POR LOCAL
    React.useEffect(()=>{
        if (filtroLocal.value !== ''){
            const res = itemPorLocal(itens, filtroLocal.value)
            context.setItensFiltrados(res)
            context.setTipoFiltro(' - '+filtroLocal.value)

        }
    },[filtroLocal.value])

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

        {/* MODAL DE BUSCAR */}
        {context.modalFooter === 1 && <div id='contBuscar' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(0)} ></i>
            <input placeholder={buscarPlaceholder} value={inputBuscarValor} onChange={({target})=>inputBuscar(target.value)} />
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

        {/* MODAL DE LOCAL */}
       {filtroLocal && context.modalFooter === 3 && <div id='contLocal' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(2)} ></i>
            <Select options={filtroLocal.opt} optionDisabledValue={filtroLocal.placeholder} selectOnChange={filtroLocal.change} selectValorInicial={filtroLocal.value} />
        </div>}

        {/* MODAL TIPO DE EXTINTOR */}
        {filtroTipoDeExt && context.modalFooter === 4 && <div id='contExtTipo' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(2)} ></i>
            <Select options={filtroTipoDeExt.opt} optionDisabledValue={filtroTipoDeExt.placeholder} selectOnChange={filtroTipoDeExt.change} selectValorInicial={filtroTipoDeExt.value} />
            </div>}

        {/* SPAN SOBRE O RESULTADO DOS FILTROS */}
        {context.itensFiltrados && <span id='resultadoFiltro'>
            {context.itensFiltrados.length} {context.itensFiltrados.length === 0 || context.itensFiltrados.length === 1?'item':'itens'} {context.tipoFiltro}
        </span>}

        {/* MODAL BATERIA DE LUZ DE EMERGENCIA */}
        {ldeSelect && context.modalFooter === 5 && <div id='contLdeBateria' className='barrasFooter'>
            <i className="fa-solid fa-backward" onClick={()=>context.setModalFooter(2)} ></i>
            <Select options={ldeSelect.opt} optionDisabledValue={ldeSelect.placeholder} selectOnChange={ldeSelect.change} selectValorInicial={ldeSelect.value} />
        </div>}

      </div>
    </>
  )
}

export default MenuFooter
