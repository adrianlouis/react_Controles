import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import css from "./css/hd.css";
import styles from './Hidrantes.module.css'
import { GlobalContext } from "./GlobalContext";
import MenuFooter from "./MenuFooter";
import {Filtro} from "./funcoes/filtroFuncoes"
import { refreshBd, removerRegistro, updateBd } from "./crudFireBase";
import Footer from "./Footer";
import BtnAcoesItens from "./components/BtnAcoesItens";

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
    if (valor.mes && valor.ano){
      return new Date(valor.ano, Number(valor.mes)-1).toLocaleDateString('pt-br', {month:'long', year:'numeric'}).charAt(0).toUpperCase()+(new Date(valor.ano, Number(valor.mes)-1).toLocaleDateString('pt-br', {month:'long', year:'numeric'})).slice(1)
    }else if(!valor.mes && valor.ano){
      return valor.ano
    }else if(!valor.ano && valor.mes){
      return new Date(2020, Number(valor.mes)-1).toLocaleDateString('pt-br', {month:'long'}).charAt(0).toUpperCase()+(new Date(2020, Number(valor.mes)-1).toLocaleDateString('pt-br', {month:'long'})).slice(1)
    }else{
      return 'Data não informada'
    }
  }
        
  async function excluirHd(idUser, item, campo){

    await removerRegistro(idUser, item, campo)

    // refresh 
    const update = await refreshBd(context.userLogado.nome)
    await context.setUserLogado(...update)

  }

  return (
    <>

      <div className={styles.hidrantes}>
        {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
              <p>Não foi encontrado Hidrante com o número digitado.</p>
        </div>}
        
        {!context.itensFiltrados && context.userLogado.hd && (context.userLogado.hd.reverse()).map((item)=>{
          return <div key={item.id} className={styles.container}>

            <div className={styles.hdNumAvaria} >
              <span><i className="fa-solid fa-hashtag"></i> {item.num}</span>
              {item.avaria && <span><i className="fa-solid fa-triangle-exclamation"></i> {item.avaria}</span>}
            </div>

            <div >
              <span><i className="fa-solid fa-location-dot"></i> Local: {item.local ? item.local : 'Não informado'}</span>
            </div>

            <div>
              <span><i className="fa-solid fa-store"></i> Abrigo: {item.abrigo ? item.abrigo : 'Não informado'}</span>
            </div>

            <div>
              <span><i className="fa-solid fa-sign-hanging"></i> Sinalização: {item.placa ? item.placa : 'Não informado'}</span>
            </div>

            <div>
              <span><i className="fa-solid fa-paint-roller"></i> Marcação no chão: {item.sinal ? item.sinal : 'Não informado'}</span>
            </div>
              
            <div className={styles.pecasDiv}>
              {item.pecas.length === 0 && <span><i className="fa-solid fa-wrench"></i> Peças: Nenhuma peça</span>}
              {item.pecas.length > 0 && <span><i className="fa-solid fa-wrench"></i> Peças: {item.pecas.map((m, ind, l)=> {return  m + ((ind != (l.length-1 ))? ', ': '.') })} </span>}
            </div>

            <div >
              <span><i className="fa-regular fa-calendar"></i> Reteste: {item.val ? convertData(item.val) : 'N/A'}</span>
            </div>

            <BtnAcoesItens funcDel={()=>excluirHd(context.userLogado.id, item, 'hd')} itemId={item.id} editarOnClick={()=>navigate(`edit?id=${item.id}`)} />

          </div>
            
        })}

        {context.itensFiltrados.length > 0 && (context.itensFiltrados.reverse()).map((item)=>{
        return <div key={item.id} className={styles.container}>

        <div className={styles.hdNumAvaria} >
          <span><i className="fa-solid fa-hashtag"></i> {item.num}</span>
          {item.avaria && <span><i className="fa-solid fa-triangle-exclamation"></i> {item.avaria}</span>}
        </div>

        <div >
          <span><i className="fa-solid fa-location-dot"></i> Local: {item.local ? item.local : 'Não informado'}</span>
        </div>

        <div>
          <span><i className="fa-solid fa-store"></i> Abrigo: {item.abrigo ? item.abrigo : 'Não informado'}</span>
        </div>

        <div>
          <span><i className="fa-solid fa-sign-hanging"></i> Sinalização: {item.placa ? item.placa : 'Não informado'}</span>
        </div>

        <div>
          <span><i className="fa-solid fa-paint-roller"></i> Marcação no chão: {item.sinal ? item.sinal : 'Não informado'}</span>
        </div>
          
        <div className={styles.pecasDiv}>
          {item.pecas.length === 0 && <span><i className="fa-solid fa-wrench"></i> Peças: Nenhuma peça</span>}
          {item.pecas.length > 0 && <span><i className="fa-solid fa-wrench"></i> Peças: {item.pecas.map((m, ind, l)=> {return  m + ((ind != (l.length-1 ))? ', ': '.') })} </span>}
        </div>

        <div >
          <span><i className="fa-regular fa-calendar"></i> Reteste: {item.val ? convertData(item.val) : 'N/A'}</span>
        </div>

        <BtnAcoesItens funcDel={()=>excluirHd(context.userLogado.id, item, 'hd')} itemId={item.id} editarOnClick={()=>navigate(`edit?id=${item.id}`)} />

        {/* <fieldset className='fieldsetAcoes fieldsetFlexRow'  >
                <div className='btnAcoesWrapper' onClick={()=>navigate(`edit?id=${item.id}`)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <p>editar</p>
                </div>
                <div className='btnAcoesWrapper' onClick={()=>excluirHd(context.userLogado.id, item, 'hd')}>
                  <i className="fa-solid fa-trash-can" ></i>
                  <p>excluir</p>
                </div>

            </fieldset> */}

        </div>
        }) }

      </div>

      <Footer numeroItens={context.userLogado.hd.length} itens={{hidrantes:context.userLogado.hd}} novoItem={'hdnovo'}></Footer>

    </>
  );
};

export default Hidrantes;