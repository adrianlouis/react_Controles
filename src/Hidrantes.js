import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./css/hd.css";
import { GlobalContext } from "./GlobalContext";
import MenuFooter from "./MenuFooter";
import {filtroNum, filtroAvaria, validade} from "./funcoes/filtroFuncoes"

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd){
    context.setUserLogado({...context.userLogado, hd:[]})
  }
  const navigate = useNavigate()
  const [ordenar, setOrdenar] = React.useState('')
  const [resFiltragem, setResFiltragem] = React.useState('')
  const userHds = context.userLogado.hd
  const [valor, setValor] = React.useState('')
  const [ind, setInd] = React.useState('')

  const [selectLocal, setSelectLocal] = React.useState('')

  
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  

  // function filtroNum(el){
  //   setValor(el)
  // }

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


  return (
    <>
    <div className="hdContainer">

      <div className="listaDeHds">

      {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>Não foi encontrado Hidrante com o número digitado.</p>
        </div>}
        
        {!context.itensFiltrados && context.userLogado.hd && context.userLogado.hd.map((item)=>{
            return <div key={item.id} id={item.id} className="hdCard shadow">
            <div id="hdNum" className="hdInfo shadow">
              <i className="fa-solid fa-hashtag"></i>
              <p>{item.num}</p>
            </div>
  
            <div id="hdLocal" className="hdInfo shadow">
              <i className="fa-solid fa-location-dot"></i>
              <p>{item.local}</p>
            </div>
  
            <div id="hdAbrigo" className="hdInfo shadow">
              <i className="fa-solid fa-house-flood-water"></i>
              <p>{item.abrigo}</p>
            </div>
  
            <div id="hdSinal" className="hdInfo shadow">
              <i className="fa-solid fa-signs-post"></i>
              <p>{item.sinal}</p>
            </div>
  
            <div id="hdPecas" className="hdInfo shadow">
              <i className="fa-solid fa-wrench"></i>
              {item.pecas.map((peca)=>{
                return <p key={peca.id}>{peca}</p>
              })}
            </div>
  
            <div id="hdValidade" className="hdInfo shadow">
              <i className="fa-solid fa-calendar-check"></i>
              <p>{`${new Date(item.val).getUTCMonth()+1} - ${new Date(item.val).getUTCFullYear()}`}</p>
            </div>
  
            {item.avaria && <div id="hdAvarias" className="hdInfo">
              <p>Avarias</p>
              <textarea disabled id="hdAvariasTxtArea" value={item.avaria} readOnly={true}></textarea>
            </div>}

            <div id="hdActions">
                <i className="fa-solid fa-pen-to-square" onClick={()=>{navigate(`id?id=${item.id}`)}}></i>
                <i className="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirHd(currentTarget, item)}></i>
            </div>


          </div>
        })}

        {context.itensFiltrados && context.itensFiltrados.map((item)=>{
            return <div key={item.id} id={item.id} className="hdCard shadow">
            <div id="hdNum" className="hdInfo shadow">
              <i className="fa-solid fa-hashtag"></i>
              <p>{item.num}</p>
            </div>
  
            <div id="hdLocal" className="hdInfo shadow">
              <i className="fa-solid fa-location-dot"></i>
              <p>{item.local}</p>
            </div>
  
            <div id="hdAbrigo" className="hdInfo shadow">
              <i className="fa-solid fa-house-flood-water"></i>
              <p>{item.abrigo}</p>
            </div>
  
            <div id="hdSinal" className="hdInfo shadow">
              <i className="fa-solid fa-signs-post"></i>
              <p>{item.sinal}</p>
            </div>
  
            <div id="hdPecas" className="hdInfo shadow">
              <i className="fa-solid fa-wrench"></i>
              {item.pecas.map((peca)=>{
                return <p key={peca.id}>{peca}</p>
              })}
            </div>
  
            <div id="hdValidade" className="hdInfo shadow">
              <i className="fa-solid fa-calendar-check"></i>
              <p>{`${new Date(item.val).getUTCMonth()+1} - ${new Date(item.val).getUTCFullYear()}`}</p>
            </div>
  
            {item.avaria && <div id="hdAvarias" className="hdInfo">
              <p>Avarias</p>
              <textarea disabled id="hdAvariasTxtArea" value={item.avaria} readOnly={true}></textarea>
            </div>}

            <div id="hdActions">
                <i className="fa-solid fa-pen-to-square" onClick={()=>{navigate(`id?id=${item.id}`)}}></i>
                <i className="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirHd(currentTarget, item)}></i>
            </div>


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
                {i:<i className="fa-solid fa-signs-post"></i>},
                {i:<i className="fa-solid fa-house-flood-water"></i>},
                {i:<i className="fa-solid fa-wrench"></i>},
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

        {/* <IconesBottom itens={context.userLogado.hd} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/hdnovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-location-dot", "fa-solid fa-shower", "fa-solid fa-circle-info", "fa-solid fa-wrench"]} indexNum={0} indexModalLocal={1} indexAvarias={3} indexHdPecas={4} indexBuscar={1}   selectLocalOptions={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B']} autonomiaOptions={['1h', '2h', '3h', '4h', '5h', '6h']} /> */}
      </div>

      {/* <IconesBottom novoItem='/hdnovo' selectLocalOptions={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Térreo', 'Brigada', 'Escada A', 'Escada B', 'Escada C', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C', 'CMI']} itens={context.userLogado.hd} iconesDeFiltragem={["fa-solid fa-angles-left"]} autonomiaOptions={['1h']} /> */}



      {/* <div className='ldeSubFooter'>
        <Link className='ldeSubFooterBtn' to='/hdnovo' >novo HD</Link>
    </div> */}

    </div>
    </>
  );
};

export default Hidrantes;
