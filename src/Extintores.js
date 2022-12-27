import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import InnerHeader from './InnerHeader'
import css from './css/ext.css'
import InnerFooter from './InnerFooter'
import { Link, useNavigate } from 'react-router-dom'
import SelectOptgroup from './SelectOptgroup'
import Select from './Select'
import Input from './Input'
import Header from './Header'
import IconesBottom from './IconesBottom' 

const Extintores = () => {

    const context = useContext(GlobalContext)
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
    }

    const [toggle, setToggle] = React.useState(false)
    const [toggleBuscarCont, setToggleBuscarCont] = React.useState(false)
    const [toggleFiltrarCont, setToggleFiltrarCont] = React.useState(false)
    const [selectFiltro, setSelectFiltro] = React.useState('')
    const [toggleModal, setToggleModal] = React.useState(false)
    const [filtroEscolhido, setFiltroEscolhido] = React.useState('')
    const [filtroArray, setFiltroArray] = React.useState('')
    const navigate = useNavigate()
    const [filtroAtivo, setFiltroAtivo] = React.useState('')
    const [filtroLocal, setFiltroLocal] = React.useState(false)
    const [filterPlace, setFilterPlace] = React.useState('')
    const extintores = context.userLogado.ext

    const [valor, setValor] = React.useState('')

    const [resultadoFiltros, setResultadoFiltros] = React.useState('')

    function toggleDetail(el){
       const avaria = el.nextSibling.classList
       el.classList.toggle('shadowInset')
       avaria.toggle('avariaInvisible')
       setToggle(!toggle)
        
    }

    function toggleBuscar(){
        if (!toggleBuscarCont){
            setToggleBuscarCont(!toggleBuscarCont)
            document.querySelector('#containerBuscar').classList.add('toggleFooter')
        }else{
            document.querySelector('#containerBuscar').classList.remove('toggleFooter')
            setToggleBuscarCont(!toggleBuscarCont)
        }
    }
    
    function toggleFiltrar(){
        if (!toggleFiltrarCont){
            setToggleFiltrarCont(!toggleFiltrarCont)
            document.querySelector('#containerFiltrar').classList.add('toggleFooter')
        }else{
            document.querySelector('#containerFiltrar').classList.remove('toggleFooter')
            setToggleFiltrarCont(!toggleFiltrarCont)
        }
    }


    function excluirExtintor(elem, id){
        
        const filtrado = context.userLogado.ext.filter((filtro)=>{
            return filtro.id !== id
        })

        context.setUserLogado({...context.userLogado, ext:[...filtrado]})
    }


React.useEffect(()=>{
    if (context.userLogado.ext){

        const decrescente = []
        Object.keys(context.userLogado.ext).map((item)=>{
            return context.userLogado.ext[item].id}).sort((a,b)=>{
                return b - a
            }).forEach((cada)=>{
                context.userLogado.ext.map((item)=>{
                    if (item.id === cada){
                        decrescente.push(item)
                    }
                })
            })

       context.setUserLogado({...context.userLogado, ext:[...decrescente]})

    }
},[])

function aplicarFltro(filtro){
    const extintores = context.userLogado.ext
    
    switch (selectFiltro) {
        case 'local':
            setFiltroArray(prev => ('local'))
            break;
        case 'Número':
            setFiltroArray(prev => ('num'))
    
        default:
            setFiltroArray('')
            break;
    }



    const res = extintores.filter((filtro)=>{
        return filtro.local === filtroEscolhido
    })

    setResultadoFiltros(res)
    setToggleModal(!toggleModal)
}

function handleFilter(filtro){
    if (filtroAtivo === filtro){
        setFiltroAtivo('')
        setResultadoFiltros('')
    }else{
        setFiltroAtivo(filtro)
    }

}

React.useEffect(()=>{
    if (filtroAtivo === 4){
        // console.log(extintores)
        const filtroHidrostatico = []

        Object.keys(extintores).map((item)=>{
            return Number(extintores[item].ultRet)}).sort((a, b)=>{
                return a-b
            }).forEach((cada)=>{
                extintores.map((item)=>{
                    if (item.ultRet === String(cada)){
                        filtroHidrostatico.push(item)
                    }
                })
            })
            // console.log(filtroHidrostatico)
            setResultadoFiltros(filtroHidrostatico)
    }else if(filtroAtivo === 5){
        const filtroAvaria = []
        extintores.map((item)=>{
           if (item.avaria){
            filtroAvaria.push(item)
           }
        })
        // console.log(filtroAvaria)
        setResultadoFiltros(filtroAvaria)
    }else if(filtroAtivo === 2){
        toggleFiltrarLocal()
    }
    
    else{
        return
    }



},[filtroAtivo])

    function toggleFiltrarLocal(){
        setFiltroLocal(!filtroLocal)
        if(filtroLocal){
            document.querySelector('#containerFiltrarLocal').classList.add('toggleFooter')
        }else{
            document.querySelector('#containerFiltrarLocal').classList.remove('toggleFooter')
            setFiltroAtivo('')
            setResultadoFiltros('')
        }
    }

    React.useEffect(()=>{
        if (filterPlace !== ''){

            const filtroLocal = []
            extintores.map((item)=>{
                if(item.local === filterPlace){
                    filtroLocal.push(item)
                }
            })
            setResultadoFiltros(filtroLocal)
        }
        
    },[filterPlace])

    // function limparFiltros(){
    //     setResultadoFiltros('')
    //     setFiltroAtivo('')
    //     setFilterPlace('')
    // }

    function filtroNum(valor){
        console.log(valor)
    }

  return (
    <div>
        
        {/* <div className='innerHeader'>
            <Link className='ldeSubFooterBtn' to='/home'>Home</Link>
            <span className='ldeSubFooterBtn' onClick={()=>setToggleModal(!toggleModal)}>Filtro</span>
            <Link className='ldeSubFooterBtn' to='/'>Logout</Link>
        </div> */}


        {/* {toggleModal && <div className='modalFiltro'>
            <span className='ldeSubFooterBtn' onClick={()=>setToggleModal(!toggleModal)}>fechar</span>

            <Select selectValorInicial={selectFiltro} selectOnChange={({target})=>setSelectFiltro(target.value)} optionDisabledValue='- - - - -' options={['Local', 'Reteste', 'Recarga', 'Tipo', 'Número']} />

            {(selectFiltro === 'Número' || selectFiltro === 'Reteste')  && <Input inpTipo='number' onChange={({target})=>setFiltroEscolhido(target.value)} value={filtroEscolhido} />}

            {selectFiltro === 'Local' && <Select value='' selectValorInicial={filtroEscolhido} selectOnChange={({target})=>setFiltroEscolhido(target.value)} optionDisabledValue='- - - - -' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav escada', '3º Pav A', '3º Pav B', '3º Pav escada', '4º Pav A', '4º Pav B', '4º Pav escada', 'CMI' ]} /> }
            {selectFiltro === 'Tipo' && <Select value='' selectOnChange={({target})=>setFiltroEscolhido(target.value)} optionDisabledValue='- - - - -' options={['A', 'B', 'C' ]} /> }

            <span className='ldeSubFooterBtn' onClick={()=>aplicarFltro(filtroEscolhido)}>Aplicar filtro</span>
        </div>} */}





        {!context.itensFiltrados && extintores.map((item)=>{
        // {!resultadoFiltros && extintores.map((item)=>{
            return <div className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>Extintor tipo {item.tipo}</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>Local:</span>
                <p>{item.local}</p>
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>Ult. Rec</span>
                <p>{item.ultRec.mes} - {item.ultRec.ano}</p>

            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>Ult. Ret</span>
                <p>{item.ultRet}</p>
 
            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail shadow' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }

            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>Avarias</span>
                <p className='extSpanAvarias'>{item.avaria}</p>
            </div>
            

            <div id='hdActions'>
                {/* <Link to={`extedit?id=${item.id}`} className='ldeSubFooterBtn' >Editar</Link> */}
                <i class="fa-solid fa-pen-to-square" onClick={()=>navigate(`extedit?id=${item.id}`)}></i>
                {/* <Link to='/' className='ldeSubFooterBtn' >Excluir</Link> */}
                {/* <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}>Excluir</span> */}
                <i class="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}></i>

            </div>



        </div>


        })}

        {context.itensFiltrados && context.itensFiltrados.map((item)=>{
            return <div className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>Extintor tipo {item.tipo}</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>Local:</span>
                <p>{item.local}</p>
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>Ult. Rec</span>
                <p>{item.ultRec.mes} - {item.ultRec.ano}</p>

            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>Ult. Ret</span>
                <p>{item.ultRet}</p>
 
            </div>

            {item.avaria && <div id='extMais' className='hdInfo extDetail' onClick={({currentTarget})=>toggleDetail(currentTarget)}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }


            <div id='extAvaria' className='hdInfo avariaInvisible' >
                <span>Avarias</span>
                <p className='extSpanAvarias'>{item.avaria}</p>
            </div>
            

            <div id='hdActions'>
                <Link to={`extedit?id=${item.id}`} className='ldeSubFooterBtn' >Editar</Link>
                {/* <Link to='/' className='ldeSubFooterBtn' >Excluir</Link> */}
                <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}>Excluir</span>

            </div>



        </div>


        })}

        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>Não foi encontrado extintor com o filtro aplicado.</p>
        </div>}


        {/* <div className='ldeSubFooter'>

            <Link to='/home'><i className="fa-solid fa-house" onClick={limparFiltros}></i></Link>
            <Link to='/extnovo'><i className="fa-solid fa-file-circle-plus"></i></Link>
            <i className="fa-solid fa-magnifying-glass" onClick={toggleBuscar}></i>
            <i className="fa-solid fa-sliders" onClick={toggleFiltrar}></i>

            <div id='containerBuscar' className='footerBuscarContainer' >
            <i className="fa-solid fa-angles-left" onClick={toggleBuscar}></i>
                <Input />
                <span className='ldeSubFooterBtn'>Ok</span>
            </div>

            <div id='containerFiltrar' className='footerBuscarContainer' >
            <i className="fa-solid fa-angles-left" onClick={toggleFiltrar}></i>
            <i className={filtroAtivo === 1? "fa-solid fa-arrow-down-a-z filtroAtivo" : "fa-solid fa-arrow-down-a-z"} onClick={()=>handleFilter(1)}></i>
            <i className={filtroAtivo === 2? "fa-solid fa-location-dot filtroAtivo" : "fa-solid fa-location-dot"} onClick={()=>handleFilter(2)}></i>
            <i className={filtroAtivo === 3? "fa-solid fa-calendar-days filtroAtivo" : "fa-solid fa-calendar-days"} onClick={()=>handleFilter(3)}></i>
            <i className={filtroAtivo === 4? "fa-solid fa-calendar-check filtroAtivo" : "fa-solid fa-calendar-check"} onClick={()=>handleFilter(4)}></i>
            <i className={filtroAtivo === 5? "fa-solid fa-circle-exclamation filtroAtivo" : "fa-solid fa-circle-exclamation"} onClick={()=>handleFilter(5)}></i>
            </div>

            <div id='containerFiltrarLocal' className='footerBuscarContainer' >
                <i className="fa-solid fa-angles-left" onClick={toggleFiltrarLocal}></i>
                <i className="fa-solid fa-location-dot filtroAtivo" />
                <Select selectValorInicial={filterPlace} selectOnChange={({target})=>setFilterPlace(target.value)} options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B', 'CMI']} />
            </div>

        </div> */}

        {/* //ANTIGO */}
        {/* <IconesBottom itens={context.userLogado.ext} novoItem='/extnovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-fire-extinguisher", "fa-solid fa-circle-info", "fa-solid fa-calendar-day", "fa-solid fa-calendar-check"]} /> */}

        {/* //NOVO */}
        <IconesBottom itens={context.userLogado.ext} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/extnovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-fire-extinguisher", "fa-solid fa-location-dot", "fa-solid fa-circle-info", "fa-solid fa-calendar-day", "fa-solid fa-calendar-check"]} indexModalLocal={2} indexAvarias={3} indexNum={0} indexBuscar={1}  selectLocalOptions={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C', 'CMI']} autonomiaOptions={['1h', '2h', '3h', '4h', '5h', '6h']} />


    </div>
  )
}

export default Extintores
