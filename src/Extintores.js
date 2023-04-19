import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { dataLong } from './funcoes/extDatas'
import { refreshBd, removerRegistro } from './crudFireBase'

const Extintores = () => {

    const context = useContext(GlobalContext)
    const reverso = [...context.userLogado.ext].reverse()
    const [listaAtiva, setListaAtiva] = React.useState(reverso)
    const user = context.userLogado
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
        
    }
    const navigate = useNavigate()
    const avariados = user.ext.filter((f)=>{
        if(f.avaria){
            return f
        }
    })

    const recVencida = () => {
        const hoje = new Date()

        // EXTINTORES SEM MÊS E COM ANO INFERIOR AO ATUAL
        const vencidosAnoPassado = user.ext.filter((f)=>{
            if(f.ultRec.ano && hoje.getFullYear() > f.ultRec.ano){
            // if(!f.ultRec.mes && f.ultRec.ano && hoje.getFullYear() > f.ultRec.ano){
                return f
            }else if (f.ultRec.mes && f.ultRec.ano && hoje.getMonth()){

            }
        })

        // EXTINTORES COM MÊS E ANO, ONDE RETORNA EXT COM ANO IGUAL AO ATUAL E MES MENOR AO MES ATUAL
        const vencidosAnoAtual = user.ext.filter((f)=>{
            if ((f.ultRec.mes && f.ultRec.ano) && (hoje.getFullYear() === Number(f.ultRec.ano)) && (hoje.getMonth()+1 > Number(f.ultRec.mes)) ){
                return f
            }
        })

        // EXTINTORES COM MÊS E ANO QUE VENCEM NO MÊS SEGUINTE
        const proxMes = user.ext.filter((f)=>{
            if (f.ultRec.mes == (hoje.getMonth()+2)){
                return f.num
            }
        })

        return {vencidos:[...vencidosAnoPassado, ...vencidosAnoAtual], proxMes:[...proxMes]}
         
        }

        

    async function excluirExtintor(idUser, item, campo){
        const {tempFoto, tempFotoCrop, tempWpp, tempWppCrop} = context.userLogado
        const temporarios = {tempFoto:tempFoto, tempFotoCrop:tempFotoCrop, tempWpp:tempWpp, tempWppCrop:tempWppCrop}

        await removerRegistro(idUser, item, campo)
        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update, temporarios)
    }

function tipoClasse(tipo){
    if (tipo === 'A'){
        return 'AP'
    }else if (tipo === 'B'){
        return 'PQS'
    }else if (tipo === 'C') {
        return 'CO²'
    }
}

function graphPorcentagem(total, valor){
    return 100 - (((total - valor) / total) * 100)
}

function handleListaAtiva(el, lista){
    setListaAtiva(lista)
    const divs = document.querySelectorAll('.graphWrap')
    divs.forEach(e => {
        e.style.borderBottom='2px solid transparent'
    });
    el.style.borderBottom='2px solid var(--corEscolhida)'
}



  return (
    <>

        <NavLink to='extnovo' className='novoRegistro' ><span>Registrar extintor</span></NavLink>
        {/* <div id='navbarFiltros'>

            <div id='inputSearchBody'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input id='inputBuscarExt'></input>
            </div>

            <i className="fa-solid fa-filter"></i>

        </div> */}
  
        <div id='resumo' className='wrapperResume'>
            <h3>Resumo dos extintores</h3>

            <div className='extResumeWrapper'>
                
                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, reverso)}>
                    <div className='progWrap' style={{'--graphColor':'#0a0', '--p':100}}>
                        <span className='extResumePercent'  >{user.ext.length}</span>
                    </div>
                    <span className='extResumeTitle'>Total</span>
                </div>

               
                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, avariados)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().vencidos.length)<50?'less':''}`} style={{'--graphColor':'#cc0', '--p':graphPorcentagem(user.ext.length, avariados.length)}}>
                        <span className='extResumePercent'  >{avariados.length}</span>
                    </div>
                    <span className='extResumeTitle'>Avariados</span>
                </div>

                {/* <div className='graphWrap' onClick={()=>setListaAtiva(}> */}
                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, recVencida().proxMes)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().proxMes.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#f70', '--p':graphPorcentagem(user.ext.length, recVencida().proxMes.length)}}>
                        <span className='extResumePercent'  >{recVencida().proxMes.length}</span>
                    </div>
                    <span className='extResumeTitle'>Vencendo</span>
                </div>

                <div className='graphWrap' onClick={()=>setListaAtiva(recVencida().vencidos)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().vencidos.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#a00c', '--p':(graphPorcentagem(user.ext.length, recVencida().vencidos.length))}}>
                        <span className='extResumePercent'  >{recVencida().vencidos.length}</span>
                    </div>
                    <span className='extResumeTitle'>Vencidos</span>
                </div>

            </div>
        </div>

        {listaAtiva.map((item)=>{

            return <div key={item.id+'ext'} className='ldeContent'>

                <div>
                    <p>Nº: {item.num}</p>
                    {item.avaria && <>
                                        <p >Avarias: {item.avaria} </p>
                                    </>
                    }
                </div>

                {/* <fieldset className='fieldsetFlexRow'> */}

                    {/* <legend>Extintor {item.num ? 'Nº '+item.num : 'sem número'}</legend> */}

                    <div className='ldeWrapperDados'>
                        
                        <div>
                            {/* <p>{item.tipo? item.tipo : 'N/A'}</p> */}
                            {/* <p className='cardTextoPqn'>tipo</p> */}
                            <p className='cardTextoPqn'>tipo: {item.tipo? item.tipo : ''}</p>
                            <p className='cardTextoPqn'>local: {item.local? item.local : ''}</p>
                            <p className='cardTextoPqn'>classe: {item.tipo? item.tipo : ''}</p>
                        </div>

                        {/* <div> */}

                        <div>
                            <p className='cardTextoPqn'>recarga {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? '-' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>}</p>
                            {item.ultRet && <p className='cardTextoPqn'>reteste {item.ultRet?item.ultRet:'não informado'}</p>}

                            {/* <p>{item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' de ' : '') : '' } {item.ultRec.ano ? Number(item.ultRec.ano) : ''}</p>
                            {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>} */}
                        </div>

                            {/* <div>
                                <p className='cardTextoPqn'>próx. reteste</p>
                                <p>{item.ultRet?item.ultRet:'N/A'}</p>
                            </div> */}

                        {/* </div> */}

                    {/* <div>
                        <p>{item.tipo?tipoClasse(item.tipo):'N/A'} </p>
                        <p className='cardTextoPqn'>classe </p>
                    </div>

                    <div>
                        <p>{item.local?item.local:'N/A'}</p>
                        <p className='cardTextoPqn'>local</p>
                    </div> */}

                    </div>
                {/* </fieldset> */}

                {/* <fieldset className='fieldsetFlexRow'> */}
                {/* <legend>Datas</legend> */}
               
                {/* </fieldset> */}

                

                {/* <fieldset className='fieldsetAcoes fieldsetFlexRow'> */}
                <div className='botoesPadrao'>

                    <div className='btnAcoesWrapper btnVerde' onClick={()=>navigate(`extedit?id=${item.id}`)}>
                        {/* <i className="fa-solid fa-pen-to-square" ></i> */}
                        <p>editar</p>
                    </div>
                    <div className='btnAcoesWrapper btnVermelho' onClick={()=>excluirExtintor(context.userLogado.id, item, 'ext')}>
                        {/* <i className="fa-solid fa-trash-can" ></i> */}
                        <p>excluir</p>
                    </div>
                </div>

                {/* </fieldset> */}
            </div>

            // BACKUP 
            // return <div key={item.id+'ext'} className='ldeContent'>

            //     <fieldset className='fieldsetFlexRow'>

            //         <legend>Extintor {item.num ? 'Nº '+item.num : 'sem número'}</legend>

            //         <div className='ldeWrapperDados'>
                        
            //         <div>
            //             <p className='cardTextoPqn'>tipo</p>
            //             <p>{item.tipo? item.tipo : 'N/A'}</p>
            //         </div>

            //         <div>
            //             <p className='cardTextoPqn'>classe </p>
            //             <p>{item.tipo?tipoClasse(item.tipo):'N/A'} </p>
            //         </div>

            //         <div>
            //             <p className='cardTextoPqn'>local</p>
            //             <p>{item.local?item.local:'N/A'}</p>
            //         </div>

            //         </div>
            //     </fieldset>

            //     <fieldset className='fieldsetFlexRow'>
            //     <legend>Datas</legend>
            //     <div>
            //         <p className='cardTextoPqn'>próx. recarga</p>
            //         <p>{item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' de ' : '') : '' } {item.ultRec.ano ? Number(item.ultRec.ano) : ''}</p>
            //         {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>}
            //     </div>

            //     <div>
            //         <p className='cardTextoPqn'>próx. reteste</p>
            //         <p>{item.ultRet?item.ultRet:'N/A'}</p>
            //     </div>
            //     </fieldset>

            //     {item.avaria && <fieldset className='fieldsetFlexRow'>
            //         <legend>Avarias</legend>
            //         <p >{item.avaria} </p>

            //     </fieldset>}

            //     <fieldset className='fieldsetAcoes fieldsetFlexRow'>
            //         <div className='btnAcoesWrapper' onClick={()=>navigate(`extedit?id=${item.id}`)}>
            //             {/* <i className="fa-solid fa-pen-to-square" ></i> */}
            //             <p>editar</p>
            //         </div>
            //         <div className='btnAcoesWrapper' onClick={()=>excluirExtintor(context.userLogado.id, item, 'ext')}>
            //             {/* <i className="fa-solid fa-trash-can" ></i> */}
            //             <p>excluir</p>
            //         </div>

            //     </fieldset>
            // </div>
        })}

    </>
  )
}

export default Extintores
