import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { dataLong } from './funcoes/extDatas'
import { refreshBd, removerRegistro } from './crudFireBase'
import Footer from './Footer'

const Extintores = () => {

    const context = useContext(GlobalContext)
    const reverso = [...context.userLogado.ext].reverse()
    const [listaAtiva, setListaAtiva] = React.useState(([...context.userLogado.ext]).reverse())
    const user = context.userLogado
    // const locais = user.ext.map(m => m.local)
    // const locaisUnicos = [...new Set(locais)]
    // const [filter, setFilter] = React.useState(false)
    // const [resumo, setResumo] = React.useState(false)

    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
        
    }
    const navigate = useNavigate()
    

    // const recVencida = () => {
    //     const hoje = new Date()

    //     // EXTINTORES SEM MÊS E COM ANO INFERIOR AO ATUAL
    //     const vencidosAnoPassado = user.ext.filter((f)=>{
    //         if(f.ultRec.ano && hoje.getFullYear() > f.ultRec.ano){
    //         // if(!f.ultRec.mes && f.ultRec.ano && hoje.getFullYear() > f.ultRec.ano){
    //             return f
    //         }else if (f.ultRec.mes && f.ultRec.ano && hoje.getMonth()){

    //         }
    //     })

    //     // EXTINTORES COM MÊS E ANO, ONDE RETORNA EXT COM ANO IGUAL AO ATUAL E MES MENOR AO MES ATUAL
    //     const vencidosAnoAtual = user.ext.filter((f)=>{
    //         if ((f.ultRec.mes && f.ultRec.ano) && (hoje.getFullYear() === Number(f.ultRec.ano)) && (hoje.getMonth()+1 > Number(f.ultRec.mes)) ){
    //             return f
    //         }
    //     })

    //     // EXTINTORES COM MÊS E ANO QUE VENCEM NO MÊS SEGUINTE
    //     const proxMes = user.ext.filter((f)=>{
    //         if (f.ultRec.mes == (hoje.getMonth()+2)){
    //             return f.num
    //         }
    //     })

    //     const retesteAnual = user.ext.filter((f)=>{
    //         if(f.ultRet && f.ultRet == hoje.getFullYear()){
    //             return f
    //         }
    //     })

    //     return {vencidos:[...vencidosAnoPassado, ...vencidosAnoAtual], proxMes:[...proxMes], retesteAnual:[...retesteAnual]}
         
    //     }

        

    async function excluirExtintor(idUser, item, campo){
        // const {tempFoto, tempFotoCrop, tempWpp, tempWppCrop} = context.userLogado
        // const temporarios = {tempFoto:tempFoto, tempFotoCrop:tempFotoCrop, tempWpp:tempWpp, tempWppCrop:tempWppCrop}

        const nArray = listaAtiva.filter((f)=>{
            if (f !== item){
                return f
            }
        })
        
        setListaAtiva(nArray)


        await removerRegistro(idUser, item, campo)
        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update)
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

// function graphPorcentagem(total, valor){
//     return 100 - (((total - valor) / total) * 100)
// }

    // function handleListaAtiva(el, lista){
    //     setListaAtiva(lista)

    //     const divs = document.querySelectorAll('.graphWrap')
    //     const textos = document.querySelectorAll('.filtroLocalTexto')

    //     divs.forEach(e => {
    //         e.style.borderBottom='2px solid transparent'
    //     });
    //     textos.forEach(e => {
    //         e.style.color='#555'
    //     })

    //     el.style.borderBottom='2px solid var(--corEscolhida)'
    //     el.firstChild.nextSibling.style.color='rgb(221,221,221)'
    // }

    // function filtro(el, itens){
    //     setListaAtiva(itens)
    //     const textos = document.querySelectorAll('.filtroLocalTexto')
    //     const quantidade = document.querySelectorAll('.filtroLocalQuantia')
        
    //     textos.forEach(e =>{
    //         e.style.color='#555'
    //     })
    //     quantidade.forEach(e =>{
    //         e.style.color='#555'
    //     })

    //     el.firstChild.nextSibling.style.color='rgb(221, 221, 221)'
    //     el.firstChild.firstChild.style.color='rgb(221, 221, 221)'

    // }




  return (
    <>
        <div>

            {!context.itensFiltrados && listaAtiva.map((item, i)=>{
                return <div key={item.id+'ext'+i} className='ldeContent' >

                    <div className='numAvariaTextos'>
                        <p>Nº: {item.num}</p>
                        {item.avaria && <p >Avarias: {item.avaria} </p> }
                    </div>

                        <div className='ldeWrapperDados'>
                            
                            <div>
                                <p className='cardTextoPqn'>tipo: {item.tipo? `${item.tipo} - ${tipoClasse(item.tipo)}` : ''}</p>
                                <p className='cardTextoPqn'>local: {item.local? item.local : ''}</p>
                            </div>


                            <div>
                                <p className='cardTextoPqn'>recarga {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' ' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && 'N/A'}</p>
                                {item.ultRet && <p className='cardTextoPqn'>reteste {item.ultRet?item.ultRet:'não informado'}</p>}

                            </div>

                        </div>
                    
                        <div className='botoesPadrao'>
                            <div className='btnAcoesWrapper btnVerde' onClick={()=>navigate(`extedit?id=${item.id}`)}>
                                <p>editar</p>
                            </div>
                            <div className='btnAcoesWrapper btnVermelho' onClick={()=>excluirExtintor(context.userLogado.id, item, 'ext')}>
                                <p>excluir</p>
                            </div>

                        </div>

                
                    </div>
                
                })}

            {context.itensFiltrados && context.itensFiltrados.map((item, i)=>{
                return <div key={item.id+'ext'+i} className='ldeContent' >

                                <div>
                                    <p>Nº: {item.num}</p>
                                    {item.avaria && <p >Avarias: {item.avaria} </p>}
                                </div>

                                <div className='ldeWrapperDados'>
                                
                                    <div>
                                        <p className='cardTextoPqn'>tipo: {item.tipo? `${item.tipo} - ${tipoClasse(item.tipo)}` : ''}</p>
                                        <p className='cardTextoPqn'>local: {item.local? item.local : ''}</p>
                                    </div>

                                    <div>
                                        <p className='cardTextoPqn'>recarga {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' ' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>}</p>
                                        {item.ultRet && <p className='cardTextoPqn'>reteste {item.ultRet?item.ultRet:'não informado'}</p>}
                                    </div>

                                </div>
            
                                <div className='botoesPadrao'>

                                    <div className='btnAcoesWrapper btnVerde' onClick={()=>navigate(`extedit?id=${item.id}`)}>
                                        <p>editar</p>
                                    </div>
                                    <div className='btnAcoesWrapper btnVermelho' onClick={()=>excluirExtintor(context.userLogado.id, item, 'ext')}>
                                        <p>excluir</p>
                                    </div>
                                </div>
                        
                            </div>
                        
                })
            }

        </div>

        <Footer numeroItens={user.ext.length} itens={{extintores:user.ext}} novoItem={'extnovo'}></Footer>

        </>
    )
}

export default Extintores
