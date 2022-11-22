import React from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import css from './css/iconesBottom.css'
import Select from './Select'

const IconesBottom = ({novoItem, iconesDeFiltragem, buscarChange, buscarValor }) => {

    const [toggleBuscar, setToggleBuscar] = React.useState(false)
    const [toggleFiltrar, setToggleFiltrar] = React.useState(false)
    const [filtroAtivo, setFiltroAtivo] = React.useState('')
    const [filtroDeLocal, setFiltroDeLocal] = React.useState('')
    const [searchValue, setSearchValue] = React.useState('')
    // const [iconesDeFiltragem, setIconesDeFiltragem] = React.useState([])

    React.useEffect(()=>{
        setSearchValue(prev => (buscarValor))
    },[buscarValor])
    
    function buscar(){
        if (!toggleBuscar){
            setToggleBuscar(!toggleBuscar)
            document.querySelector('#containerBuscar').classList.add('modalAtivo')
        }else{
            setToggleBuscar(!toggleBuscar)
            document.querySelector('#containerBuscar').classList.remove('modalAtivo')
            setSearchValue('')
        }
    }

    function filtrar(){
        if (!toggleFiltrar){
            setToggleFiltrar(!toggleFiltrar)
            document.querySelector('#containerFiltrar').classList.add('modalAtivo')
        }else{
            setToggleFiltrar(!toggleFiltrar)
            setFiltroAtivo('')
            document.querySelector('#containerFiltrar').classList.remove('modalAtivo')
        }
    }
    
    function handleFilter(filtro){
        setFiltroAtivo(prev => filtro)
        
        if(filtro === 0){
            document.querySelector('#containerFiltrarLocal').classList.add('modalAtivo')
        }else{
            document.querySelector('#containerFiltrarLocal').classList.remove('modalAtivo')
            setFiltroDeLocal('')
        }
    }

  return (
    <div>
        <div className='ldeSubFooter'>

            <Link to='/home'><i className="fa-solid fa-house" ></i></Link>
            <Link to={novoItem}><i className="fa-solid fa-file-circle-plus"></i></Link>
            <i className="fa-solid fa-magnifying-glass"  onClick={buscar} ></i>
            <i className="fa-solid fa-sliders" onClick={filtrar}></i>

            <div id='containerBuscar' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={buscar}></i>
                {/* <Input placeholder='Buscar pelo número' onChange={buscarOnChange} /> */}
                <input placeholder='Buscar pelo número' onChange={buscarChange} value={searchValue}  />
                <i className="fa-solid fa-magnifying-glass"  onClick={buscar} ></i>
            </div>

            <div id='containerFiltrar' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={filtrar}></i>

                <i className={filtroAtivo === 0 ? "fa-solid fa-location-dot filtroAtivo" : "fa-solid fa-location-dot"} onClick={()=>handleFilter(0)}></i>
                {iconesDeFiltragem.map((item, index)=>{
                    return <i className={filtroAtivo === (index+1) ? (item + ' filtroAtivo') : (item)} onClick={()=>handleFilter(index+1)}></i>

                })}


                {/* <i className={filtroAtivo === 1? "fa-solid fa-arrow-down-a-z filtroAtivo" : "fa-solid fa-arrow-down-a-z"} onClick={()=>handleFilter(1)}></i>
                <i className={filtroAtivo === 3? "fa-solid fa-calendar-days filtroAtivo" : "fa-solid fa-calendar-days"} onClick={()=>handleFilter(3)}></i>
                <i className={filtroAtivo === 4? "fa-solid fa-calendar-check filtroAtivo" : "fa-solid fa-calendar-check"} onClick={()=>handleFilter(4)}></i>
                <i className={filtroAtivo === 5? "fa-solid fa-circle-exclamation filtroAtivo" : "fa-solid fa-circle-exclamation"} onClick={()=>handleFilter(5)}></i> */}
            </div>

            <div id='containerFiltrarLocal' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={()=>handleFilter('')}></i>
                <Select selectValorInicial={filtroDeLocal} optionDisabledValue='escolha o local' selectOnChange={({target})=>setFiltroDeLocal(target.value)} options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B', 'CMI']} />
                <i className="fa-solid fa-location-dot filtroAtivo" />
            </div>

        </div>
    </div>
  )
}

export default IconesBottom
