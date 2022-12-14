import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./css/hd.css";
import { GlobalContext } from "./GlobalContext";
import Header from "./Header";
import IconesBottom from "./IconesBottom";
import MenuFooter from "./MenuFooter";
import Select from "./Select";

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

  
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  

  function filtroNum(el){
    setValor(el)
  }

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


  return (
    <>
    <div className="hdContainer">

        {/* <div className='menu' >

          <Link className='ldeSubFooterBtn' to='/home' >home</Link>
          <Select selectValorInicial='' optionDisabledValue='Ordenar' options={['crescente', 'decrescente']} selectOnChange={({target})=>setOrdenar(target.value)} />
          <Link className='ldeSubFooterBtn' to='/' >logout</Link>
           
        </div> */}

      <div className="listaDeHds">

      {context.itensFiltrados && context.itensFiltrados.length === 0 && <div className='ldeResumoFiltro'>
            <p>N??o foi encontrado Hidrante com o n??mero digitado.</p>
        </div>}
        
        {!context.itensFiltrados && context.userLogado.hd && context.userLogado.hd.map((item)=>{
            return <div key={item.id} id={item.id} className="hdCard shadow">
            <div id="hdNum" className="hdInfo shadow">
              <span>Hidrante</span>
              <p>{item.num}</p>
            </div>
  
            <div id="hdLocal" className="hdInfo shadow">
              <span>Local</span>
              <p>{item.local}</p>
            </div>
  
            <div id="hdAbrigo" className="hdInfo shadow">
              <span>Abrigo</span>
              <p>{item.abrigo}</p>
            </div>
  
            <div id="hdSinal" className="hdInfo shadow">
              <span>Sinaliza????o</span>
              <p>{item.sinal}</p>
            </div>
  
            <div id="hdPecas" className="hdInfo shadow">
              <span>Pe??as:</span>
              {item.pecas.map((peca)=>{
                return <p key={peca.id}>{peca}</p>
              })}
            </div>
  
            <div id="hdValidade" className="hdInfo shadow">
              <span>Validade das Mangueiras</span>
              <p>{`${new Date(item.val).getUTCMonth()+1} - ${new Date(item.val).getUTCFullYear()}`}</p>
            </div>
  
            {item.avaria && <div id="hdAvarias" className="hdInfo">
              <p>Avarias</p>
              <textarea disabled id="hdAvariasTxtArea" value={item.avaria} readOnly={true}></textarea>
            </div>}

            <div id="hdActions">
                <i class="fa-solid fa-pen-to-square" onClick={()=>{navigate(`id?id=${item.id}`)}}></i>
                <i class="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirHd(currentTarget, item)}></i>
            </div>


          </div>
        })}

        {context.itensFiltrados && context.itensFiltrados.map((item)=>{
            return <div key={item.id} id={item.id} className="hdCard">
            <div id="hdNum" className="hdInfo">
              <span>Hidrante</span>
              <p>{item.num}</p>
            </div>
  
            <div id="hdLocal" className="hdInfo">
              <span>Local</span>
              <p>{item.local}</p>
            </div>
  
            <div id="hdAbrigo" className="hdInfo">
              <span>Abrigo</span>
              <p>{item.abrigo}</p>
            </div>
  
            <div id="hdSinal" className="hdInfo">
              <span>Sinaliza????o</span>
              <p>{item.sinal}</p>
            </div>
  
            <div id="hdPecas" className="hdInfo">
              <span>Pe??as:</span>
              {item.pecas.map((peca)=>{
                return <p>{peca}</p>
              })}
            </div>
  
            <div id="hdValidade" className="hdInfo">
              <span>Validade das Mangueiras</span>
              <p>{`${new Date(item.val).getUTCMonth()+1} - ${new Date(item.val).getUTCFullYear()}`}</p>
            </div>
  
            {item.avaria && <div id="hdAvarias" className="hdInfo">
              <p>Avarias</p>
              <textarea id="hdAvariasTxtArea" value={item.avaria} readOnly={true}></textarea>
            </div>}

            <div id="hdActions">
                <i class="fa-solid fa-pen-to-square" onClick={()=>{navigate(`id?id=${item.id}`)}}></i>
                <i class="fa-solid fa-trash-can" onClick={({currentTarget})=>excluirHd(currentTarget, item)}></i>
            </div>


          </div>
        })}

        <MenuFooter 
          mainIcons={
            [
              {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
              {i: <Link to='/hdnovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
              {i: <i className="fa-solid fa-magnifying-glass"></i>},
              {i: <i className="fa-solid fa-sliders" ></i>}
            ]
          }

          itens = {context.userLogado.hd}
        />

        {/* <IconesBottom itens={context.userLogado.hd} buscarChange={({target})=>filtroNum(target.value)} buscarValor={valor} novoItem='/hdnovo' iconesDeFiltragem={["fa-solid fa-arrow-down-1-9", "fa-solid fa-location-dot", "fa-solid fa-shower", "fa-solid fa-circle-info", "fa-solid fa-wrench"]} indexNum={0} indexModalLocal={1} indexAvarias={3} indexHdPecas={4} indexBuscar={1}   selectLocalOptions={['Subsolo', 'T??rreo', '2?? Pav A', '2?? Pav B', '3?? Pav A', '3?? Pav B', '4?? Pav A', '4?? Pav B']} autonomiaOptions={['1h', '2h', '3h', '4h', '5h', '6h']} /> */}
      </div>

      {/* <IconesBottom novoItem='/hdnovo' selectLocalOptions={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'T??rreo', 'Brigada', 'Escada A', 'Escada B', 'Escada C', '2?? Pav A', '2?? Pav B', '2?? Pav Escada C', '3?? Pav A', '3?? Pav B', '3?? Pav Escada C', '4?? Pav A', '4?? Pav B', '4?? Pav Escada C', 'CMI']} itens={context.userLogado.hd} iconesDeFiltragem={["fa-solid fa-angles-left"]} autonomiaOptions={['1h']} /> */}



      {/* <div className='ldeSubFooter'>
        <Link className='ldeSubFooterBtn' to='/hdnovo' >novo HD</Link>
    </div> */}

    </div>
    </>
  );
};

export default Hidrantes;
