import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
// import css from './css/ext.css'
import styles from './Extintores.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { dataLong } from './funcoes/extDatas'
import { refreshBd, removerRegistro } from './crudFireBase'
import Footer from './Footer'
import BtnAcoesItens from './components/BtnAcoesItens'

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

    const [det, setDet] = React.useState()
    

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

        const nArray = listaAtiva.filter((f)=>{
            if (f !== item){
                return f
            }
        })
        
        setListaAtiva(nArray)

        await removerRegistro(idUser, item, campo)
        const update = await refreshBd(context.userLogado.nome)
        context.setUserLogado(...update)

        if (context.itensFiltrados){

            const itemRemovido = context.itensFiltrados.filter((f)=>{
                if (f !== item){
                    return f
                }
            }) 

            context.setItensFiltrados(itemRemovido)

        }

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

    const [modalToogle, setModalToogle] = React.useState(false)

    function handleDetail(el, item){
        setDet(item)

        setModalToogle(prev => {return !prev})
        // modalToogle? document.querySelector('.modalDetail').classList.add('modalDetailVisivel') : document.querySelector('modalDetail').classList.remove('modalDetailVisivel')
        // console.log(modalToogle)
    }

    function handleModalClose(){
        // setDet('')
        
        setModalToogle(prev => {return !prev})
        // modalToogle? document.querySelector('.modalDetail').classList.add('modalDetailVisivel') : document.querySelector('modalDetail').classList.remove('modalDetailVisivel')
        // console.log(modalToogle)

    }

    // React.useEffect(()=>{
    //     modalToogle? document.querySelector('#modalDetail').classList.add('modalDetailVisivel') : document.querySelector('#modalDetail').classList.remove('modalDetailVisivel')

    // },[modalToogle])

    function datasPorExtenso(ano, mes){

        console.log(typeof ano)

        if (ano && mes){
            return new Date(ano+'-'+mes).toLocaleString('pt-BR', {month:'long', year:'numeric'})
        }else if (!ano && mes){
            return new Date(2020-mes).toLocaleDateString('pt-BR', {month:'long'})
        }else if(!mes && ano){
            return ano
        }else{
            return 'não informado'
        }

    }


  return (
    <>
        <div className={styles.container}>

            {/* <div className={styles.nExt}>
                <div className={styles.nTipoNumWrap}>

                    <span className={styles.nTipo} >AP</span>
                    <span className={styles.Nnum}>16500</span>
                </div>

                <div className={styles.nSecondary}>
                    <span>local: Subsolo</span>
                    <span>recarga: Maio de 2024</span>
                    <span>reteste: 2026</span>
                </div>

                <div className={styles.nIconsExt}>
                    <span>avariado</span>
                    <span>recarga</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
            </div> */}

            {!context.itensFiltrados && listaAtiva.map((item, i)=>{
                return <div key={item.id+'ext'+i} className='ldeContent'  >

                    <div className={styles.title}>
                        {/* <p><i className="fa-solid fa-hashtag"></i> {item.num? item.num :'N/A'}</p> */}
                        <p className={styles.legends}><i className="fa-solid fa-hashtag"></i> número</p>
                        <p className={styles.values}>{item.num?item.num:'N/A'}</p>
                        {item.avaria && <p className={styles.legends} ><i className="fa-solid fa-triangle-exclamation"></i> avaria</p> }
                        <p className={styles.txtValues} > {item.avaria}</p>

                    </div>

                    <div className={styles.minorInfos}>
                        
                        <div>
                            <p className={styles.legends}><i className="fa-solid fa-fire-extinguisher"></i> tipo</p>
                            <p className={styles.txtValues}>{item.tipo? `${item.tipo} - ${tipoClasse(item.tipo)}` : 'N/A'}</p>
                            <p className={styles.legends}><i className="fa-solid fa-location-dot"></i> local</p>
                            <p className={styles.txtValues}>{item.local? item.local : 'N/A'}</p>
                        </div>


                        <div>
                            <p className={styles.legends}><i className="fa-solid fa-calendar-day"></i> recarga </p>
                            <p className={styles.txtValues}>{datasPorExtenso(item.ultRec.ano, item.ultRec.mes)}</p>

                            <p className={styles.legends}><i className="fa-regular fa-calendar"></i> reteste </p>
                            <p className={styles.txtValues}> {item.ultRet?item.ultRet:'não informado'}</p>
                        </div>

                    </div>
                    
                    <BtnAcoesItens funcDel={()=>excluirExtintor(context.userLogado.id, item, 'ext')} itemId={item.id} editarOnClick={()=>navigate(`extedit?id=${item.id}`)}  />
                
                    </div>

            //     return <div key={item.id+'ext'+i} className={styles.nExt}>
            //     <div className={styles.nTipoNumWrap}>

            //         <span className={styles.nTipo} >{item.tipo}</span>
            //         <span className={styles.Nnum}>{item.num}</span>
            //     </div>

            //     <div className={styles.nSecondary}>
            //         <span>local: {item.local}</span>
            //         <span>recarga: {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' ' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && 'N/A'}</span>
            //         <span>reteste: {item.ultRet?item.ultRet:'N/A'}</span>
            //     </div>

            //     <div className={styles.nIconsExt}>
            //         <span>{item.avaria?'avariado':''}</span>
            //         {/* <span>recarga</span> */}
            //     </div>

            //     <div className={styles.wrapIconInfo}>
            //         <i className="fa-solid fa-chevron-right"></i>

            //     </div>
            // </div>

                
                })}

            {context.itensFiltrados && context.itensFiltrados.map((item, i)=>{
                return <div key={item.id+'ext'+i} className='ldeContent' >

                <i id='iconDetails' class="fa-regular fa-eye" onClick={({currentTarget})=>handleDetail(currentTarget, item)}></i>


                <div className='numAvariaTextos'>
                    <p>Nº: {item.num? item.num :'N/A'}</p>
                    {item.avaria && <p >{item.avaria}</p> }
                </div>

                    <div className='ldeWrapperDados'>
                        
                        <div>
                            <p className='cardTextoPqn'>tipo: {item.tipo? `${item.tipo} - ${tipoClasse(item.tipo)}` : 'N/A'}</p>
                            <p className='cardTextoPqn'><i className="fa-solid fa-location-dot"></i> {item.local? item.local : 'N/A'}</p>
                        </div>


                        <div>
                            <p className='cardTextoPqn'>recarga {item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' ' : '') : '' }{item.ultRec.ano ? Number(item.ultRec.ano) : ''}  {!item.ultRec.mes && !item.ultRec.ano && 'N/A'}</p>
                            <p className='cardTextoPqn'>reteste {item.ultRet?item.ultRet:'N/A'}</p>
                        </div>

                    </div>
                
                    <BtnAcoesItens funcDel={()=>excluirExtintor(context.userLogado.id, item, 'ext')} itemId={item.id} editarOnClick={()=>navigate(`extedit?id=${item.id}`)}  />
            
                </div>
                        
                })
            }

            {/* <div id='modalDetail' className='modalDetail'>
                <fieldset>
                    <legend>Número</legend>
                    <span>{det? det.num : ''}</span>
                </fieldset>

                <fieldset>
                    <legend>Tipo</legend>
                    <span>{det?det.tipo:''}</span>
                </fieldset>

                <fieldset>
                    <legend>Local</legend>
                    <span>{det?det.local:''}</span>
                </fieldset>

                {det && (det.ultRec.mes || det.ultRec.ano) && <fieldset>
                    <legend>Próxima recarga anual</legend>
                    <span>{det? `${det.ultRec.mes} ${det.ultRec.mes && det.ultRec.ano ? ' de ': ''} ${det.ultRec.ano}`:'' }</span>
                </fieldset>}

                {det && det.ultRet && <fieldset>
                    <legend>Próximo reteste hidrostático</legend>
                    <span>{det?det.ultRet:''}</span>
                </fieldset>}

                {det && det.avaria && <fieldset>
                    <legend>Avaria</legend>    
                    <span>{det.avaria}</span>
                </fieldset>}

                <p onClick={()=>handleModalClose()}><i className="fa-regular fa-eye-slash"></i> Fechar</p>
            </div> */}

        </div>

        <Footer numeroItens={context.userLogado.ext.length} itens={{extintores:context.userLogado.ext}} novoItem={'extnovo'} />

        </>
    )
}

export default Extintores
