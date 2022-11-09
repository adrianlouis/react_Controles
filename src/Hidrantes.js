import React, { useContext } from "react";
import { Link } from "react-router-dom";
import css from "./css/hd.css";
import { GlobalContext } from "./GlobalContext";
import Select from "./Select";

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd){
    context.setUserLogado({...context.userLogado, hd:[]})
  }
  console.log(context.userLogado)
  const [ordenar, setOrdenar] = React.useState('')
  const [resFiltragem, setResFiltragem] = React.useState('')
  const userHds = context.userLogado.hd



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
    <div className="hdContainer">

        <div className='menu' >

            <Link className='ldeSubFooterBtn' to='/home' >home</Link>
            <Link className='ldeSubFooterBtn' to='/' >logout</Link>
            <Select selectValorInicial='' optionDisabledValue='Ordenar' options={['crescente', 'decrescente']} selectOnChange={({target})=>setOrdenar(target.value)} />
           
        </div>


      <div className="listaDeHds">
        
        {context.userLogado.hd && context.userLogado.hd.map((item)=>{
            return <div id={item.id} className="hdCard">
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
              <span>Sinalização</span>
              <p>{item.sinal}</p>
            </div>
  
            <div id="hdPecas" className="hdInfo">
              <span>Peças:</span>
              {item.pecas.map((peca)=>{
                return <p>{peca}</p>
              })}
            </div>
  
            <div id="hdValidade" className="hdInfo">
              <span>Validade das Mangueiras</span>
              <p>{`${new Date(item.val).getUTCMonth()+1} - ${new Date(item.val).getUTCFullYear()}`}</p>
            </div>
  
            {item.avarias && <div id="hdAvarias" className="hdInfo">
              <p>Avarias</p>
              <textarea id="hdAvariasTxtArea" value={item.avarias}></textarea>
            </div>}

            <div id="hdActions">
                <Link className="ldeSubFooterBtn" to={`id?id=${item.id}`} >Editar</Link>
                <span className="ldeSubFooterBtn" onClick={({currentTarget})=>excluirHd(currentTarget, item)} >Excluir</span>
            </div>


          </div>
        })}

      </div>

      {/* <div className="ldeSubFooter">
        <Link className="ldeSubFooterBtn" to="/hdnovo">
          Novo HD
        </Link>
      </div> */}

      <div className='ldeSubFooter'>
        <Link className='ldeSubFooterBtn' to='/hdnovo' >novo HD</Link>
    </div>

    </div>
  );
};

export default Hidrantes;
