import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import styles from './Gas.module.css';
import GasEdt from './components/GasEdt';
import { UPDATE_DATA, USER_GET } from './funcoes/Api';

const GasEdit = () => {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState('');
  const [params, setParams] = useSearchParams();
  const itemId = params.get('id');
  const userId = params.get('userid');
  const [objToEdit, setObjToEdit] = React.useState('');
  const [nItem, setNItem] = React.useState({ loja: '', medicao: '' });

  async function getData(id) {
    const user = await USER_GET(id);
    setUserData(user);
    const item = user.gas.filter((f) => {
      return f.id === Number(itemId);
    });
    setObjToEdit(item[0].medicao);
  }

  function handleAdd() {
    setObjToEdit([...objToEdit, nItem]);
    setNItem({ loja: '', medicao: '' });
  }

  React.useEffect(() => {
    setUserData(getData(userId));
  }, [userId]);

  async function handleSave() {
    const arrToSave = userData.gas.map((m) => {
      if (m.id === Number(itemId)) {
        return { ...m, medicao: objToEdit };
      } else {
        return m;
      }
    });

    await UPDATE_DATA(userId, arrToSave, 'gas');
    ctx.setUserLogado(await USER_GET(userId));

    navigate('/home/gas');
  }

  function handleDelete(i) {
    const erased = objToEdit.filter((f, ind) => {
      if (ind !== i) {
        return f;
      } else {
        return null;
      }
    });

    setObjToEdit(erased);
  }

  function handleEdit(item, t, i) {
    if (item === 'l') {
      const nValue = objToEdit.map((m, ind) => {
        if (ind === i) {
          return { ...m, loja: t.value };
        } else {
          return m;
        }
      });

      setObjToEdit(nValue);
    } else {
      const nValue = objToEdit.map((m, ind) => {
        if (ind === i) {
          return { ...m, medicao: t.value };
        } else {
          return m;
        }
      });

      setObjToEdit(nValue);
    }
  }

  return (
    <>
      <div className={`${styles.recordsWrapper} animateLeft`}>
        <h3>
          <i className="fa-solid fa-pencil"></i> Edição das medições
        </h3>

        <div>
          {objToEdit &&
            objToEdit.map((m, ind) => {
              return (
                <GasEdt
                  loja={m.loja}
                  valor={m.medicao}
                  onchangeLoja={({ currentTarget }) =>
                    handleEdit('l', currentTarget, ind)
                  }
                  onchangeMedicao={({ currentTarget }) =>
                    handleEdit('m', currentTarget, ind)
                  }
                  onDel={() => handleDelete(ind)}
                />
              );
            })}
        </div>

        {/* <div className={styles.addGasLine}>
        <div>
          <label htmlFor="numeroLoja">Loja: </label>
          <input
            id="numeroLoja"
            type="tel"
            maxLength={3}
            onChange={({ target }) =>
              setNItem({ ...nItem, loja: target.value })
            }
            value={nItem.loja}
          ></input>
        </div>

        <div>
          <label htmlFor="gasMedicao">Medicao: </label>
          <input
            id="gasMedicao"
            type="tel"
            maxLength={8}
            onChange={({ target }) =>
              setNItem({ ...nItem, medicao: target.value })
            }
            value={nItem.medicao}
          ></input>
        </div>

        <div className="gasAcoes">
          <i
            className="fa-solid fa-square-plus"
            style={
              nItem.loja === '' || nItem.medicao === ''
                ? { color: 'rgb(121,121,121)', cursor: 'not-allowed' }
                : { color: 'rgb(166,243,166)', cursor: 'pointer' }
            }
            onClick={() => handleAdd()}
          ></i>
        </div>
      </div> */}
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
              setNItem({ ...nItem, loja: target.value })
            }
            value={nItem.loja}
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
              setNItem({ ...nItem, medicao: target.value })
            }
            value={nItem.medicao}
          ></input>
        </div>

        <div className={styles.plusIconWrapper}>
          <i
            className={`fa-solid fa-square-plus ${styles.plusIcon}`}
            style={
              nItem.loja === '' || nItem.medicao === ''
                ? { color: 'rgb(121,121,121)', cursor: 'not-allowed' }
                : { color: 'rgb(166,243,166)', cursor: 'pointer' }
            }
            onClick={() => handleAdd()}
          ></i>
        </div>
      </div>

      <div className={styles.editActBtn}>
        <span onClick={() => navigate('/home/gas')}>
          <i className="fa-solid fa-angle-left" /> Cancelar
        </span>
        <span onClick={() => handleSave()}>
          <i className="fa-regular fa-floppy-disk" /> Salvar
        </span>
      </div>
    </>
  );
};

export default GasEdit;
