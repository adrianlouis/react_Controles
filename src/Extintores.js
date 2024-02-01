import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
// import css from './css/ext.css'
import styles from './Extintores.module.css';
import { useNavigate } from 'react-router-dom';
import { refreshBd, removerRegistro } from './crudFireBase';
import Footer from './Footer';
import BtnAcoesItens from './components/BtnAcoesItens';
import SelectFilter from './components/SelectFilter';
import { Timestamp } from 'firebase/firestore';

const Extintores = () => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState(null);
  const [check, setCheck] = React.useState(null);
  const [listaAtiva, setListaAtiva] = React.useState(
    [...context.userLogado.ext].reverse(),
  );

  if (!context.userLogado.ext) {
    context.setUserLogado({ ...context.userLogado, ext: [] });
  }

  async function excluirExtintor(idUser, item, campo) {
    const nArray = listaAtiva.filter((f) => {
      if (f !== item) {
        return f;
      }
    });

    setListaAtiva(nArray);

    await removerRegistro(idUser, item, campo);
    const update = await refreshBd(context.userLogado.nome);
    context.setUserLogado(...update);

    if (context.itensFiltrados) {
      const itemRemovido = context.itensFiltrados.filter((f) => {
        if (f !== item) {
          return f;
        }
      });

      context.setItensFiltrados(itemRemovido);
    }
  }

  function tipoClasse(tipo) {
    if (tipo === 'A') {
      return 'AP';
    } else if (tipo === 'B') {
      return 'PQS';
    } else if (tipo === 'C') {
      return 'CO²';
    }
  }

  function datasPorExtenso(ano, mes) {
    if (ano && mes) {
      return new Date(ano + '-' + mes).toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
    } else if (!ano && mes) {
      return new Date(2020 - mes).toLocaleDateString('pt-BR', {
        month: 'long',
      });
    } else if (!mes && ano) {
      return ano;
    } else {
      return 'não informado';
    }
  }

  // function handleLoad(t) {
  //   t.style.transform = 'translate(0px)';
  //   console.log(t);
  // }

  // React.useEffect(() => {
  //   document.querySelector('#container').style.transform = 'translate(0px)';

  // }, []);
  function ultRec(ano, mes) {
    const data = new Date(ano, mes);
    const ptbr = data.toLocaleDateString('pt-Br', {
      month: 'long',
      year: 'numeric',
    });
    return ptbr;
  }

  function handleFilter(type, elem) {
    // background-color: #439A86;
    // box-shadow: inset #83dAc6 2px 2px 4px ,inset #035A46 -5px -5px 10px;

    const filtered = context.userLogado.ext.filter((f) => {
      return f.tipo === type.toUpperCase();
    });
    context.setItensFiltrados(filtered);
    const spans = document.querySelectorAll('#typeSpan');
    spans.forEach((el) => {
      el.style.backgroundColor = '#111';
      el.style.color = '#555';
      elem.style.boxShadow =
        'inset #3337 2px 2px 4px ,inset #0007 -5px -5px 10px ';
    });
    elem.style.backgroundColor = '#439A86';
    elem.style.color = '#d1d1d1';
    elem.style.boxShadow =
      'inset #83dAc6 2px 2px 4px ,inset #035A46 -5px -5px 10px ';
  }

  function clearFilter() {
    setFilter(null);
    context.setItensFiltrados(null);
  }

  function handleCheck(elem) {
    const stamp = new Date();
    // console.log(elem.firstChild.nextSibling.innerHTML);
    elem.firstChild.nextSibling.innerHTML = stamp.toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return (
    <>
      <div className={styles.filterBarWrapper}>
        <div className={styles.filterBar}>
          {!filter && (
            <>
              <p onClick={() => setFilter('tipo')}>tipo</p>
              <p onClick={() => setFilter('local')}>local</p>
              <p>recarga</p>
              <p>reteste</p>
              <p>avariados</p>
              <p>check</p>
            </>
          )}

          {filter === 'local' && (
            <>
              <p onClick={() => clearFilter()}>
                <i className="fa-solid fa-filter-circle-xmark"></i> limpar
              </p>

              <SelectFilter itens={context.userLogado.ext} />
            </>
          )}

          {filter === 'tipo' && (
            <div className={styles.typeFilter}>
              {context.itensFiltrados && (
                <p onClick={() => clearFilter()}>
                  <i className="fa-solid fa-filter-circle-xmark"></i> limpar
                </p>
              )}
              {!context.itensFiltrados && (
                <p onClick={() => setFilter(null)}>voltar</p>
              )}
              <p
                onClick={({ currentTarget }) =>
                  handleFilter('a', currentTarget)
                }
                id="typeSpan"
              >
                A
              </p>
              <p
                onClick={({ currentTarget }) =>
                  handleFilter('b', currentTarget)
                }
                id="typeSpan"
              >
                B
              </p>
              <p
                onClick={({ currentTarget }) =>
                  handleFilter('c', currentTarget)
                }
                id="typeSpan"
              >
                C
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.container} animateLeft`} id="container">
        {!context.itensFiltrados &&
          listaAtiva.map((item, i) => {
            return (
              <div className={styles.item}>
                <fieldset className={styles.fieldset}>
                  <i className="fa-solid fa-hashtag" />
                  <span>{item.num}</span>
                </fieldset>

                <div className={styles.toogleOff}>
                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-fire-extinguisher" />
                    <span>{item.tipo}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-location-dot" />

                    <span>{item.local}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-calendar-day" />

                    <span>{ultRec(item.ultRec.ano, item.ultRec.mes)}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-regular fa-calendar" />
                    <span>
                      {item.ultRet
                        ? ultRec(item.ultRet, item.ultRec.mes)
                        : 'Reteste não informado'}
                    </span>
                  </fieldset>

                  <fieldset
                    className={styles.fieldset}
                    onClick={({ currentTarget }) => handleCheck(currentTarget)}
                  >
                    <i className={`${styles.vistoriaIcon} fa-solid fa-check`} />

                    <span>{item.check ? item.check : 'vistoriar'}</span>
                  </fieldset>

                  {item.avaria && (
                    <fieldset className={styles.fieldsetAvaria}>
                      <span className={styles.avaria}>{item.avaria}</span>
                    </fieldset>
                  )}

                  <BtnAcoesItens
                    funcDel={() =>
                      excluirExtintor(context.userLogado.id, item, 'ext')
                    }
                    itemId={item.id}
                    editarOnClick={() => navigate(`extedit?id=${item.id}`)}
                  />
                </div>
              </div>
              // <>
              //   <div key={'key' + i} className={styles.itemContainer}>
              //     <div className={styles.innerSide}>
              //       <div className={styles.frontSide}>
              //         <div className={styles.wrapper}>
              //           <p className={styles.itemNum}>{item.num}</p>

              //           <p className={styles.itemType}>{item.tipo}</p>
              //           <p className={styles.itemPlace}>{item.local}</p>
              //           {item.avaria && (
              //             <p
              //               className={styles.avariaIcon}
              //               onClick={({ currentTarget }) =>
              //                 flipFront(currentTarget)
              //               }
              //             >
              //               <i className="fa-regular fa-eye"></i>
              //             </p>
              //           )}
              //         </div>

              //         <div className={styles.wrapperMonths}>
              //           <p className={styles.itemRec}>
              //             {ultRec(item.ultRec.ano, item.ultRec.mes)}
              //           </p>
              //           <p className={styles.itemRet}>
              //             {ultRec(item.ultRet, item.ultRec.mes)}
              //           </p>
              //         </div>
              //         <div className={styles.cardBtn}>
              //           <BtnAcoesItens
              //             funcDel={() =>
              //               excluirExtintor(context.userLogado.id, item, 'ext')
              //             }
              //             itemId={item.id}
              //             editarOnClick={() =>
              //               navigate(`extedit?id=${item.id}`)
              //             }
              //           />
              //         </div>
              //       </div>
              //       <div className={styles.backSide}>
              //         <p
              //           className={styles.flipbackCard}
              //           onClick={({ currentTarget }) => flipBack(currentTarget)}
              //         >
              //           <i className="fa-solid fa-arrow-left"></i>
              //         </p>
              //         <p className={styles.paraAvaria}>{item.avaria}</p>
              //       </div>
              //     </div>
              //   </div>
              // </>
            );
          })}

        {/* {!context.itensFiltrados &&
          listaAtiva.map((item, i) => {
            return (
              <div key={item.id + 'ext' + i} className={styles.containerGrid}>
                <div className={styles.cardMinor}>
                  <div>
                    <span className={styles.legends}>Número</span>
                    <span className={styles.values}>{item.num}</span>
                  </div>
                  <div>
                    <span className={styles.legends}>Tipo</span>
                    <span className={styles.values}>{item.tipo}</span>
                  </div>
                </div>

                <div className={styles.cardMedium}>
                  <div>
                    <span className={styles.legends}>local</span>
                    <span className={styles.infoGeral}>
                      {item.local ? item.local : 'não informado'}
                    </span>
                  </div>
                  <div>
                    <span className={styles.legends}>recarga</span>
                    <span className={styles.infoGeral}>
                      {datasPorExtenso(item.ultRec.ano, item.ultRec.mes)}
                    </span>
                  </div>
                  <div>
                    <span className={styles.legends}>reteste</span>
                    <span className={styles.infoGeral}>
                      {item.ultRet ? item.ultRet : 'não informado'}
                    </span>
                  </div>
                </div>

                {item.avaria && (
                  <div className={styles.cardAvarias}>
                    <span className={styles.legends}>avarias</span>
                    <span className={styles.infoGeral}>{item.avaria}</span>
                  </div>
                )}

                <div className={styles.cardBtn}>
                  <BtnAcoesItens
                    funcDel={() =>
                      excluirExtintor(context.userLogado.id, item, 'ext')
                    }
                    itemId={item.id}
                    editarOnClick={() => navigate(`extedit?id=${item.id}`)}
                  />
                  <hr></hr>
                </div>
              </div>
            );
          })} */}

        {context.itensFiltrados &&
          context.itensFiltrados.map((item, i) => {
            return (
              // <div key={'ext' + i} className="ldeContent">
              //   <div className={styles.title}>
              //     <p className={styles.legends}> número</p>
              //     <p className={styles.values}>{item.num ? item.num : 'N/A'}</p>
              //   </div>

              //   <div className={styles.minorInfos}>
              //     <div>
              //       <p className={styles.legends}> tipo</p>
              //       <p className={styles.txtValues}>
              //         {item.tipo
              //           ? `${item.tipo} - ${tipoClasse(item.tipo)}`
              //           : 'N/A'}
              //       </p>
              //       <p className={styles.legends}> local</p>
              //       <p className={styles.txtValues}>
              //         {item.local ? item.local : 'não informado'}
              //       </p>
              //     </div>

              //     <div>
              //       <p className={styles.legends}> recarga </p>
              //       <p className={styles.txtValues}>
              //         {' '}
              //         {datasPorExtenso(item.ultRec.ano, item.ultRec.mes)}
              //       </p>

              //       <p className={styles.legends}> reteste </p>
              //       <p className={styles.txtValues}>
              //         {item.ultRet ? item.ultRet : 'não informado'}
              //       </p>
              //     </div>

              //     <div>
              //       {item.avaria && <p className={styles.legends}>avaria</p>}
              //       <p className={styles.txtValues}> {item.avaria}</p>
              //     </div>
              //   </div>

              //   <BtnAcoesItens
              //     funcDel={() =>
              //       excluirExtintor(context.userLogado.id, item, 'ext')
              //     }
              //     itemId={item.id}
              //     editarOnClick={() => navigate(`extedit?id=${item.id}`)}
              //   />
              // </div>
              <div className={styles.item}>
                <fieldset className={styles.fieldset}>
                  <i className="fa-solid fa-hashtag" />
                  <span>{item.num}</span>
                </fieldset>
                <div className={styles.toogleOff}>
                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-fire-extinguisher" />
                    <span>{item.tipo}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-location-dot" />

                    <span>{item.local}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-solid fa-calendar-day" />

                    <span>{ultRec(item.ultRec.ano, item.ultRec.mes)}</span>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <i className="fa-regular fa-calendar" />
                    <span>{ultRec(item.ultRet, item.ultRec.mes)}</span>
                  </fieldset>

                  <fieldset
                    className={styles.fieldset}
                    onClick={({ currentTarget }) => handleCheck(currentTarget)}
                  >
                    <i className={`${styles.vistoriaIcon} fa-solid fa-check`} />

                    <span>{item.check ? item.check : 'vistoriar'}</span>
                  </fieldset>

                  {item.avaria && (
                    <fieldset className={styles.fieldsetAvaria}>
                      <span className={styles.avaria}>{item.avaria}</span>
                    </fieldset>
                  )}

                  <BtnAcoesItens
                    funcDel={() =>
                      excluirExtintor(context.userLogado.id, item, 'ext')
                    }
                    itemId={item.id}
                    editarOnClick={() => navigate(`extedit?id=${item.id}`)}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* <Footer
        numeroItens={context.userLogado.ext.length}
        itens={{ extintores: context.userLogado.ext }}
        novoItem={'extnovo'}
      /> */}
    </>
  );
};

export default Extintores;
