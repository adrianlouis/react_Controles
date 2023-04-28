import React from "react";
import { useNavigate } from "react-router-dom";
import AcoesCriandoItem from "./AcoesCriandoItem";
import CheckBox from "./CheckBox";
import { GlobalContext } from "./GlobalContext";
import Input from "./Input";
import Select from "./Select";
import { adicionarRegistro, refreshBd, updateBd } from "./crudFireBase";

const HidranteNovo = () => {

  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [id, setId] = React.useState(novoId)
  const [num, setNum] = React.useState("");
  const [local, setLocal] = React.useState("");
  const [abrigo, setAbrigo] = React.useState("");
  const [sinal, setSinal] = React.useState("");
  const [placa, setPlaca] = React.useState('');
  const [hdValidade, setHdValidade] = React.useState("");
  const [pecas, setPecas] = React.useState([]);
  const [avarias, setAvarias] = React.useState("");

  

  // ENCONTRAR ID
  function novoId() {

    if (context.userLogado.hd.length > 0) {
      const numeros = Object.keys(context.userLogado.hd).map((item) => {
        return context.userLogado.hd[item].id;
      });
      return (Math.max(...numeros) + 1);
    } else {
      return 1;
    }
  }

  function handleChange({ target }) {
    if (target.checked) {
      setPecas([...pecas, target.value]);
    } else {
      setPecas(pecas.filter((item) => item !== target.value));
    }
  }


  // SALVAR HD NOVO NO USERLOGADO
  async function salvarNovoHd(idUser) {
    const novoHd = {
      id: id,
      num: num,
      local: local,
      abrigo: abrigo,
      sinal: sinal,
      placa: placa,
      val: hdValidade,
      pecas: pecas,
      avaria: avarias,
    };
    
    // context.setUserLogado({
      //   ...context.userLogado,
      //   hd: [novoHd, ...context.userLogado.hd],
      // });
      
      // updateBd(idUser, {hd:[...context.userLogado.hd, novoHd]})

      const novoObjHd = [novoHd, ...context.userLogado.hd]
      await adicionarRegistro(idUser, novoHd, 'hd')
      await context.setUserLogado({...context.userLogado, hd:novoObjHd})
      const update = await refreshBd(context.userLogado.nome)
      await context.setUserLogado(...update)

      // await adicionarRegistro(idUser, novoHd, 'hd');
      // await context.setUserLogado({...context.userLogado, hd:[novoHd, ...context.userLogado.hd]})
      // const update = await refreshBd(context.userLogado.nome)
      // await context.setUserLogado(...update)
      navigate("/home/hd");

  }



  function handleCheck(item){
    if (pecas.includes(item)){
      const peca = pecas.filter((f)=>{
        return f !== item
      })
      setPecas(peca)
    }else{
      setPecas([...pecas, item])
    }
  }


  React.useEffect(()=>{
    updateBd(context.userLogado.id, {hd:[...context.userLogado.hd]})
},[context.userLogado.hd])

  return (
    <div className='ldeContent'>
    {/* <div className='extCard'> */}
    <fieldset className='fieldsetFlexRow'>
      <legend>Hidrante</legend>
      <div>

      <p className='cardTextoPqn'>número</p>
      <Input
          id="numeroHd"
          inpClass="newLde"
          value={num}
          onChange={({target})=>setNum(target.value)}
          type='tel'
        />
      </div>

      <div>
      <p className='cardTextoPqn'>local</p>
      <Select
          selectValorInicial={local}
          // optionDisabledValue="local"
          options={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B']}
          selectOnChange={({target})=>setLocal(target.value)}
          className='novoHdSelect'
        />

      </div>

      <div>
        <p className='cardTextoPqn'>abrigo</p>
      <Select
          selectValorInicial={abrigo}
          options={["Ok", "Nok"]}
          selectOnChange={({target})=>setAbrigo(target.value)}
          className='novoHdSelect selectOkNok'

        />
      </div>

    </fieldset>

    <fieldset className='fieldsetFlexRow'>
      <legend>Peças</legend>
      <div>

<label className='pecasLabel' htmlFor='esguicho'>
          Esguicho
          <input id='esguicho' type='checkbox' value={pecas.includes('Esguicho')} checked={pecas.includes('Esguicho')} onChange={()=>handleCheck('Esguicho')}/>
          </label>

          <label className='pecasLabel' htmlFor='mangueira'>
          Mangueira
          <input id='mangueira' type='checkbox' value={pecas.includes('Mangueira')} checked={pecas.includes('Mangueira')} onChange={()=>handleCheck('Mangueira')}/>
          </label>

          <label className='pecasLabel' htmlFor='storz'>
          Storz
          <input id='storz' type='checkbox' value={pecas.includes('Storz')} checked={pecas.includes('Storz')} onChange={()=>handleCheck('Storz')} />
          </label>

      </div>

    </fieldset>

    <fieldset className='fieldsetFlexRow'>
      <legend>Sinalização</legend>
      <div>
        <p className='cardTextoPqn'>placa de sinalização</p>
        <Select
          selectValorInicial={placa}
          options={["Ok", "Nok"]}
          selectOnChange={({target})=>setPlaca(target.value)}
          className='novoHdSelect selectOkNok'
        />
      </div>

      <div>
        <p className='cardTextoPqn'>marcação no chão</p>
        <Select
          selectValorInicial={sinal}
          options={["Ok", "Nok"]}
          selectOnChange={({target})=>setSinal(target.value)}
          className='novoHdSelect selectOkNok'
        />
      </div>
    </fieldset>

    <fieldset className='fieldsetFlexRow'>
      <legend>Próximo Reteste Hidrostático</legend>
      <Input
          inpTipo="date"
          id="inputHdValidade"
          value={hdValidade}
          onChange={({ target }) => setHdValidade(target.value)}
        />
    </fieldset>

    <fieldset className='fieldsetFlexRow'>
      <legend>Avaria</legend>
      <textarea
          id="hdAvariasTxtArea"
          value={avarias}
          onChange={({target})=>setAvarias(target.value)}
        ></textarea>
    </fieldset>

    <fieldset className='fieldsetAcoes fieldsetFlexRow'>
      <div className='btnAcoesWrapper' onClick={()=>navigate('/home/hd')}>
        {/* <i className="fa-solid fa-angles-left" ></i> */}
        <p>cancelar</p>
      </div>

      <div className='btnAcoesWrapper' onClick={()=>salvarNovoHd(context.userLogado.id)}>
        {/* <i className="fa-solid fa-floppy-disk" ></i> */}
        <p>salvar</p>
      </div>

    </fieldset>

  </div>

  );
};

export default HidranteNovo;
