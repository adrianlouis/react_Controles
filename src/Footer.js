import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'

const Footer = ({numeroItens, itens, novoItem}) => {

    const context = useContext(GlobalContext)
    const [resultado, setResultado] = React.useState({})
    const hoje = new Date()
    const [modalAtivo, setModalAtivo] = React.useState(0)
    const [inputBuscar, setInputBuscar] = React.useState('')
    const [i, setI] = React.useState()

    function graphPorcentagem(total, valor){
        return 100 - (((total - valor) / total) * 100)
    }

    React.useEffect(()=>{

        if (itens.extintores){
            setI(itens.extintores)

            const vencidosAnoPassado = itens.extintores.filter((f)=>{
                if(f.ultRec.ano && hoje.getFullYear() > f.ultRec.ano){
                    return f
                }
            })

            const vencidosAnoAtual = itens.extintores.filter((f)=>{
                if ((f.ultRec.mes && f.ultRec.ano) && (hoje.getFullYear() === Number(f.ultRec.ano)) && (hoje.getMonth()+1 > Number(f.ultRec.mes)) ){
                    return f
                }
            })

            const proxMes = itens.extintores.filter((f)=>{
                if (f.ultRec.mes == (hoje.getMonth()+2)){
                    return f.num
                }
            })

            const avariados = itens.extintores.filter((f)=>{
                if (f.avaria){
                    return f
                }
            })

            const retesteAnual = itens.extintores.filter((f)=>{
                if(f.ultRet && f.ultRet == hoje.getFullYear()){
                    return f
                }
            })

            const locais = itens.extintores.map(m => m.local)
            const locaisUnicos = [...new Set(locais)]
            const locaisUnicoslength = locaisUnicos.map((m)=>{
                
                const a = itens.extintores.filter((f)=>{
                    if (f.local === m){
                        return f
                    }
                })
                return [a.length]
            })

            const itensPorLocal = locaisUnicos.map((m)=>{
                return itens.extintores.filter((f)=>{
                    if(f.local === m){
                        return f
                    }
                })
            })
    
            setResultado({avariados:avariados, vencidos:[...vencidosAnoPassado, ...vencidosAnoAtual], venceProxMes:proxMes, reteste:retesteAnual, locais:locaisUnicos, locaisLength:locaisUnicoslength, itensPorLocal:itensPorLocal})
        }

        if(itens.hidrantes){
            setI(itens.hidrantes)

            const avariados = itens.hidrantes.filter((f)=>{
                if (f.avaria){
                    return f
                }
            })

            const proxMes = itens.hidrantes.filter((f)=>{
                const validadeData = new Date(f.val)
                if (validadeData.getFullYear() === hoje.getFullYear() && (validadeData.getMonth()) === hoje.getMonth()+1){
                    return f
                }
            })

            const locais = itens.hidrantes.map(m => m.local)
            const locaisUnicos = [...new Set(locais)]

            const locaisUnicoslength = locaisUnicos.map((m)=>{
                
                const a = itens.hidrantes.filter((f)=>{
                    if (f.local === m){
                        return f
                    }
                })
                return [a.length]
            })

            const itensPorLocal = locaisUnicos.map((m)=>{
                return itens.hidrantes.filter((f)=>{
                    if(f.local === m){
                        return f
                    }
                })
            })

            
            setResultado({avariados:avariados, venceProxMes:proxMes, locais:locaisUnicos, locaisLength:locaisUnicoslength, itensPorLocal:itensPorLocal })
        }
        
    },[itens])

    function handleInputBuscar(v){
        setInputBuscar(v)

        const resBuscar = () => {return i.filter((f)=>{
            if (f.num.slice(0, v.length) === v){
                return f
            }
        })}

        context.setItensFiltrados(resBuscar())
    }

    function handleCancelarBusca(){
        setInputBuscar('')
        context.setItensFiltrados('')
        setModalAtivo(0)
    }

    


  return (

    <>

        {/* ICONES DO FOOTER  */}
        <div className='ftr'>
            <i className="fa-solid fa-magnifying-glass" onClick={()=>setModalAtivo(modalAtivo === 2 ? 0 : 2)}></i>
            <i className="fa-solid fa-location-dot" onClick={()=>setModalAtivo(modalAtivo === 3 ? 0 : 3)} ></i>
            <i className="fa-solid fa-circle-info" onClick={()=>setModalAtivo(modalAtivo === 1? 0 : 1)} ></i>
            <NavLink to={novoItem} ><i className="fa-solid fa-plus"></i></NavLink>
        </div>

        {/* DIV DO BUSCAR  */}
        <div className='divInputBuscar' style={{bottom:modalAtivo === 2 ? '50px' : '-110px'}}>
            <input placeholder='buscar por número' value={inputBuscar} onChange={({target})=>handleInputBuscar(target.value)} ></input>
            <i className="fa-solid fa-rectangle-xmark" onClick={()=>handleCancelarBusca()}></i>
        </div>

        {/* DIV COM RESUMO  */}
        <div id='resumo' className='wrapperResume' style={{bottom:modalAtivo === 1 ? '50px' : '-110px'}} >

            <div className='graphWrap' onClick={()=>context.setItensFiltrados('')} >
                <div className='progWrap' style={{'--graphColor':'#0a0', '--p':100}}>
                    <span className='extResumePercent'  >{numeroItens}</span>
                </div>
                <span className='extResumeTitle filtroLocalTexto'>Total</span>
            </div>

            {resultado.avariados && <div className='graphWrap' onClick={()=>context.setItensFiltrados(resultado.avariados)} >
                <div className={`progWrap ${graphPorcentagem(numeroItens, resultado.avariados.length)<50?'less':''}`} style={{'--graphColor':'#cc0', '--p':graphPorcentagem(numeroItens, resultado.avariados.length)}}>
                    <span className='extResumePercent'  >{resultado.avariados.length}</span>
                </div>
                <span className='extResumeTitle filtroLocalTexto'>Avariados</span>
            </div>}

            {resultado.venceProxMes && <div className='graphWrap' onClick={()=>context.setItensFiltrados(resultado.venceProxMes)} >
                <div className={`progWrap ${graphPorcentagem(numeroItens, resultado.venceProxMes.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#f70', '--p':graphPorcentagem(numeroItens, resultado.venceProxMes.length)}}>
                    <span className='extResumePercent'  >{resultado.venceProxMes.length}</span>
                </div>
                <span className='extResumeTitle filtroLocalTexto'>Vencendo</span>
            </div>}

            {resultado.vencidos && <div className='graphWrap' onClick={()=>context.setItensFiltrados(resultado.vencidos)} >
                <div className={`progWrap ${graphPorcentagem(numeroItens, resultado.vencidos.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#a00c', '--p':(graphPorcentagem(numeroItens, resultado.vencidos.length))}}>
                    <span className='extResumePercent'  >{resultado.vencidos.length}</span>
                </div>
                <span className='extResumeTitle filtroLocalTexto'>Vencidos</span>
            </div>}

            {resultado.reteste && <div className='graphWrap' onClick={()=>context.setItensFiltrados(resultado.reteste)} >
                <div className={`progWrap ${graphPorcentagem(numeroItens, resultado.reteste.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#707', '--p':(graphPorcentagem(numeroItens, resultado.reteste.length))}}>
                    <span className='extResumePercent'  >{resultado.reteste.length}</span>
                </div>
                <span className='extResumeTitle filtroLocalTexto'>Reteste</span>
            </div>}
                
        </div>

        {/* DIV DOS LOCAIS EXISTENTES */}
        {resultado.locais && <div className='footerLocais' style={{bottom:modalAtivo === 3 ? '50px' : '-135px'}}>
           {resultado.locais.map((m, i)=>{
            return  <div className='graphWrap' key={i+'item'} onClick={()=>context.setItensFiltrados(resultado.itensPorLocal[i])} >
                        <div className={`progWrap ${graphPorcentagem(numeroItens, resultado.locaisLength[i]) < 50 ? 'less' : ''}`} style={{'--graphColor':'#a00c', '--p':(graphPorcentagem(numeroItens, resultado.locaisLength[i]))}}>
                        <span className='extResumePercent'  >{resultado.locaisLength[i]}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>{m}</span>
                    </div>
            })}
        </div>}
      
    </>
  )
}

export default Footer
