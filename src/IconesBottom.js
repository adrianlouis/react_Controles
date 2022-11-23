import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import css from './css/iconesBottom.css'
import Select from './Select'
import { GlobalContext } from './GlobalContext'

const IconesBottom = ({novoItem, iconesDeFiltragem, indexModalLocal, indexAvarias, indexNum, indexAutonomia, selectLocalOptions, autonomiaOptions, itens }) => {

    const ctx = useContext(GlobalContext)
    const [toggleBuscar, setToggleBuscar] = React.useState(false)
    const [toggleAutonomia, setToggleAutonomia] = React.useState(false)
    const [toggleFiltrar, setToggleFiltrar] = React.useState(false)
    const [filtroAtivo, setFiltroAtivo] = React.useState('')
    const [filtroDeLocal, setFiltroDeLocal] = React.useState('')
    const [toggleNumOrder, setToggleNumOrder] = React.useState(0)
    const [filtroBuscar, setFiltroBuscar] = React.useState('')
    const [filtroAutonomia, setFiltroAutonomia] = React.useState('')

    React.useEffect(()=>{
        if (filtroBuscar){
            const resFiltro = itens.filter((filtro)=>{
                return filtroBuscar === filtro.num
            })

            ctx.setItensFiltrados(resFiltro)
        }
        
    },[filtroBuscar])
        
    React.useEffect(()=>{
        if (filtroDeLocal){
            const resFiltro = itens.filter((filtro)=>{
                return filtroDeLocal === filtro.local
            })

            ctx.setItensFiltrados(resFiltro)
        }
    },[filtroDeLocal])

    React.useEffect(()=>{
        if (filtroAutonomia){
            const resFiltro = itens.filter((filtro)=>{
                return filtroAutonomia === filtro.dur
            })

            ctx.setItensFiltrados(resFiltro)
        }
    },[filtroAutonomia])

    function buscar(){
        if (!toggleBuscar){
            setToggleBuscar(!toggleBuscar)
            document.querySelector('#containerBuscar').classList.add('modalAtivo')
        }else{
            setToggleBuscar(!toggleBuscar)
            document.querySelector('#containerBuscar').classList.remove('modalAtivo')
            setFiltroBuscar('')
            ctx.setItensFiltrados('')
        }
    }

    function autonomia(){
        if (!toggleAutonomia){
            document.querySelector('#containerAutonomia').classList.add('modalAtivo')
            setToggleAutonomia(!toggleAutonomia)
        }else{
            document.querySelector('#containerAutonomia').classList.remove('modalAtivo')
            setFiltroBuscar('')
            ctx.setItensFiltrados('')
            setToggleAutonomia(!toggleAutonomia)
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
        
        if(filtro === indexModalLocal){
            document.querySelector('#containerFiltrarLocal').classList.add('modalAtivo')
        }else{
            document.querySelector('#containerFiltrarLocal').classList.remove('modalAtivo')
            ctx.setItensFiltrados('')
            setFiltroDeLocal('')
        }

        if(filtro === indexAvarias){
            
            const avariados = itens.filter((filtro)=>{
                if (filtro.avaria){
                    return filtro
                }
            })

            const naoAvariados = itens.filter((filtro)=>{
                if (!filtro.avaria){
                    return filtro
                }
            })

            if (ctx.itensFiltrados.includes(...avariados)){
                ctx.setItensFiltrados(naoAvariados)
            }else if(ctx.itensFiltrados.includes(...naoAvariados)) {
                ctx.setItensFiltrados('')
                setFiltroAtivo('')
            }else{
                ctx.setItensFiltrados(avariados)
            }
        }

        if(filtro === indexNum){
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

            if(toggleNumOrder === 0){
                ctx.setItensFiltrados(crescente)
                setToggleNumOrder(1)
            }else if(toggleNumOrder === 1){
                ctx.setItensFiltrados(decrescente)
                setToggleNumOrder(2)
            }else{
                ctx.setItensFiltrados('')
                setToggleNumOrder(0)
                setFiltroAtivo('')
            }

        }

        if(filtro === indexAutonomia){
            autonomia()
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
                <input placeholder='Buscar pelo número' onChange={({target})=>setFiltroBuscar(target.value)} value={filtroBuscar}  />
                <i className="fa-solid fa-magnifying-glass"  onClick={buscar} ></i>
            </div>



            <div id='containerAutonomia' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={autonomia}></i>
                <Select selectValorInicial={filtroAutonomia} optionDisabledValue='escolha a autonomia' selectOnChange={({target})=>setFiltroAutonomia(target.value)} options={autonomiaOptions} />
                <i className="fa-solid fa-clock filtroAtivo" onClick={autonomia}></i>
            </div>

            <div id='containerFiltrar' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={filtrar}></i>

                {iconesDeFiltragem.map((item, index)=>{
                    return <i className={filtroAtivo === (index) ? (item + ' filtroAtivo') : (item)} onClick={()=>handleFilter(index)}></i>

                })}

            </div>

            <div id='containerFiltrarLocal' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={()=>handleFilter('')}></i>
                <Select selectValorInicial={filtroDeLocal} optionDisabledValue='escolha o local' selectOnChange={({target})=>setFiltroDeLocal(target.value)} options={selectLocalOptions} />
                <i className="fa-solid fa-location-dot filtroAtivo" />
            </div>

        </div>
    </div>
  )
}

export default IconesBottom
