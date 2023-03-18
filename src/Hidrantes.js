import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import css from "./css/hd.css";
import { GlobalContext } from "./GlobalContext";
import MenuFooter from "./MenuFooter";
import {Filtro} from "./funcoes/filtroFuncoes"
import { refreshBd, removerRegistro, updateBd } from "./crudFireBase";

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd){
    context.setUserLogado({...context.userLogado, hd:[]})
  }
  const navigate = useNavigate()
  const [ordenar, setOrdenar] = React.useState('')
  const [resFiltragem, setResFiltragem] = React.useState('')
  const userHds = context.userLogado.hd
  const filtrados = new Filtro(context.userLogado.hd)

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
        
  async function excluirHd(idUser, item, campo){

    await removerRegistro(idUser, item, campo)

    // refresh 
    const update = await refreshBd(context.userLogado.nome)
    await context.setUserLogado(...update)

  }

  return (
    <>

      <NavLink id='linkLdeNovo' to='hdnovo' className='novoRegistro' >Registrar hidrante</NavLink>

        <div className="listaDeHds">

        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
              <p>Não foi encontrado Hidrante com o número digitado.</p>
          </div>}
          
          {!context.itensFiltrados && context.userLogado.hd && context.userLogado.hd.map((item)=>{
            return <div key={item.id} className="ldeContent">

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
                  {item.pecas.map((peca, ind)=>{
                    return <p key={item.id+peca+ind}>{peca}</p>
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
                    <div className='btnAcoesWrapper' onClick={()=>navigate(`edit?id=${item.id}`)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      <p>editar</p>
                    </div>
                    <div className='btnAcoesWrapper' onClick={()=>excluirHd(context.userLogado.id, item, 'hd')}>
                      <i className="fa-solid fa-trash-can" ></i>
                      <p>excluir</p>
                    </div>

                </fieldset>

            </div>
              
          })}

        </div>

    </>
  );
};

export default Hidrantes;