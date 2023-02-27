import React from 'react'
import css from './css/lde.css'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import MenuFooter from './MenuFooter'
import {Filtro, filtroNum, filtroAvaria, filtroLdeBateria} from './funcoes/filtroFuncoes'

const LdE = () => {
    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const [selectLocal, setSelectLocal] = React.useState('')
    const [selectLdeBateria, setSelectLdeBateria] = React.useState('')
    const [ind, setInd] = React.useState(0)
    
    
    const lde = new Filtro(context.userLogado.lde)


    function expandir(elem, avaria){
        // const avarias = elem.parentNode.classList
        // avarias.toggle('ldeContainerAvaria')
        // console.log(elem.parentNode)
        if (avaria !== ''){
            if (elem.parentNode.style.height === '260px'){
                elem.parentNode.style.height = '80px'
            }else{
                elem.parentNode.style.height = '260px'
            }
            
        }else{
           if ( elem.parentNode.style.height === '170px'){
            elem.parentNode.style.height = '80px'
           }else{
            elem.parentNode.style.height = '170px'
           }

        }
    }

    function excluirLde(idLde){
        const item = context.userLogado.lde.filter((filtro)=>{
            return filtro.id !== idLde.id
        })
       context.setUserLogado(prev => ({...prev, lde:[ ...item ]}))
       navigate('/lde')
    }

    function handleFiltroNum(){
        if (ind === 0){
            setInd(1)
            context.setTipoFiltro('em ordem crescente')
        }else if (ind === 1){
            setInd( 2)
            context.setTipoFiltro('em ordem decrescente')
        }else{
            setInd(0)
            context.setTipoFiltro('')
        }

        filtroNum( context.setItensFiltrados, context.userLogado.lde, ind)
    }

    function iconeBateria(bateria){
        if (bateria === '1h' || bateria === ''){
            return <i className="fa-solid fa-battery-empty"></i>
        }else if (bateria === '2h'){
            return <i className="fa-solid fa-battery-quarter"></i>
        }else if (bateria === '3h'){
            return <i className="fa-solid fa-battery-half"></i>
        }else if (bateria === '4h'){
            return <i className="fa-solid fa-battery-three-quarters"></i>
        }else if (bateria === '5h'){
            return <i className="fa-solid fa-battery-full"></i>
        }else if (bateria === '6h'){
            return <i className="fa-solid fa-battery-full"></i>
        }
    }

    // SETAR LDE FILTRADOS POR BATERIA
    React.useEffect(()=>{
        if (selectLdeBateria){
            filtroLdeBateria(selectLdeBateria, context.userLogado.lde, context)
        }
    },[selectLdeBateria])

    // LIMPAR ESCOLHA DO SELECT DO FILTRO POR BATERIA
    React.useEffect(()=>{
        setSelectLdeBateria('')
        setSelectLocal('')
    },[context.modalFooter])

    
  return (
    <>

        {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
        // {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
            return <div key={item.id+index} className='extCard'>

                <fieldset className='fieldsetFlexRow'>

                    <legend>Luz de Emergência</legend>
                    <div className='ldeWrapperDados'>

                        <div>
                            <p className='cardTextoPqn'>número</p>
                            <p>{item.num ? item.num : 'N/A'}</p>
                        </div>

                        <div>
                            <p className='cardTextoPqn'>local</p>
                            <p>{item.local ? item.local : 'N/A'}</p>
                        </div>

                        <div>
                            <p className='cardTextoPqn'>autonomia</p>
                            <p>{item.dur ? item.dur : 'N/A'}</p>
                        </div>

                    </div>
                </fieldset>

                {item.avaria && <fieldset className='fieldsetFlexRow'>

                    <legend>Avarias</legend>

                    <div>
                        <p>{item.avaria}</p>
                    </div>

                </fieldset>}

                <fieldset className='fieldsetAcoes fieldsetFlexRow'>
                    <div className='btnAcoesWrapper' onClick={()=>navigate(`edit/id?id=${item.id}&ind=${index}`)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <p>editar</p>
                    </div>
                    <div className='btnAcoesWrapper' onClick={()=>excluirLde(item)}>
                        <i className="fa-solid fa-trash-can"></i>
                        <p>excluir</p>
                    </div>

                </fieldset>

            </div>
            
            
            // <div key={item.id} className='ldeContainer'>
            // <div className='contSuperior'  onClick={({currentTarget})=>expandir(currentTarget, item.avaria)}>
            //     <div className='ldeUnidade' >
            //         <i className="fa-solid fa-hashtag"></i>
            //         <p>{item.num}</p>
            //     </div>
            //     <div className='ldeUnidade'>
            //         <i className="fa-solid fa-location-dot"/>   
            //         <p>{item.local}</p>
            //     </div>
            //     <div className='ldeUnidade'>
            //         {iconeBateria(item.dur)}
            //         <p>{item.dur} </p>
            //     </div>

            //     {item.avaria && <i id='iconeAvaria' className="fa-solid fa-circle-exclamation"></i>}
            //     </div>

            //     { item.avaria && <>
            //         <div className='contInferior'>
            //             <textarea disabled value={item.avaria} ></textarea>
            //         </div>
            //     </>}

            //     <div className='cardAcoes'>
            //         <Link to={`edit/id?id=${item.id}&ind=${index}`}><i className="fa-solid fa-pen-to-square shadow"></i></Link>
            //         <i className="fa-solid fa-trash-can shadow" onClick={()=>excluirLde(item)}></i>
                    
            //     </div>
            // </div>
        })}

        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
                <p>Não foram encontradas Luzes de Emergência com o número digitado.</p>
            </div>
        }

        {context.itensFiltrados && context.itensFiltrados.map((item, index)=>{
            return <div key={item.id+index} className='extCard'>

            <fieldset className='fieldsetFlexRow'>

                <legend>Luz de Emergência</legend>

                <div>
                    <p className='cardTextoPqn'>número</p>
                    <p>{item.num}</p>
                </div>

                <div>
                    <p className='cardTextoPqn'>local</p>
                    <p>{item.local}</p>
                </div>

                <div>
                    <p className='cardTextoPqn'>autonomia</p>
                    <p>{item.dur}</p>
                </div>

            </fieldset>

            <fieldset className='fieldsetAcoes fieldsetFlexRow'>
                <div className='btnAcoesWrapper'>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>navigate(`edit/id?id=${item.id}&ind=${index}`)}></i>
                    {/* <Link to={`edit/id?id=${item.id}&ind=${index}`}><i className="fa-solid fa-pen-to-square shadow"></i></Link> */}
                    <p>editar</p>
                </div>
                <div className='btnAcoesWrapper'>
                    <i className="fa-solid fa-trash-can" onClick={()=>excluirLde(item)}></i>
                    <p>excluir</p>
                </div>

            </fieldset>

        </div>
            
            
            
            
            // <div key={item.id} className='ldeContainer'>
            // <div className='contSuperior'  onClick={({currentTarget})=>expandir(currentTarget)}>
            //     <div className='ldeUnidade' >
            //         <i className="fa-solid fa-hashtag"></i>
            //         <p>{item.num}</p>
            //     </div>
            //     <div className='ldeUnidade'>
            //         <i className="fa-solid fa-location-dot"/> 
            //         <p>{item.local}</p>
            //     </div>
            //     <div className='ldeUnidade'>
            //         {iconeBateria(item.dur)}
            //         <p>{item.dur}</p>
            //     </div>
            //     {item.avaria && <i id='iconeAvaria' className="fa-solid fa-circle-exclamation"></i>}
            //     </div>
            //     { item.avaria && <>
                    
            //         <div className='contInferior'>
            //             <textarea disabled value={item.avaria} ></textarea>
            //         </div>
            //     </>}

            //     <div className='cardAcoes'>
            //         <Link className='ldeSubFooterBtn' to={`edit/id?id=${item.id}&ind=${index}`}>Editar</Link>
            //         <span className='ldeSubFooterBtn' onClick={()=>excluirLde(item)}>Excluir</span>
                    
            //     </div>
            // </div>
        })}

        <MenuFooter 
        
            mainIcons={
            [
              {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
              {i: <Link to='/ldenovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
              {i: <i className="fa-solid fa-magnifying-glass"></i>,
            click: ()=>{context.setModalFooter(1)}},
              {i: <i className="fa-solid fa-sliders" ></i>,
              click: ()=>context.setModalFooter(2)},
              {i: <Link to='/'><i className="fa-solid fa-door-open"></i></Link>},
            ]
            }

          mainFiltro={
            [
                {i: <i className="fa-solid fa-hashtag" onClick={()=>handleFiltroNum()} ></i>},
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)} ></i>},
                {i: <i className="fa-solid fa-battery-three-quarters" onClick={()=>context.setModalFooter(5)} ></i>},
                {i: <i className="fa-solid fa-circle-info"  onClick={()=>filtroAvaria(context.userLogado.lde, context)} ></i>},
            ]
            }

          itens = {context.userLogado.lde}

          buscarPlaceholder='Buscar pelo Número'

            //FILTRO BATERIA
            ldeSelect = {{
                opt:['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas'],
                placeholder:'Escolha a duração',
                change:({target})=>setSelectLdeBateria(target.value),
                value:selectLdeBateria}
            }

            //FILTRO DE LOCAL
            filtroLocal = {{
                opt:['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C'],
                placeholder:'Escolha o local',
                change:({target})=>setSelectLocal(target.value),
                value:selectLocal
            }}
        />
    </> 
  )
}

export default LdE
