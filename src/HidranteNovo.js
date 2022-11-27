import React from "react";
import { useNavigate } from "react-router-dom";
import AcoesCriandoItem from "./AcoesCriandoItem";
import CheckBox from "./CheckBox";
import { GlobalContext } from "./GlobalContext";
import Input from "./Input";
import Select from "./Select";

const HidranteNovo = () => {

  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [id, setId] = React.useState(novoId)
  const [num, setNum] = React.useState("");
  const [local, setLocal] = React.useState("");
  const [abrigo, setAbrigo] = React.useState("");
  const [sinal, setSinal] = React.useState("");
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

  console.log(id)

  function handleChange({ target }) {
    if (target.checked) {
      setPecas([...pecas, target.value]);
    } else {
      setPecas(pecas.filter((item) => item !== target.value));
    }
  }


  // SALVAR HD NOVO NO USERLOGADO
  function salvarNovoHd() {
    const novoHd = {
      id: id,
      num: num,
      local: local,
      abrigo: abrigo,
      sinal: sinal,
      val: hdValidade,
      pecas: pecas,
      avaria: avarias,
    };

    context.setUserLogado({
      ...context.userLogado,
      hd: [novoHd, ...context.userLogado.hd],
    });
    navigate("/hd");
  }

  return (
    <div>
      {/* <Link className="ldeSubFooterBtn" to="/home">Home</Link> */}

      <div className="hdCard">
        <div id="hdNum" className="hdInfo">
          <span>Hidrante</span>
          <Input
            labText="Número"
            labClass="hdLabel"
            id="numeroHd"
            inpClass="hdNovo"
            value={num}
            onChange={({ target }) => setNum(target.value)}
          />
        </div>

        <div id="hdLocal" className="hdInfo">
          <span>Local</span>

          <Select
            selectValorInicial={local}
            optionDisabledValue="-----"
            options={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B']}
            selectOnChange={({ target }) => setLocal(target.value)}
          />
        </div>

        <div id="hdAbrigo" className="hdInfo">
          <span>Abrigo</span>
          <Select
            selectValorInicial={abrigo}
            optionDisabledValue="-----"
            options={["Ok", "Nok"]}
            selectOnChange={({ target }) => setAbrigo(target.value)}
          />
        </div>

        <div id="hdSinal" className="hdInfo">
          <span>Sinalização</span>
          <Select
            selectValorInicial={sinal}
            optionDisabledValue="-----"
            options={["Ok", "Nok"]}
            selectOnChange={({ target }) => setSinal(target.value)}
          />
        </div>

        <div id="hdPecas" className="hdInfo">
          <CheckBox
            itens={["Storz", "Esguicho", "Mangueira"]}
            cbHandleChange={handleChange}
          />
        </div>

        <div id="hdValidade" className="hdInfo">
          <span>Validade das Mangueiras</span>
          <Input
            inpTipo="date"
            id="inputHdValidade"
            value={hdValidade}
            onChange={({ target }) => setHdValidade(target.value)}
          />
        </div>

        <div id="hdAvarias" className="hdInfo">
          <p>Avarias</p>
          <textarea
            id="hdAvariasTxtArea"
            value={avarias}
            onChange={({ target }) => setAvarias(target.value)}
          ></textarea>
        </div>

        <AcoesCriandoItem voltar='/hd' salvar={salvarNovoHd} />

      </div>
    </div>
  );
};

export default HidranteNovo;
