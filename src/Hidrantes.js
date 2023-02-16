import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./css/hd.css";
import { GlobalContext } from "./GlobalContext";
import MenuFooter from "./MenuFooter";
import {Filtro, filtroNum, filtroAvaria, validade} from "./funcoes/filtroFuncoes"

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd){
    context.setUserLogado({...context.userLogado, hd:[]})
  }
  const navigate = useNavigate()
  const [ordenar, setOrdenar] = React.useState('')
  const [resFiltragem, setResFiltragem] = React.useState('')
  const userHds = context.userLogado.hd
  const [ind, setInd] = React.useState('')
  const filtrados = new Filtro(context.userLogado.hd)

  const [selectLocal, setSelectLocal] = React.useState('')

  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  React.useEffect(()=>{
    if(ordenar){
        ordenar === 'crescente' ? crescente(userHds) : decrescente(userHds)
    }
  },[ordenar])

    function crescente(itens){
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
            setResFiltragem(crescente)
            context.setUserLogado({...context.userLogado, hd:[...crescente]})
    }

    function decrescente(itens){
        const decresc = []
        Object.keys(itens).map((item)=>{
            return Number(itens[item].num)}).sort((a,b)=>{
                return b - a
            }).forEach((cada)=>{
                itens.map((item)=>{
                    if (item.num === String(cada)){
                        decresc.push(item)
                    }
                })
            })
        setResFiltragem(decresc)
        context.setUserLogado({...context.userLogado, hd:[...decresc]})

    }

  function convertData(valor){
    return (new Date(valor).toLocaleDateString('pt-br', {month:'long', year:'numeric'})).charAt(0).toUpperCase()+(new Date(valor).toLocaleDateString('pt-br', {month:'long', year:'numeric'})).slice(1)
  }
        
  function excluirHd(item, hd){
    const res = context.userLogado.hd.filter((filtro)=>{
        return filtro !== hd
    })

    context.setUserLogado({...context.userLogado, hd:[...res]})
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

    filtroNum( context.setItensFiltrados, context.userLogado.hd, ind)
  }

  function handleAbrigo(){
    if (JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.abrigoOk()) && JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.abrigoNok()) ){
      context.setItensFiltrados(filtrados.abrigoNok())
      context.setTipoFiltro('com problema no abrigo')
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }else if (JSON.stringify(context.itensFiltrados) === JSON.stringify(filtrados.abrigoNok())){
      context.setItensFiltrados(filtrados.abrigoOk())
      context.setTipoFiltro('sem problema no abrigo')
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }else{
      context.setItensFiltrados('')
      context.setTipoFiltro('')
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }

  function handleSinal(){
    if (JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.sinalOk()) && JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.sinalNok())){
      context.setItensFiltrados(filtrados.sinalNok())
      context.setTipoFiltro('com problema na sinalização')
    }else if (JSON.stringify(context.itensFiltrados) === JSON.stringify(filtrados.sinalNok())){
      context.setItensFiltrados(filtrados.sinalOk())
      context.setTipoFiltro('sem problema na sinalização')
    }else{
      context.setItensFiltrados('')
      context.setTipoFiltro('')
    }
  }

  function handlePecas(){
    if (JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.hdPecasOk()) && JSON.stringify(context.itensFiltrados) !== JSON.stringify(filtrados.hdPecasNok())){
      context.setItensFiltrados(filtrados.hdPecasNok())
      context.setTipoFiltro('faltando peça')
    }else if (JSON.stringify(context.itensFiltrados) === JSON.stringify(filtrados.hdPecasNok())){
      context.setItensFiltrados(filtrados.hdPecasOk())
      context.setTipoFiltro('com todas as peças')
    }else{
      context.setItensFiltrados('')
      context.setTipoFiltro('')
    }
  }


  return (
    <>
    <div className="hdContainer">

      <div className="listaDeHds">

      {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>Não foi encontrado Hidrante com o número digitado.</p>
        </div>}
        
        {!context.itensFiltrados && context.userLogado.hd && context.userLogado.hd.map((item)=>{
          return <div key={item.id} className="extCard">

            <fieldset className='fieldsetFlexRow'>
              <legend>Hidrante {item.num}</legend>
              <div>
                <p className='cardTextoPqn'>local</p>
                <p>{item.local ? item.local : 'Não informado'}</p>
              </div>

              <div>
                <p className="cardTextoPqn">abrigo</p>
                <p>{item.abrigo ? item.abrigo : 'Não informado'}</p>
              </div>

              
            </fieldset>

            <fieldset className="fieldsetFlexRow">
              <legend>Sinalização</legend>

              <div>
                <p className="cardTextoPqn">placa de sinalização</p>
                <p>{item.placa ? item.placa : 'Não informado'}</p>
              </div>

              <div>
                <p className="cardTextoPqn">marcação no chão</p>
                <p>{item.sinal ? item.sinal : 'Não informado'}</p>
              </div>
              
            </fieldset>

            <fieldset className="fieldsetFlexRow">
              <legend>Peças</legend>
              <div className="pecasDiv">
                {item.pecas.length === 0 && <p>Nenhuma peça</p>}
                {item.pecas.map((peca)=>{
                  return <p key={peca.id}>{peca}</p>
                })}
              </div>
            </fieldset>

            <fieldset className="fieldsetFlexRow">
              <legend>Reteste Hidrostático</legend>
              <div>
                <p>{convertData(item.val)}</p>
              </div>
            </fieldset>

            {item.avaria && <fieldset className="fieldsetFlexRow">
              <legend>Avaria</legend>
              <div>
                <p>{item.avaria}</p>
              </div>
              
              </fieldset>}

              <fieldset className='fieldsetAcoes fieldsetFlexRow'  >
                  <div className='btnAcoesWrapper' onClick={()=>{navigate(`id?id=${item.id}`)}}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <p>editar</p>
                  </div>
                  <div className='btnAcoesWrapper' onClick={({currentTarget})=>excluirHd(currentTarget, item)}>
                    <i className="fa-solid fa-trash-can" ></i>
                    <p>excluir</p>
                  </div>

              </fieldset>

          </div>
            
        })}

        {context.itensFiltrados && context.itensFiltrados.map((item)=>{
            return <div key={item.id} className="extCard">

            <fieldset className='fieldsetFlexRow'>
              <legend>Hidrante {item.num}</legend>
              <div>
                <p className='cardTextoPqn'>local</p>
                <p>{item.local ? item.local : 'Não informado'}</p>
              </div>

              <div>
                <p className="cardTextoPqn">abrigo</p>
                <p>{item.abrigo ? item.abrigo : 'Não informado'}</p>
              </div>

              <div>
                <p className="cardTextoPqn">sinalização</p>
                <p>{item.sinal ? item.sinal : 'Não informado'}</p>
              </div>
            </fieldset>

            <fieldset className="fieldsetFlexRow">
              <legend>Peças</legend>
              <div className="pecasDiv">
                {item.pecas.length === 0 && <p>Nenhuma peça</p>}
                {item.pecas.map((peca)=>{
                return <p key={peca.id}>{peca}</p>
              })}
              </div>
            </fieldset>

            <fieldset className="fieldsetFlexRow">
              <legend>Reteste Hidrostático</legend>
              <div>
                <p>{item.val ? convertData(item.val) : 'Não informado'}</p>
              </div>
            </fieldset>

            {item.avaria && <fieldset className="fieldsetFlexRow">
              <legend>Avaria</legend>
              <div>
                <p>{item.avaria}</p>
              </div>
              </fieldset>}

              <fieldset className='fieldsetAcoes fieldsetFlexRow'>
                  <div className='btnAcoesWrapper' onClick={()=>{navigate(`id?id=${item.id}`)}}>
                    <i className="fa-solid fa-pen-to-square" ></i>
                    <p>editar</p>
                  </div>
                  <div className='btnAcoesWrapper' onClick={({currentTarget})=>excluirHd(currentTarget, item)}>
                    <i className="fa-solid fa-trash-can" ></i>
                    <p>excluir</p>
                  </div>
                </fieldset>

          </div>
        })}

        <MenuFooter 
          mainIcons={
            [
              {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
              {i: <Link to='/hdnovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
              {i: <i className="fa-solid fa-magnifying-glass"></i>,
              click:()=>{context.setModalFooter(1)}},
              {i: <i className="fa-solid fa-sliders" ></i>,
              click: ()=>context.setModalFooter(2)},
              {i: <Link to='/'><i className="fa-solid fa-door-open"></i></Link>},
            ]
          }

          mainFiltro={
            [
              {i: <i className="fa-solid fa-hashtag" onClick={()=>handleFiltroNum()} ></i>},                
                {i: <i className="fa-solid fa-location-dot" onClick={()=>context.setModalFooter(3)}></i>},
                {i:<i className="fa-solid fa-signs-post" onClick={()=>handleSinal()}></i>},
                {i:<i className="fa-solid fa-house-flood-water" onClick={()=>handleAbrigo()}></i>},
                {i:<i className="fa-solid fa-wrench" onClick={()=>handlePecas()}></i>},
                {i: <i className="fa-solid fa-circle-info"  onClick={()=>filtroAvaria(context.userLogado.hd, context)} ></i>},
                {i: <i className="fa-solid fa-calendar-check" onClick={()=>validade(context.userLogado.hd, context)}></i>},
            ]
        }

          itens = {context.userLogado.hd}

          filtroLocal={{
              opt:['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B' ],
              placeholder:'Escolha o local',
              change:({target})=>setSelectLocal(target.value),
              value:selectLocal
          }}

          buscarPlaceholder='Buscar pelo número'

        />

      </div>

    </div>
    </>
  );
};

export default Hidrantes;