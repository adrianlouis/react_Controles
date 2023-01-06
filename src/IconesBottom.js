import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import css from './css/iconesBottom.css'
import Select from './Select'
import { GlobalContext } from './GlobalContext'

// const IconesBottom = ({novoItem, iconesDeFiltragem, indexModalLocal, indexAvarias, indexNum, indexAutonomia, indexHdPecas, selectLocalOptions, autonomiaOptions, itens }) => {
const IconesBottom = ({mainIcones, novoItem, iconesDeFiltragem, indexModalLocal, indexAvarias, indexNum, indexAutonomia, indexHdPecas, selectLocalOptions, autonomiaOptions, itens }) => {

    const ctx = useContext(GlobalContext)
    const [toggleBuscar, setToggleBuscar] = React.useState(false)
    const [toggleAutonomia, setToggleAutonomia] = React.useState(false)
    const [toggleFiltrar, setToggleFiltrar] = React.useState(false)
    const [filtroAtivo, setFiltroAtivo] = React.useState('')
    const [filtroDeLocal, setFiltroDeLocal] = React.useState('')
    const [toggleNumOrder, setToggleNumOrder] = React.useState(0)
    const [filtroBuscar, setFiltroBuscar] = React.useState('')
    const [filtroAutonomia, setFiltroAutonomia] = React.useState('')
    const [resultadoFiltro, setResultadoFiltro] = React.useState('')

    React.useEffect(()=>{
        if (filtroAtivo && filtroAtivo !== 0){
            setToggleNumOrder(0)
        }
    },[filtroAtivo])

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

            if (handleFilter && resFiltro.length === 1){
                setResultadoFiltro(resFiltro.length+' item encontrado')
            }else if (handleFilter && resFiltro.length > 1){
                setResultadoFiltro(resFiltro.length+' itens encontrados')
            }else{
                setResultadoFiltro('')
            }
        }
    },[filtroDeLocal])

    React.useEffect(()=>{

        if (filtroAutonomia){
            const resFiltro = itens.filter((filtro)=>{
                return filtroAutonomia === filtro.dur
            })

            ctx.setItensFiltrados(resFiltro)
            
            if(resFiltro.length === 1){
                setResultadoFiltro(resFiltro.length+' luz de emergência')
            }else if (resFiltro.length > 1){
                setResultadoFiltro(resFiltro.length+' luzes de emergência')
            }
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
            setResultadoFiltro('')
            setFiltroAtivo('')
            setToggleAutonomia(!toggleAutonomia)
            setFiltroAutonomia('')
        }
    }

    function filtrar(){
        if (!toggleFiltrar){
            setToggleFiltrar(!toggleFiltrar)
            document.querySelector('#containerFiltrar').classList.add('modalAtivo')
        }else{
            // setToggleFiltrar(!toggleFiltrar)
            setFiltroAtivo('')
            ctx.setItensFiltrados('')
            document.querySelector('#containerFiltrar').classList.remove('modalAtivo')
        }
    }


   
    function handleFilter(filtro){
        setFiltroAtivo(filtro)
        
        if(filtro === indexModalLocal){
            document.querySelector('#containerFiltrarLocal').classList.add('modalAtivo')
            setResultadoFiltro('')
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
                setResultadoFiltro(naoAvariados.length+' itens sem avarias')
            }else if(ctx.itensFiltrados.includes(...naoAvariados)) {
                setResultadoFiltro('')
                ctx.setItensFiltrados('')
                setFiltroAtivo('')
            }else{
                ctx.setItensFiltrados(avariados)
                setResultadoFiltro(avariados.length+' itens com avarias')
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
                setResultadoFiltro('Itens em ordem crescente')
                setToggleNumOrder(1)
            }else if(toggleNumOrder === 1){
                ctx.setItensFiltrados(decrescente)
                setResultadoFiltro('Itens em ordem decrescente')
                setToggleNumOrder(2)
            }else{
                ctx.setItensFiltrados('')
                setToggleNumOrder(0)
                setResultadoFiltro('')
                setFiltroAtivo('')
            }

        }

        if(filtro === indexAutonomia){
            autonomia()
        }

        if(filtro === indexHdPecas){

            const hdsFaltandoPecas = []

            ctx.userLogado.hd.map((item)=>{
                if (item.pecas.includes('Mangueira') && item.pecas.includes('Storz') && item.pecas.includes('Esguicho')){
                }else{
                    hdsFaltandoPecas.push(item)
                }
                
            })

            ctx.setItensFiltrados(hdsFaltandoPecas)
            if(hdsFaltandoPecas.length > 0){
                setResultadoFiltro(hdsFaltandoPecas.length+' hidrantes faltando peças')
            }

        }
    }


  return (
    <div id='iconesBottom'>
        {/* <div  className='ldeSubFooter'>

            <Link to='/home'><i className="fa-solid fa-house" ></i></Link>
            <Link to={novoItem}><i className="fa-solid fa-file-circle-plus"></i></Link>
            <i className="fa-solid fa-magnifying-glass"  onClick={buscar} ></i>
            <i className="fa-solid fa-sliders" onClick={filtrar}></i>

            <div id='containerBuscar' className='modalInativoEsquerda' >
                <i className="fa-solid fa-angles-left" onClick={buscar} placeholder='buscar'></i>
                <input placeholder='Buscar pelo número' onChange={({target})=>setFiltroBuscar(target.value)} value={filtroBuscar}  />
                <i className="fa-solid fa-magnifying-glass"  onClick={buscar} ></i>
            </div>



            <div id='containerAutonomia' className='modalInativoEsquerda' >
                {resultadoFiltro && filtroAtivo === indexAutonomia && <span id='resFiltro'>{resultadoFiltro}</span>}
                <i className="fa-solid fa-angles-left" onClick={autonomia}></i>
                <Select selectValorInicial={filtroAutonomia} optionDisabledValue='escolha a autonomia' selectOnChange={({target})=>setFiltroAutonomia(target.value)} options={autonomiaOptions} />
                <i className="fa-solid fa-clock filtroAtivo" onClick={autonomia}></i>
            </div>

            <div id='containerFiltrar' className='modalInativoEsquerda' >
                {ctx.itensFiltrados && <span id='resFiltro'>{resultadoFiltro}</span>}

                <i className="fa-solid fa-angles-left" onClick={filtrar}></i>

                {iconesDeFiltragem.map((item, index)=>{
                    return <i className={filtroAtivo === (index) ? (item + ' filtroAtivo') : (item)} onClick={()=>handleFilter(index)}></i>

                })}

            </div>

            <div id='containerFiltrarLocal' className='modalInativoEsquerda' >
            {ctx.itensFiltrados && <span id='resFiltro'>{resultadoFiltro}</span>}

                <i className="fa-solid fa-angles-left" onClick={()=>handleFilter('')}></i>
                <Select selectValorInicial={filtroDeLocal} optionDisabledValue='escolha o local' selectOnChange={({target})=>setFiltroDeLocal(target.value)} options={selectLocalOptions} />
            </div>

        </div> */}

        <div className='ldeSubFooter'>

        {mainIcones.map((icones)=>{
            return <>
            <span onClick={icones.click} onFocus={icones.focus} onBlur={icones.blur} >{icones.icon}</span>
            </>
        })}


        </div>


    </div>
  )
}

export default IconesBottom
