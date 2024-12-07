import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import css from './css/gas.css'
import { GlobalContext } from './GlobalContext';
import { updateBd } from './crudFireBase';
import Footer from './Footer';
import styles from './Gas.module.css';
import BtnAcoesItens from './components/BtnAcoesItens';
import { USER_GET } from './funcoes/Api';

const Gas = () => {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const gases = ctx.userLogado.gas.sort((a, b) => {
    return b.id - a.id;
  });
  const [pages, setPages] = React.useState(Number(gases.length));
  const [activeItens, setActiveItens] = React.useState([]);

  function settingPages(pg, func) {
    const itens = [];
    if (func === 'mais' && pg > 0) {
      for (let i = pg; i !== pg - 5; i--) {
        if (i <= 0) {
          console.log('pare');
          return;
        }
        console.log(i);
        itens.push(i);
        // console.log(gases[i]);
        // console.log('ind: ' + i);
        if (i === pg - 4) {
          setPages(i - 1);
          setActiveItens(itens);
        }
      }
    } else if (func === 'menos' && pg < gases.length) {
      for (let i = 0; i < pg + 5; i++) {
        // console.log(gases[i]);
        // console.log('ind: ' + i);
        if (i === pg + 4) setPages(i);
      }
    }
  }

  function deletar(elem, id) {
    const res = gases.filter((f) => {
      return f.id !== elem.id;
    });

    ctx.setUserLogado({ ...ctx.userLogado, gas: res });
    updateBd(id, { gas: res });
    navigate('/home/gas');
  }

  function arrOrdemCresc(arr) {
    const ordem = arr.sort((a, b) => {
      return a - b;
    });
    return ordem;
  }

  async function getData(id) {
    const user = await USER_GET(id);
    setUser(user);
  }

  React.useEffect(() => {
    setUser(getData(ctx.userLogado.id));
  }, [ctx.userLogado.id]);

  return (
    // <>
    <div className={styles.mainContainer}>
      {user &&
        gases.map((item, i) => {
          return (
            <div
              key={`gas${item.id}${i}`}
              className={`${styles.gasContainer} `}
            >
              <div className={`${styles.infos} animateLeft `}>
                <div className={`${styles.title} `}>
                  <p className={styles.legends}>
                    <i className="fa-solid fa-calendar-day"></i>
                    {' ' + item.diaCriado} -{' '}
                    <i className="fa-regular fa-clock"></i>
                    {' ' + item.horaCriado}
                  </p>
                </div>

                <div className={styles.linesContent}>
                  {arrOrdemCresc(
                    item.medicao.map((m) => {
                      return m.loja;
                    }),
                  ).map((ordem) => {
                    return item.medicao.map((lojas) => {
                      if (lojas.loja === ordem) {
                        return (
                          <div
                            key={'medicao' + item.id + '_' + lojas.loja}
                            className={styles.recordsLine}
                          >
                            <div className={styles.recordsItens}>
                              <i className="fa-solid fa-store"></i> {lojas.loja}
                            </div>
                            <div className={styles.recGasWrapper}>
                              <i className="fa-solid fa-gauge"></i>{' '}
                              {lojas.medicao}
                            </div>
                          </div>
                        );
                      }
                    });
                  })}
                </div>
                <BtnAcoesItens
                  funcDel={() => deletar(item, ctx.userLogado.id)}
                  itemId={item.id}
                  editarOnClick={() =>
                    navigate(
                      `edit/id?id=${item.id}&userid=${ctx.userLogado.id}`,
                    )
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
    // </>
  );
};

export default Gas;
