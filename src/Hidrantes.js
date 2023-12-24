import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import css from "./css/hd.css";
import styles from './Hidrantes.module.css';
import { GlobalContext } from './GlobalContext';
import MenuFooter from './MenuFooter';
import { Filtro } from './funcoes/filtroFuncoes';
import { refreshBd, removerRegistro, updateBd } from './crudFireBase';
import Footer from './Footer';
import BtnAcoesItens from './components/BtnAcoesItens';

const Hidrantes = () => {
  const context = useContext(GlobalContext);
  if (!context.userLogado.hd) {
    context.setUserLogado({ ...context.userLogado, hd: [] });
  }
  const navigate = useNavigate();
  const [ordenar, setOrdenar] = React.useState('');
  const [resFiltragem, setResFiltragem] = React.useState('');
  const userHds = context.userLogado.hd;
  const filtrados = new Filtro(context.userLogado.hd);

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

  function convertData(valor) {
    if (valor.mes && valor.ano) {
      return (
        new Date(valor.ano, Number(valor.mes) - 1)
          .toLocaleDateString('pt-br', { month: 'long', year: 'numeric' })
          .charAt(0)
          .toUpperCase() +
        new Date(valor.ano, Number(valor.mes) - 1)
          .toLocaleDateString('pt-br', { month: 'long', year: 'numeric' })
          .slice(1)
      );
    } else if (!valor.mes && valor.ano) {
      return valor.ano;
    } else if (!valor.ano && valor.mes) {
      return (
        new Date(2020, Number(valor.mes) - 1)
          .toLocaleDateString('pt-br', { month: 'long' })
          .charAt(0)
          .toUpperCase() +
        new Date(2020, Number(valor.mes) - 1)
          .toLocaleDateString('pt-br', { month: 'long' })
          .slice(1)
      );
    } else {
      return 'Data não informada';
    }
  }

  async function excluirHd(idUser, item, campo) {
    await removerRegistro(idUser, item, campo);

    // refresh
    const update = await refreshBd(context.userLogado.nome);
    await context.setUserLogado(...update);
  }

  return (
    <>
      <div className={`${styles.mainContainer} animateLeft`}>
        {context.itensFiltrados && context.itensFiltrados.length === 0 && (
          <div className="ldeResumoFiltro">
            <p>Não foi encontrado Hidrante com o número digitado.</p>
          </div>
        )}

        {!context.itensFiltrados &&
          context.userLogado.hd &&
          context.userLogado.hd
            .sort((a, b) => {
              return a.num - b.num;
            })
            .map((item) => {
              return (
                <div key={item.id} className="ldeContent">
                  <div className={styles.title}>
                    <p className={styles.legends}> número</p>
                    <p className={styles.values}> {item.num}</p>
                  </div>

                  <div className={styles.minorInfos}>
                    {item.avaria && (
                      <div>
                        <p className={styles.legends}>avaria</p>
                        <p className={styles.txtValues}>{item.avaria}</p>
                      </div>
                    )}

                    <div>
                      <p className={styles.txtValues}></p>
                      <p className={styles.legends}>local</p>
                      <p className={styles.txtValues}>
                        {item.local ? item.local : 'não informado'}
                      </p>
                    </div>

                    <div>
                      <p className={styles.legends}>abrigo</p>
                      <p className={styles.txtValues}>
                        {item.abrigo ? item.abrigo : 'não informado'}
                      </p>
                    </div>

                    <div>
                      <p className={styles.legends}>sinalização</p>
                      <p className={styles.txtValues}>
                        {item.placa ? item.placa : 'não informado'}
                      </p>
                    </div>

                    <div>
                      <p className={styles.legends}>marcação no chão</p>
                      <p className={styles.txtValues}>
                        {item.sinal ? item.sinal : 'não informado'}
                      </p>
                    </div>

                    <div>
                      <p className={styles.legends}>peças</p>
                      <p className={styles.txtValues}>
                        {item.pecas.length === 0
                          ? 'nenhuma peça registrada'
                          : item.pecas.map((m, ind, l) => {
                              return m + (ind != l.length - 1 ? ', ' : '.');
                            })}
                      </p>
                    </div>

                    <div>
                      <p className={styles.legends}>reteste</p>
                      <p className={styles.txtValues}>
                        {convertData(item.val)}
                      </p>
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
                </div>
              );
            })}

        {context.itensFiltrados.length > 0 &&
          context.itensFiltrados.reverse().map((item) => {
            return (
              <div key={item.id} className="ldeContent">
                <div className={styles.title}>
                  <p className={styles.legends}> número</p>
                  <p className={styles.values}> {item.num}</p>
                </div>

                <div className={styles.minorInfos}>
                  {item.avaria && (
                    <div>
                      <p className={styles.legends}>avaria</p>
                      <p className={styles.txtValues}>{item.avaria}</p>
                    </div>
                  )}

                  <div>
                    <p className={styles.legends}>local</p>
                    <p className={styles.txtValues}>
                      {item.local ? item.local : 'não informado'}
                    </p>
                  </div>

                  <div>
                    <p className={styles.legends}>abrigo</p>
                    <p className={styles.txtValues}>
                      {item.abrigo ? item.abrigo : 'não informado'}
                    </p>
                  </div>

                  <div>
                    <p className={styles.legends}>sinalização</p>
                    <p className={styles.txtValues}>
                      {item.placa ? item.placa : 'não informado'}
                    </p>
                  </div>

                  <div>
                    <p className={styles.legends}>marcação no chão</p>
                    <p className={styles.txtValues}>
                      {item.sinal ? item.sinal : 'não informado'}
                    </p>
                  </div>

                  <div>
                    <p className={styles.legends}>peças</p>
                    <p className={styles.txtValues}>
                      {item.pecas.length === 0
                        ? 'nenhuma peça registrada'
                        : item.pecas.map((m, ind, l) => {
                            return m + (ind != l.length - 1 ? ', ' : '.');
                          })}
                    </p>
                  </div>

                  <div>
                    <p className={styles.legends}>reteste</p>
                    <p className={styles.txtValues}>{convertData(item.val)}</p>
                  </div>
                </div>

                <BtnAcoesItens
                  funcDel={() => excluirHd(context.userLogado.id, item, 'hd')}
                  itemId={item.id}
                  editarOnClick={() => navigate(`edit?id=${item.id}`)}
                />
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
