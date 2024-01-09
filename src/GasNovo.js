import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { updateBd } from './crudFireBase';
import styles from './Gas.module.css';

const GasNovo = () => {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [id, setId] = React.useState(novoId);
  const dataFull = {
    data: new Date().toLocaleString('pt-BR', { dateStyle: 'short' }),
    hora: new Date().toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  // ENCONTRAR ID
  function novoId() {
    if (ctx.userLogado.gas.length > 0) {
      const numeros = Object.keys(ctx.userLogado.gas).map((item) => {
        return ctx.userLogado.gas[item].id;
      });
      return Math.max(...numeros) + 1;
    } else {
      return 1;
    }
  }

  function save(id) {
    const novoArrGas = { gas: [...ctx.userLogado.gas, medidores] };
    ctx.setUserLogado({
      ...ctx.userLogado,
      gas: [...ctx.userLogado.gas, medidores],
    });
    updateBd(id, novoArrGas);

    navigate('/home/gas');
  }

  const [medicao, setMedicao] = React.useState({ loja: '', medicao: '' });
  const [medidores, setMedidores] = React.useState({
    id: id,
    diaCriado: dataFull.data,
    horaCriado: dataFull.hora,
    medicao: [],
  });

  function addMedicaoDeLoja() {
    setMedidores({ ...medidores, medicao: [...medidores.medicao, medicao] });
    setMedicao({ loja: '', medicao: '' });
    document.querySelector('#numeroLoja').focus();
  }

  function excluirLinha(ind) {
    const abah = medidores.medicao.filter((f, i) => {
      if (i !== ind) {
        return f;
      }
    });

    setMedidores({ ...medidores, medicao: abah });
  }

  return (
    <div className={styles.edicaoContainer}>
      <div>
        <div className={styles.recordsWrapper}>
          {medidores.medicao.map((m, i) => {
            return (
              <div className={styles.recordsLine}>
                <div className={styles.recordsItens}>
                  <i className="fa-solid fa-store"></i> {m.loja}
                </div>
                <div className={styles.recGasWrapper}>
                  <i className="fa-solid fa-gauge"></i> {m.medicao}
                </div>
                <div className={styles.recDelIcon}>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => excluirLinha(i)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.addGasLine}>
          <div className={styles.inputWrapper}>
            <label htmlFor="numeroLoja">
              <i className="fa-solid fa-store"></i>
            </label>
            <input
              id="numeroLoja"
              className={styles.newStoreNumber}
              type="tel"
              maxLength={3}
              onChange={({ target }) =>
                setMedicao({ ...medicao, loja: target.value })
              }
              value={medicao.loja}
            ></input>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="gasMedicao">
              <i className="fa-solid fa-gauge"></i>{' '}
            </label>
            <input
              id="gasMedicao"
              type="tel"
              maxLength={8}
              onChange={({ target }) =>
                setMedicao({ ...medicao, medicao: target.value })
              }
              value={medicao.medicao}
            ></input>
          </div>

          <div className={styles.plusIconWrapper}>
            <i
              className={`fa-solid fa-square-plus ${styles.plusIcon}`}
              onClick={() => addMedicaoDeLoja()}
            ></i>
          </div>
        </div>
      </div>

      <div className={styles.editActBtn}>
        <span onClick={() => navigate('/home/gas')}>
          <i className="fa-solid fa-angle-left" /> Cancelar
        </span>
        <span onClick={() => save(ctx.userLogado.id)}>
          <i className="fa-regular fa-floppy-disk" /> Salvar
        </span>
      </div>
    </div>
  );
};

export default GasNovo;
