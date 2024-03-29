import React from 'react';
import styles from './Hidrantes.module.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { refreshBd, removerRegistro } from './crudFireBase';
import BtnAcoesItens from './components/BtnAcoesItens';

const LdE = () => {
  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const luzesOrdenadas = context.userLogado.lde.sort((a, b) => {
    return a.num - b.num;
  });

  async function excluirLde(idUser, item, campo) {
    // deletar
    await removerRegistro(idUser, item, campo);

    //refresh
    const update = await refreshBd(context.userLogado.nome);
    await context.setUserLogado(...update);
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {!context.itensFiltrados &&
          context.userLogado &&
          luzesOrdenadas.map((item, index) => {
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
          })}

        {context.itensFiltrados &&
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
          })}
      </div>

      {/* <Footer
        numeroItens={context.userLogado.ext.length}
        itens={{ lde: context.userLogado.lde }}
        novoItem={'ldenovo'}
      /> */}
    </>
  );
};

export default LdE;
