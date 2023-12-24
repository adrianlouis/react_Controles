import React from 'react';
import { useNavigate } from 'react-router-dom';
import AcoesCriandoItem from './AcoesCriandoItem';
import CheckBox from './CheckBox';
import { GlobalContext } from './GlobalContext';
import Input from './Input';
import Select from './Select';
import { adicionarRegistro, refreshBd, updateBd } from './crudFireBase';
import styles from './ExtNovo.module.css';

const HidranteNovo = () => {
  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [id, setId] = React.useState(novoId);
  const [num, setNum] = React.useState('');
  const [local, setLocal] = React.useState('');
  const [abrigo, setAbrigo] = React.useState('');
  const [sinal, setSinal] = React.useState('');
  const [placa, setPlaca] = React.useState('');
  const [pecas, setPecas] = React.useState([]);
  const [avarias, setAvarias] = React.useState('');
  const [hdValidade, setHdValidade] = React.useState({ mes: '', ano: '' });
  const anoAtual = new Date().getFullYear();

  // ENCONTRAR ID
  function novoId() {
    if (context.userLogado.hd.length > 0) {
      const numeros = Object.keys(context.userLogado.hd).map((item) => {
        return context.userLogado.hd[item].id;
      });
      return Math.max(...numeros) + 1;
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

    const novoObjHd = [novoHd, ...context.userLogado.hd];
    await adicionarRegistro(idUser, novoHd, 'hd');
    await context.setUserLogado({ ...context.userLogado, hd: novoObjHd });
    const update = await refreshBd(context.userLogado.nome);
    await context.setUserLogado(...update);

    navigate('/home/hd');
  }

  function handleCheck(item) {
    if (pecas.includes(item)) {
      const peca = pecas.filter((f) => {
        return f !== item;
      });
      setPecas(peca);
    } else {
      setPecas([...pecas, item]);
    }
  }

  React.useEffect(() => {
    updateBd(context.userLogado.id, { hd: [...context.userLogado.hd] });
  }, [context.userLogado.hd]);

  function handleBlur(el) {
    el.parentNode.style.border = '2px solid #3337';
  }
  function handleFocus(el) {
    el.parentNode.style.border = '2px solid rgb(166, 243, 166)';
  }

  function handleSelect(el, sel) {
    if (sel === 1) {
      setLocal(el.value);
    } else if (sel === 2) {
      setHdValidade({ ...hdValidade, mes: el.value });
    } else if (sel === 3) {
      setHdValidade({ ...hdValidade, ano: el.value });
    }

    el.style.color = 'rgb(161,161,161)';
  }

  function handleFocusReteste(el) {
    el.parentNode.parentNode.style.border = '2px solid rgb(166, 243, 166)';
  }
  function handleBlurReteste(el) {
    el.parentNode.parentNode.style.border = '2px solid #3337';
  }

  return (
    <div className={styles.novoExtContainer}>
      <h2>
        <i className="fa-solid fa-file-pen" /> Novo Hidrante
      </h2>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-hashtag" />
        <input
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          placeholder="Número"
          className={styles.inputNovoExt}
          type="tel"
          maxLength={5}
          onChange={({ target }) => setNum(target.value)}
          value={num}
        ></input>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-location-dot" />
        <Select
          value={local}
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          selClass={styles.select}
          optClass={styles.option}
          selectValorInicial={'Local'}
          selectOnChange={({ currentTarget }) => handleSelect(currentTarget, 1)}
          optionDisabledValue="Local"
          options={[
            'Subsolo',
            'Térreo',
            'Brigada',
            '2º Pav A',
            '2º Pav B',
            '2º Pav C',
            '3º Pav A',
            '3º Pav B',
            '3º Pav C',
            '4º Pav A',
            '4º Pav B',
            '4º Pav C',
            'CMI',
          ]}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-store" />
        <Select
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          optClass={styles.option}
          selectValorInicial={abrigo}
          options={['Ok', 'Nok']}
          selectOnChange={({ target }) => setAbrigo(target.value)}
          selClass={styles.select}
          optionDisabledValue="Abrigo"
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-sign-hanging" />
        <Select
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          value={placa}
          selClass={styles.select}
          optClass={styles.option}
          selectValorInicial={placa}
          optionDisabledValue="Placa de sinalização"
          options={['Ok', 'Nok']}
          selectOnChange={({ target }) => setPlaca(target.value)}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-paint-roller" />
        <Select
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          selectValorInicial={sinal}
          options={['Ok', 'Nok']}
          optionDisabledValue="Sinalização no chão"
          selectOnChange={({ target }) => setSinal(target.value)}
          selClass={styles.select}
          optClass={styles.option}
        />
      </fieldset>

      <fieldset className={`${styles.fieldset} ${styles.pecasHidrante}`}>
        <div>
          <p>
            <i className="fa-solid fa-wrench" /> Peças presentes no hidrante
          </p>

          <label className="pecasLabel" htmlFor="esguicho">
            <input
              id="esguicho"
              type="checkbox"
              value={pecas.includes('Esguicho')}
              checked={pecas.includes('Esguicho')}
              onChange={() => handleCheck('Esguicho')}
            />{' '}
            Esguicho
          </label>

          <label className="pecasLabel" htmlFor="mangueira">
            <input
              id="mangueira"
              type="checkbox"
              value={pecas.includes('Mangueira')}
              checked={pecas.includes('Mangueira')}
              onChange={() => handleCheck('Mangueira')}
            />{' '}
            2 Mangueiras
          </label>

          <label className="pecasLabel" htmlFor="storz">
            <input
              id="storz"
              type="checkbox"
              value={pecas.includes('Storz')}
              checked={pecas.includes('Storz')}
              onChange={() => handleCheck('Storz')}
            />{' '}
            Storz
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-calendar-day" />
        <div className={styles.wrapperSelectRecarga}>
          <Select
            onFocus={({ currentTarget }) => handleFocusReteste(currentTarget)}
            onBlur={({ currentTarget }) => handleBlurReteste(currentTarget)}
            className={styles.selectRec}
            optClass={styles.option}
            value={hdValidade.mes}
            selectOnChange={({ currentTarget }) =>
              handleSelect(currentTarget, 2)
            }
            optionDisabledValue="Mês"
            options={[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
            ]}
          />
          <Select
            onFocus={({ currentTarget }) => handleFocusReteste(currentTarget)}
            onBlur={({ currentTarget }) => handleBlurReteste(currentTarget)}
            className={styles.selectRec}
            optClass={styles.option}
            value={hdValidade.ano}
            selectOnChange={({ currentTarget }) =>
              handleSelect(currentTarget, 3)
            }
            optionDisabledValue="Ano"
            options={[
              anoAtual - 3,
              anoAtual - 2,
              anoAtual - 1,
              anoAtual,
              anoAtual + 1,
            ]}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <textarea
          spellCheck="false"
          placeholder="Avarias . . ."
          onBlur={({ currentTarget }) => handleBlur(currentTarget)}
          onFocus={({ currentTarget }) => handleFocus(currentTarget)}
          id="hdAvariasTxtArea"
          value={avarias}
          onChange={({ target }) => setAvarias(target.value)}
        ></textarea>
      </fieldset>

      <div className={styles.actionBtnsCreateWrapper}>
        <span onClick={() => navigate('/home/hd')}>
          <i className="fa-solid fa-angle-left" /> Cancelar
        </span>
        <span onClick={() => salvarNovoHd(context.userLogado.id)}>
          <i className="fa-regular fa-floppy-disk" /> Salvar
        </span>
      </div>
    </div>
  );
};

export default HidranteNovo;
