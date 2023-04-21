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
    const locais = user.ext.map(m => m.local)
    const locaisUnicos = [...new Set(locais)]

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

        const retesteAnual = user.ext.filter((f)=>{
            if(f.ultRet && f.ultRet == hoje.getFullYear()){
                return f
            }
        })

        return {vencidos:[...vencidosAnoPassado, ...vencidosAnoAtual], proxMes:[...proxMes], retesteAnual:[...retesteAnual]}
         
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
    console.log(el.firstChild.nextSibling)
    setListaAtiva(lista)

    const divs = document.querySelectorAll('.graphWrap')
    const textos = document.querySelectorAll('.filtroLocalTexto')

    divs.forEach(e => {
        e.style.borderBottom='2px solid transparent'
    });
    textos.forEach(e => {
        e.style.color='#555'
    })

    el.style.borderBottom='2px solid var(--corEscolhida)'
    el.firstChild.nextSibling.style.color='rgb(221,221,221)'
}

function filtro(el, itens){
    setListaAtiva(itens)
    const textos = document.querySelectorAll('.filtroLocalTexto')
    const quantidade = document.querySelectorAll('.filtroLocalQuantia')
    
    textos.forEach(e =>{
        e.style.color='#555'
    })
    quantidade.forEach(e =>{
        e.style.color='#555'
    })

    el.firstChild.nextSibling.style.color='rgb(221, 221, 221)'
    el.firstChild.firstChild.style.color='rgb(221, 221, 221)'

}


  return (
    <>

        <NavLink to='extnovo' className='novoRegistro' ><span>Registrar extintor</span></NavLink>
  
        <div id='resumo' className='wrapperResume'>
            <h3>Resumo dos extintores</h3>

            <div className='extResumeWrapper'>
                
                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, reverso)}>
                    <div className='progWrap' style={{'--graphColor':'#0a0', '--p':100}}>
                        <span className='extResumePercent'  >{user.ext.length}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>Total</span>
                </div>

               
                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, avariados)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().vencidos.length)<50?'less':''}`} style={{'--graphColor':'#cc0', '--p':graphPorcentagem(user.ext.length, avariados.length)}}>
                        <span className='extResumePercent'  >{avariados.length}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>Avariados</span>
                </div>

                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, recVencida().proxMes)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().proxMes.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#f70', '--p':graphPorcentagem(user.ext.length, recVencida().proxMes.length)}}>
                        <span className='extResumePercent'  >{recVencida().proxMes.length}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>Vencendo</span>
                </div>

                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, recVencida().vencidos)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().vencidos.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#a00c', '--p':(graphPorcentagem(user.ext.length, recVencida().vencidos.length))}}>
                        <span className='extResumePercent'  >{recVencida().vencidos.length}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>Vencidos</span>
                </div>

                <div className='graphWrap' onClick={({currentTarget})=>handleListaAtiva(currentTarget, recVencida().retesteAnual)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().retesteAnual.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#707', '--p':(graphPorcentagem(user.ext.length, recVencida().retesteAnual.length))}}>
                        <span className='extResumePercent'  >{recVencida().retesteAnual.length}</span>
                    </div>
                    <span className='extResumeTitle filtroLocalTexto'>Reteste</span>
                </div>

              
                
                {/* <div className='graphWrap' onClick={()=>setListaAtiva(recVencida().vencidos)}>
                    <div className={`progWrap ${graphPorcentagem(user.ext.length, recVencida().vencidos.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#a00c', '--p':(graphPorcentagem(user.ext.length, recVencida().vencidos.length))}}>
                        <span className='extResumePercent'  >{recVencida().vencidos.length}</span>
                    </div>
                    <span className='extResumeTitle'>Vencidos</span>
                </div> */}



            </div>
        </div>

        <div className='extResumeWrapperLocais'>

            {locaisUnicos.map((m)=>{

                const itens = user.ext.filter((f)=>{
                    if (f.local === m){
                        return f
                    }
                })

                return <>
                    <div className='graphWrap' onClick={({currentTarget})=>filtro(currentTarget, itens)}>
                        <div className={`progWrap ${graphPorcentagem(user.ext.length, itens.length) < 50 ? 'less' : ''}`} style={{'--graphColor':'#fff', '--p':(graphPorcentagem(user.ext.length, itens.length))}}>
                            <span className='extResumePercent filtroLocalQuantia'  >{itens.length}</span>
                        </div>
                        <span className='extResumeTitle filtroLocalTexto'>{m}</span>
                    </div>
                </>
                })}

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
                            <p className='cardTextoPqn'>tipo: {item.tipo? `${item.tipo} - ${tipoClasse(item.tipo)}` : ''}</p>
                            {/* <p className='cardTextoPqn'>classe: {item.tipo? tipoClasse(item.tipo) : ''}</p> */}
                            <p className='cardTextoPqn'>local: {item.local? item.local : ''}</p>
                        </div>

                        {/* <div> */}

                        <div>
                            <p className='cardTextoPqn'>recarga {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' ' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>}</p>
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
