import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import Select from './Select';
import styles from './ExtNovo.module.css';
import { UPDATE_DATA, USER_GET } from './funcoes/Api';

const HidranteEdit = () => {
  const location = useLocation();
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const userId = search.get('userId');
  const itemPraEditar = context.userLogado.hd.filter((f) => {
    return f.id === Number(search.get('id'));
  });
  const [nItem, setNItem] = React.useState({ ...itemPraEditar[0] });
  const anoAtual = new Date().getFullYear();

  function handleCheck(item) {
    const peca = nItem.pecas.filter((f) => {
      return f !== item;
    });

    if (nItem.pecas.includes(item)) {
      setNItem({ ...nItem, pecas: [...peca] });
    } else {
      setNItem({ ...nItem, pecas: [...peca, item] });
    }
  }

  async function handleSave() {
    const hidrantes = context.userLogado.hd.map((m) => {
      if (m.id !== Number(search.get('id'))) {
        return m;
      } else {
        return nItem;
      }
    });

    await UPDATE_DATA(userId, hidrantes, 'hd');
    context.setUserLogado(await USER_GET(userId));
    navigate('/home/hd');
  }

  function handleBlur(el) {
    el.parentNode.style.border = '2px solid #3337';
  }
  function handleFocus(el) {
    el.parentNode.style.border = '2px solid rgb(166, 243, 166)';
  }

  function handleMouseLeave(el) {
    el.style.border = '2px solid #3337';
  }

  function handleMouseEnter(el) {
    el.style.border = '2px solid rgb(166,243,166)';
  }

  function handleBlurDatas(el) {
    el.parentNode.parentNode.style.border = '2px solid #3337';
  }

  function handleFocusDatas(el) {
    el.parentNode.parentNode.style.border = '2px solid rgb(166, 243, 166)';
  }

  return (
    <>
      <div className={styles.novoExtContainer}>
        <h2>
          <i className="fa-regular fa-pen-to-square" /> Editar Hidrante
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
            onChange={({ target }) => setNItem({ ...nItem, num: target.value })}
            value={nItem.num}
          ></input>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <i className="fa-solid fa-location-dot" />
          <Select
            onBlur={({ currentTarget }) => handleBlur(currentTarget)}
            onFocus={({ currentTarget }) => handleFocus(currentTarget)}
            selClass={styles.select}
            optClass={styles.option}
            selectValorInicial={nItem.local}
            selectOnChange={({ target }) =>
              setNItem({ ...nItem, local: target.value })
            }
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
            selectValorInicial={nItem.abrigo}
            options={['Ok', 'Nok']}
            selectOnChange={({ target }) =>
              setNItem({ ...nItem, abrigo: target.value })
            }
            selClass={styles.select}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <i className="fa-solid fa-sign-hanging" />
          <Select
            onBlur={({ currentTarget }) => handleBlur(currentTarget)}
            onFocus={({ currentTarget }) => handleFocus(currentTarget)}
            selClass={styles.select}
            optClass={styles.option}
            selectValorInicial={nItem.placa}
            options={['Ok', 'Nok']}
            selectOnChange={({ target }) =>
              setNItem({ ...nItem, placa: target.value })
            }
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <i className="fa-solid fa-paint-roller" />
          <Select
            onBlur={({ currentTarget }) => handleBlur(currentTarget)}
            onFocus={({ currentTarget }) => handleFocus(currentTarget)}
            selectValorInicial={nItem.sinal}
            options={['Ok', 'Nok']}
            selectOnChange={({ target }) =>
              setNItem({ ...nItem, sinal: target.value })
            }
            selClass={styles.select}
            optClass={styles.option}
          />
        </fieldset>

        <fieldset
          onClick={({ currentTarget }) => handleMouseEnter(currentTarget)}
          onMouseLeave={({ currentTarget }) => handleMouseLeave(currentTarget)}
          className={`${styles.fieldset} ${styles.pecasHidrante}`}
        >
          <div>
            <label className="pecasLabel" htmlFor="esguicho">
              <input
                id="esguicho"
                type="checkbox"
                value={nItem.pecas.includes('Esguicho')}
                checked={nItem.pecas.includes('Esguicho')}
                onChange={() => handleCheck('Esguicho')}
              />{' '}
              Esguicho
            </label>

            <label className="pecasLabel" htmlFor="mangueira">
              <input
                id="mangueira"
                type="checkbox"
                value={nItem.pecas.includes('Mangueira')}
                checked={nItem.pecas.includes('Mangueira')}
                onChange={() => handleCheck('Mangueira')}
              />{' '}
              2 Mangueiras
            </label>

            <label className="pecasLabel" htmlFor="storz">
              <input
                id="storz"
                type="checkbox"
                value={nItem.pecas.includes('Storz')}
                checked={nItem.pecas.includes('Storz')}
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
              onFocus={({ currentTarget }) => handleFocusDatas(currentTarget)}
              onBlur={({ currentTarget }) => handleBlurDatas(currentTarget)}
              className={styles.selectRec}
              optClass={styles.option}
              selectValorInicial={nItem.val.mes}
              selectOnChange={({ target }) =>
                setNItem({ ...nItem, val: { ...nItem.val, mes: target.value } })
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
              className={styles.selectRec}
              optClass={styles.option}
              selectValorInicial={nItem.val.ano}
              selectOnChange={({ target }) =>
                setNItem({ ...nItem, val: { ...nItem.val, ano: target.value } })
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

        <fieldset className={`${styles.fieldset} ${styles.textareaWrapper}`}>
          <textarea
            spellCheck="false"
            className={styles.textarea}
            placeholder="Avarias . . ."
            onBlur={({ currentTarget }) => handleBlur(currentTarget)}
            onFocus={({ currentTarget }) => handleFocus(currentTarget)}
            id="hdAvariasTxtArea"
            value={nItem.avaria}
            onChange={({ target }) =>
              setNItem({ ...nItem, avaria: target.value })
            }
          ></textarea>
        </fieldset>

        <div className={styles.actionBtnsCreateWrapper}>
          <span onClick={() => navigate('/home/hd')}>
            <i className="fa-solid fa-angle-left" /> Cancelar
          </span>
          <span onClick={() => handleSave()}>
            <i className="fa-regular fa-floppy-disk" /> Salvar
          </span>
        </div>
      </div>
    </>
  );
};

export default HidranteEdit;
