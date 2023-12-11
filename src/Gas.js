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
  // console.log(ctx.userLogado);
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
    <>
      {/* <NavLink to='gasnovo' className='novoRegistro' >Registrar medidores de gás</NavLink> */}
      <div className={`${styles.mainContainer} animateLeft`}>
        {user &&
          gases.map((item) => {
            return (
              <div key={item.id} className={styles.gasContainer}>
                <div className={styles.infos}>
                  <div className={styles.title}>
                    <p className={styles.legends}>
                      {item.diaCriado} - {item.horaCriado} h
                    </p>
                  </div>
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
                            className={styles.dados}
                          >
                            <span>Loja {lojas.loja}</span>
                            <span>Medição {lojas.medicao}</span>
                          </div>
                        );
                      }
                    });
                  })}
                  <div className={styles.btnAcoesWrap}>
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
              </div>
            );
          })}
      </div>

      <Footer
        numeroItens={ctx.userLogado.gas.length}
        itens={{ gas: ctx.userLogado.gas }}
        novoItem={'gasnovo'}
      />
    </>
  );
};

export default Gas;
