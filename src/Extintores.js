import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import styles from './Extintores.module.css';
import { useNavigate } from 'react-router-dom';
import { refreshBd, removerRegistro } from './crudFireBase';
import BtnAcoesItens from './components/BtnAcoesItens';
import SelectFilter from './components/SelectFilter';
import { UPDATE_DATA } from './funcoes/Api';

const Extintores = () => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState(null);
  const [checkToogle, setCheckToogle] = React.useState(false);
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

  function changeCheck() {
    setCheckToogle(!checkToogle);

    const today = new Date(Date.now()).toLocaleDateString('pt-Br', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

    if (checkToogle) {
      const checked = context.userLogado.ext.filter((f) => {
        return (
          today ===
          new Date(f.vistoria.stamp).toLocaleDateString('pt-Br', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })
        );
      });

      context.setItensFiltrados(checked);
    } else {
      const checked = context.userLogado.ext.filter((f) => {
        return (
          today !==
          new Date(f.vistoria.stamp).toLocaleDateString('pt-Br', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })
        );
      });
      context.setItensFiltrados(checked);
    }
  }

  function ultRec(ano, mes) {
    const data = new Date(ano, mes - 1);
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
      el.firstChild.nextElementSibling.style.display = 'none';
      el.style.boxShadow =
        'inset #3337 2px 2px 4px ,inset #0007 -5px -5px 10px ';
    });
    elem.firstChild.nextElementSibling.innerHTML = filtered.length;
    elem.firstChild.nextElementSibling.style.display = 'flex';
    elem.style.backgroundColor = '#439A86';
    elem.style.color = '#d1d1d1';
    elem.style.boxShadow =
      'inset #83dAc6 2px 2px 4px ,inset #035A46 -5px -5px 10px ';
  }

  function clearFilter() {
    // if (filter === 'tipo') {
    //   const spans = document.querySelectorAll('#typeSpan');
    //   spans.forEach((el) => {
    //     el.innerHTML = el.innerHTML.slice(0, 1);
    //   });
    // }

    setFilter(null);
    setCheckToogle(false);
    context.setItensFiltrados(null);
  }

  async function handleCheck(elem, item) {
    const stamp = Date.now();

    elem.firstChild.style.color = 'rgb(166,243,166)';

    const checked = {
      ...item,
      vistoria: { check: true, stamp: stamp },
    };

    const newArr = context.userLogado.ext.map((m) => {
      if (m.id !== item.id) {
        return m;
      } else {
        return checked;
      }
    });

    await UPDATE_DATA(context.userLogado.id, newArr, 'ext');
    context.setUserLogado({ ...context.userLogado, ext: newArr });
  }

  function filterVistoria() {
    setCheckToogle(!checkToogle);

    const hoje = new Date(Date.now()).toLocaleDateString('pt-Br', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

    const visto = context.userLogado.ext.filter((f) => {
      const itemData = new Date(f.vistoria.stamp).toLocaleDateString('pt-Br', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      return itemData === hoje;
    });

    const naoVisto = context.userLogado.ext.filter((f) => {
      const itemData = new Date(f.vistoria.stamp).toLocaleDateString('pt-Br', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      return itemData !== hoje;
    });

    !checkToogle
      ? context.setItensFiltrados(visto)
      : context.setItensFiltrados(naoVisto);
    setFilter('vistoria');
  }
  function handleVistoria(stamp) {
    const stampPtBr = new Date(stamp).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    return stampPtBr;
  }

  function checked(stamp) {
    const hoje = new Date(Date.now()).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    });
    const stamped = new Date(stamp).toLocaleDateString('pt-Br', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    });

    if (hoje === stamped) {
      return 'rgb(166, 243, 166)';
    } else {
      return 'rgb(85,85,85)';
    }
  }

  return (
    <>
      <div className={styles.filterBarWrapper}>
        <div className={styles.filterBar}>
          {!filter && (
            <>
              <p
                className={styles.filterBtns}
                onClick={() => setFilter('tipo')}
              >
                <i className="fa-solid fa-fire-extinguisher" />
                tipo
              </p>
              <p
                className={styles.filterBtns}
                onClick={() => setFilter('local')}
              >
                <i className="fa-solid fa-location-dot" />
                local
              </p>
              <p className={styles.filterBtns}>
                <i className="fa-solid fa-calendar-day" />
                recarga
              </p>
              <p className={styles.filterBtns}>
                <i className="fa-regular fa-calendar" />
                reteste
              </p>
              <p className={styles.filterBtns}>
                <i className="fa-solid fa-circle-exclamation"></i>avariados
              </p>
              <p onClick={() => filterVistoria()} className={styles.filterBtns}>
                <i className="fa-regular fa-circle-check"></i>vistoriados
              </p>
            </>
          )}

          {filter === 'local' && (
            <>
              <div
                className={styles.filterBtns}
                onClick={({ currentTarget }) => clearFilter(currentTarget)}
              >
                <p>
                  <i className="fa-solid fa-filter-circle-xmark"></i>limpar
                </p>
                <p style={{ display: 'flex' }} className={styles.filterNumbers}>
                  {context.itensFiltrados
                    ? context.itensFiltrados.length
                    : context.userLogado.ext.length}
                </p>
              </div>

              <SelectFilter itens={context.userLogado.ext} />
            </>
          )}

          {filter === 'tipo' && (
            <div className={styles.typeFilter}>
              {context.itensFiltrados && (
                <div
                  className={styles.filterBtns}
                  onClick={() => clearFilter()}
                >
                  <p>
                    <i className="fa-solid fa-filter-circle-xmark"></i> limpar
                  </p>
                </div>
              )}
              {!context.itensFiltrados && (
                <div
                  className={styles.filterBtns}
                  onClick={() => setFilter(null)}
                >
                  <p>
                    <i className="fa-solid fa-arrow-left"></i> voltar
                  </p>
                </div>
              )}
              <div
                className={styles.filterBtns}
                onClick={({ currentTarget }) =>
                  handleFilter('a', currentTarget)
                }
                id="typeSpan"
              >
                <p>A</p> <span className={styles.filterNumbers}></span>
              </div>
              <div
                className={styles.filterBtns}
                onClick={({ currentTarget }) =>
                  handleFilter('b', currentTarget)
                }
                id="typeSpan"
              >
                <p>B</p> <span className={styles.filterNumbers}></span>
              </div>
              <div
                className={styles.filterBtns}
                onClick={({ currentTarget }) =>
                  handleFilter('c', currentTarget)
                }
                id="typeSpan"
              >
                <p>C</p> <span className={styles.filterNumbers}></span>
              </div>
            </div>
          )}

          {filter === 'vistoria' && (
            <>
              <div className={styles.filterBtns} onClick={() => clearFilter()}>
                <i className="fa-solid fa-filter-circle-xmark"></i>
                <span>voltar</span>
              </div>
              <div
                className={styles.filterBtns}
                onClick={() => filterVistoria()}
              >
                {checkToogle && (
                  <>
                    {' '}
                    <i className="fa-regular fa-circle-check"></i>
                    <span>vistoriados</span>
                    {context.itensFiltrados && (
                      <span
                        style={{ display: 'flex' }}
                        className={styles.filterNumbers}
                      >
                        {context.itensFiltrados.length}
                      </span>
                    )}
                  </>
                )}
                {!checkToogle && (
                  <>
                    {' '}
                    <i className="fa-solid fa-circle-check"></i>
                    <span>não vistoriados</span>
                    {context.itensFiltrados && (
                      <span
                        style={{ display: 'flex' }}
                        className={styles.filterNumbers}
                      >
                        {context.itensFiltrados.length}
                      </span>
                    )}
                  </>
                )}
              </div>
            </>
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
                    onClick={({ currentTarget }) =>
                      handleCheck(currentTarget, item)
                    }
                  >
                    <i
                      style={{ color: checked(item.vistoria.stamp) }}
                      className={`${styles.vistoriaIcon} fa-solid fa-check`}
                    />

                    <span>
                      {/* {item.vistoria ? item.vistoria.stamp : 'vistoriar'} */}
                      {handleVistoria(item.vistoria.stamp)}
                    </span>
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
                    <span>
                      {item.ultRet
                        ? ultRec(item.ultRet, item.ultRec.mes)
                        : 'Reteste não informado'}
                    </span>
                  </fieldset>

                  <fieldset
                    className={styles.fieldset}
                    onClick={({ currentTarget }) =>
                      handleCheck(currentTarget, item)
                    }
                  >
                    <i
                      style={{ color: checked(item.vistoria.stamp) }}
                      className={`${styles.vistoriaIcon} fa-solid fa-check`}
                    />

                    <span>
                      {/* {item.vistoria ? item.vistoria.stamp : 'vistoriar'} */}
                      {handleVistoria(item.vistoria.stamp)}
                    </span>
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
    </>
  );
};

export default Extintores;
