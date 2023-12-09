import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateBd } from './crudFireBase';
import { GlobalContext } from './GlobalContext';
import styles from './Gas.module.css';
import GasEdt from './components/GasEdt';

const GasEdit = () => {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const medicao = ctx.userLogado.gas.filter((f) => {
    return f.id === Number(search.get('id'));
  });
  const [objEditavel, setObjEditavel] = React.useState(medicao[0]);

  const [medicaoNova, setMedicaoNova] = React.useState({
    loja: '',
    medicao: '',
  });

  function addMedicaoDeLoja() {
    if (
      document.querySelector('#gasMedicao').value === '' &&
      document.querySelector('#numeroLoja').value === ''
    ) {
      return;
    } else {
      setObjEditavel({
        ...objEditavel,
        medicao: [...objEditavel.medicao, medicaoNova],
      });
      setMedicaoNova({ loja: '', medicao: '' });
    }
  }

  //   TO-DO - CRIAR UMA FUNCAO PARA SALVAR AS MEDICOES EDITADAS; AO EXCLUIR UMA DAS LINHAS, APENAS É EXCLUÍDA A ÚLTIMA LINHA DA LISTA.

  function salvar() {
    const objToSave = ctx.userLogado.gas.map((m) => {
      if (m.id === medicao[0].id) {
        return objEditavel;
      } else {
        return m;
      }
    });

    console.log(objToSave);

    // updateBd(ctx.userLogado.id, { gas: objToSave });
    // ctx.setUserLogado({ ...ctx.userLogado, gas: objToSave });
    // navigate('/home/gas');
  }

  function deletar(loja) {
    const deletado = objEditavel.medicao.filter((f) => {
      if (f.loja !== loja) {
        return f;
      }
    });

    setObjEditavel({ ...objEditavel, medicao: deletado });
  }

  return (
    <div>
      <h2>Edição da medição</h2>

      {objEditavel.medicao.map((m, ind) => {
        return (
          <div
            id={'divInput' + ind}
            key={'item' + ind}
            className={styles.wrapperEdicaoGas}
          >
            <GasEdt
              loja={m.loja}
              valor={m.medicao}
              onDel={({ currentTarget }) => deletar(m.loja, currentTarget, ind)}
            />
          </div>
        );
      })}

      <div className={styles.addGasLine}>
        <div>
          <label htmlFor="numeroLoja">Loja: </label>
          <input
            id="numeroLoja"
            type="tel"
            maxLength={3}
            onChange={({ target }) =>
              setMedicaoNova({ ...medicaoNova, loja: target.value })
            }
            value={medicaoNova.loja}
          ></input>
        </div>

        <div>
          <label htmlFor="gasMedicao">Medicao: </label>
          <input
            id="gasMedicao"
            type="tel"
            maxLength={8}
            onChange={({ target }) =>
              setMedicaoNova({ ...medicaoNova, medicao: target.value })
            }
            value={medicaoNova.medicao}
          ></input>
        </div>

        <div className="gasAcoes">
          <i
            className="fa-solid fa-square-plus"
            style={
              medicaoNova.loja === '' && medicaoNova.medicao === ''
                ? { color: 'rgb(121,121,121)', cursor: 'not-allowed' }
                : { color: 'rgb(166,243,166)', cursor: 'pointer' }
            }
            onClick={() => addMedicaoDeLoja()}
          ></i>
        </div>
      </div>

      <div className={styles.editActBtn}>
        <span onClick={() => navigate('/home/gas')}>
          <i className="fa-solid fa-angle-left" /> Cancelar
        </span>
        <span onClick={() => salvar()}>
          <i className="fa-regular fa-floppy-disk" /> Salvar
        </span>
      </div>
    </div>
  );
};

export default GasEdit;
