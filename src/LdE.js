import React from 'react';
import styles from './LdE.module.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { refreshBd, removerRegistro, updateBd } from './crudFireBase';
import BtnAcoesItens from './components/BtnAcoesItens';

const LdE = () => {
  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const today = Date.now();
  // const luzesOrdenadas = context.userLogado.lde.sort((a, b) => {
  //   return a.num - b.num;
  // });

  async function excluirLde(idUser, item, campo) {
    // deletar
    await removerRegistro(idUser, item, campo);

    //refresh
    const update = await refreshBd(context.userLogado.nome);
    await context.setUserLogado(...update);
  }

  function checkStamp(stamp) {
    const todayStamp = new Date(today).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const itemStamp = new Date(stamp).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    if (todayStamp === itemStamp) {
      return true;
    } else {
      return false;
    }
  }

  function checkItem(id) {
    const lde = context.userLogado.lde.map((m) => {
      if (m.id !== id) {
        return m;
      } else {
        return { ...m, stamp: Date.now() };
      }
    });

    context.setUserLogado({ ...context.userLogado, lde: lde });

    updateBd(context.userLogado.id, { lde: lde });
  }

  return (
    <div className={styles.mainContainer}>
      {(!context.itensFiltrados && context.userLogado.lde
        ? context.userLogado.lde
        : context.itensFiltrados
      )
        .sort((a, b) => {
          return a.num - b.num;
        })
        .map((item, index) => {
          return (
            <div
              key={item.id}
              className={`${styles.ldeContent} ${
                checkStamp(item.stamp) ? styles.checked : null
              } animateLeft`}
            >
              <div className={styles.title}>
                <p className={styles.legends}>número</p>
                <p className={styles.values}>{item.num}</p>
              </div>

              <div className={styles.title}>
                <p className={styles.legends}>local</p>
                <p className={styles.txtValues}>{item.local}</p>
              </div>

              <div className={styles.title}>
                <p className={styles.legends}>autonomia</p>
                <p className={styles.txtValues}>{item.dur}</p>
              </div>

              <div className={styles.minorInfos}>
                {item.avaria && (
                  <div className={styles.title}>
                    <p className={styles.legends}>avaria</p>
                    <p className={styles.txtValues}>{item.avaria}</p>
                  </div>
                )}
              </div>

              <BtnAcoesItens
                funcDel={() => excluirLde(context.userLogado.id, item, 'lde')}
                itemId={item.id}
                editarOnClick={() =>
                  navigate(`edit/id?id=${item.id}&ind=${index}`)
                }
              />

              <div
                className={styles.checkBtn}
                onClick={() => checkItem(item.id)}
              >
                {checkStamp(item.stamp) ? (
                  <p className={styles.checkedTxt}>vistoriado</p>
                ) : (
                  <>
                    <p className={styles.legends}>última vistoria</p>
                    <p>
                      {new Date(item.stamp).toLocaleDateString('pt-Br', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}

      {/* {context.itensFiltrados &&
          context.userLogado &&
          context.itensFiltrados.map((item, index) => {
            return (
              <div key={item.id} className="ldeContent animateLeft">
                <div className={styles.title}>
                  <p className={styles.legends}>Número</p>
                  <p className={styles.values}>{item.num}</p>
                </div>

                <div className={styles.minorInfos}>
                  <div>
                    <p className={styles.legends}>local</p>
                    <p className={styles.txtValues}>{item.local}</p>
                  </div>

                  <div>
                    <p className={styles.legends}>autonomia</p>
                    <p className={styles.txtValues}>{item.dur}</p>
                  </div>

                  {item.avaria && (
                    <div>
                      <p className={styles.legends}>avaria</p>
                      <p className={styles.txtValues}>{item.avaria}</p>
                    </div>
                  )}
                </div>

                <BtnAcoesItens
                  funcDel={() => excluirLde(context.userLogado.id, item, 'lde')}
                  itemId={item.id}
                  editarOnClick={() =>
                    navigate(`edit/id?id=${item.id}&ind=${index}`)
                  }
                />
              </div>
            );
          })} */}
    </div>
  );
};

export default LdE;
