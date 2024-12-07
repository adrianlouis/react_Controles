import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hidrantes.module.css';
import { GlobalContext } from './GlobalContext';
import { refreshBd, removerRegistro, updateBd } from './crudFireBase';
import Footer from './Footer';
import BtnAcoesItens from './components/BtnAcoesItens';
import { convertData } from './funcoes/extDatas';

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd) {
    context.setUserLogado({ ...context.userLogado, hd: [] });
  }
  const today = Date.now();
  const navigate = useNavigate();
  const [ordenar, setOrdenar] = React.useState('');
  const [resFiltragem, setResFiltragem] = React.useState('');
  const userHds = context.userLogado.hd;

  React.useEffect(() => {
    if (ordenar) {
      ordenar === 'crescente' ? crescente(userHds) : decrescente(userHds);
    }
  }, [ordenar]);

  function crescente(itens) {
    const crescente = [];
    Object.keys(itens)
      .map((item) => {
        return Number(itens[item].num);
      })
      .sort((a, b) => {
        return a - b;
      })
      .forEach((cada) => {
        itens.map((item) => {
          if (item.num === String(cada)) {
            crescente.push(item);
          }
        });
      });
    setResFiltragem(crescente);
    context.setUserLogado({ ...context.userLogado, hd: [...crescente] });
  }

  function decrescente(itens) {
    const decresc = [];
    Object.keys(itens)
      .map((item) => {
        return Number(itens[item].num);
      })
      .sort((a, b) => {
        return b - a;
      })
      .forEach((cada) => {
        itens.map((item) => {
          if (item.num === String(cada)) {
            decresc.push(item);
          }
        });
      });
    setResFiltragem(decresc);
    context.setUserLogado({ ...context.userLogado, hd: [...decresc] });
  }

  async function excluirHd(idUser, item, campo) {
    await removerRegistro(idUser, item, campo);

    // refresh
    const update = await refreshBd(context.userLogado.nome);
    await context.setUserLogado(...update);
  }

  function handleCheck(id) {
    const hd = context.userLogado.hd.map((m) => {
      if (m.id !== id) {
        return m;
      } else {
        return { ...m, stamp: Date.now() };
      }
    });

    context.setUserLogado({
      ...context.userLogado,
      hd: hd,
    });

    updateBd(context.userLogado.id, { hd: hd });
  }

  function stampToDates(stamp) {
    const convertion = new Date(stamp).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    return convertion ? convertion : null;
  }

  function checkDates(stamp) {
    const convertion = new Date(stamp).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const todayStamp = new Date(today).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    if (convertion === todayStamp) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {context.itensFiltrados && context.itensFiltrados.length === 0 && (
          <div className="ldeResumoFiltro">
            <p>Não foi encontrado Hidrante com o número digitado.</p>
          </div>
        )}

        {!context.itensFiltrados &&
          context.userLogado.hd
            .sort((a, b) => {
              return a.num - b.num;
            })
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${styles.ldeContent} animateLeft`}
                  style={{
                    border: checkDates(item.stamp)
                      ? '2px solid #BCD8C1'
                      : '2px solid #333333',
                  }}
                >
                  <div className={styles.inpLine}>
                    <p className={styles.legends}> número</p>
                    <p> {item.num}</p>
                  </div>

                  <div className={styles.minorInfos}>
                    {item.avaria && (
                      <div className={styles.inpLine}>
                        <p className={styles.legends}>avaria</p>
                        <p>{item.avaria}</p>
                      </div>
                    )}

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>local</p>
                      <p>{item.local ? item.local : 'não informado'}</p>
                    </div>

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>abrigo</p>
                      <p>{item.abrigo ? item.abrigo : 'não informado'}</p>
                    </div>

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>sinalização</p>
                      <p>{item.placa ? item.placa : 'não informado'}</p>
                    </div>

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>marcação no chão</p>
                      <p>{item.sinal ? item.sinal : 'não informado'}</p>
                    </div>

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>peças</p>
                      <p>
                        {item.pecas.length === 0
                          ? 'nenhuma peça registrada'
                          : item.pecas.map((m, ind, l) => {
                              return m + (ind != l.length - 1 ? ', ' : '.');
                            })}
                      </p>
                    </div>

                    <div className={styles.inpLine}>
                      <p className={styles.legends}>último reteste</p>
                      <p>{convertData(item.val)}</p>
                    </div>
                  </div>

                  <BtnAcoesItens
                    funcDel={() => excluirHd(context.userLogado.id, item, 'hd')}
                    itemId={item.id}
                    editarOnClick={() =>
                      navigate(
                        `edit?id=${item.id}&userId=${context.userLogado.id}`,
                      )
                    }
                  />
                  <div
                    className={styles.checkContent}
                    onClick={() => handleCheck(item.id)}
                  >
                    {checkDates(item.stamp) ? (
                      <p className={styles.checked}>vistoriado</p>
                    ) : (
                      <>
                        <span className={styles.legends}>último check</span>
                        <p>
                          {item.stamp
                            ? stampToDates(item.stamp)
                            : 'Não vistoriado'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

        {context.itensFiltrados.length > 0 &&
          context.itensFiltrados.reverse().map((item) => {
            return (
              <div
                key={item.id}
                className={`${styles.ldeContent} animateLeft`}
                style={{
                  border: checkDates(item.stamp)
                    ? '2px solid #BCD8C1'
                    : '2px solid #333333',
                }}
              >
                <div className={styles.inpLine}>
                  <p className={styles.legends}> número</p>
                  <p> {item.num}</p>
                </div>

                <div className={styles.minorInfos}>
                  {item.avaria && (
                    <div className={styles.inpLine}>
                      <p className={styles.legends}>avaria</p>
                      <p>{item.avaria}</p>
                    </div>
                  )}

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>local</p>
                    <p>{item.local ? item.local : 'não informado'}</p>
                  </div>

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>abrigo</p>
                    <p>{item.abrigo ? item.abrigo : 'não informado'}</p>
                  </div>

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>sinalização</p>
                    <p>{item.placa ? item.placa : 'não informado'}</p>
                  </div>

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>marcação no chão</p>
                    <p>{item.sinal ? item.sinal : 'não informado'}</p>
                  </div>

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>peças</p>
                    <p>
                      {item.pecas.length === 0
                        ? 'nenhuma peça registrada'
                        : item.pecas.map((m, ind, l) => {
                            return m + (ind != l.length - 1 ? ', ' : '.');
                          })}
                    </p>
                  </div>

                  <div className={styles.inpLine}>
                    <p className={styles.legends}>último reteste</p>
                    <p>{convertData(item.val)}</p>
                  </div>
                </div>

                <BtnAcoesItens
                  funcDel={() => excluirHd(context.userLogado.id, item, 'hd')}
                  itemId={item.id}
                  editarOnClick={() =>
                    navigate(
                      `edit?id=${item.id}&userId=${context.userLogado.id}`,
                    )
                  }
                />
                <div
                  className={styles.checkContent}
                  onClick={() => handleCheck(item.id)}
                >
                  {checkDates(item.stamp) ? (
                    <p className={styles.checked}>vistoriado</p>
                  ) : (
                    <>
                      <span className={styles.legends}>último check</span>
                      <p>
                        {item.stamp
                          ? stampToDates(item.stamp)
                          : 'Não vistoriado'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <Footer
        numeroItens={context.userLogado.hd.length}
        itens={{ hidrantes: context.userLogado.hd }}
        novoItem={'hdnovo'}
      ></Footer>
    </>
  );
};

export default Hidrantes;
