import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import styles from './Extintores.module.css';
import { useNavigate } from 'react-router-dom';
import { refreshBd, removerRegistro, updateBd } from './crudFireBase';
import BtnAcoesItens from './components/BtnAcoesItens';
import SelectFilter from './components/SelectFilter';
import { UPDATE_DATA } from './funcoes/Api';
import ExtLineInfos from './components/ExtLineInfos';

const Extintores = () => {
  const context = useContext(GlobalContext);
  const [opened, setOpened] = React.useState([]);
  const navigate = useNavigate();
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).toLocaleDateString('pt-Br', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  const [filter, setFilter] = React.useState({
    tipo: '',
    opt: context.filterSelect,
  });
  const [checkToogle, setCheckToogle] = React.useState(false);
  const [listaAtiva, setListaAtiva] = React.useState(
    [...context.userLogado.ext].reverse(),
  );
  const [filterToggle, setFilterToggle] = React.useState(false);

  if (!context.userLogado.ext) {
    context.setUserLogado({ ...context.userLogado, ext: [] });
  }

  async function excluirExtintor(el, idUser, item, campo) {
    el.stopPropagation();
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

  function ultRec(ano, mes) {
    const data = new Date(ano, mes - 1);
    const ptbr = data.toLocaleDateString('pt-Br', {
      month: 'long',
      year: 'numeric',
    });
    return ptbr;
  }

  function handleFilter(type, elem) {
    setFilter({ tipo: filter.tipo, opt: type });
    console.log(filter.tipo);

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

  function handleFilt() {}

  function clearFilter() {
    setFilter({ tipo: '', opt: '' });
    setCheckToogle(false);
    context.setItensFiltrados(null);
  }

  function stampCheck(stamp) {
    if (
      today !==
      new Date(stamp).toLocaleDateString('pt-Br', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function handleCheck(elem, item) {
    const stamp = Date.now();
    elem.firstChild.style.color = 'var(--btn-default)';
    elem.parentElement.previousSibling
      .querySelectorAll('fieldset')
      .forEach((e) => {
        e.style.color = 'var(--btn-default)';
      });
    elem.parentElement.querySelectorAll('fieldset').forEach((e) => {
      e.style.color = 'var(--btn-default)';
    });

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
    setFilter({ tipo: 'vistoria', opt: !checkToogle ? 'visto' : 'naoVisto' });
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
      return 'var(--btn-default) !important';
    } else {
      return '#a5a5a5';
    }
  }

  function handleOpenCheck(id) {
    if (!opened.includes(id)) {
      setOpened([...opened, id]);
    } else {
      setOpened(
        opened.filter((f) => {
          return f !== id;
        }),
      );
    }
  }

  function doCheck(el, id) {
    el.stopPropagation();

    const extintores = context.userLogado.ext.map((m) => {
      return m.id === id
        ? { ...m, vistoria: { check: true, stamp: Date.now() } }
        : m;
    });

    context.setUserLogado({
      ...context.userLogado,
      ext: extintores,
    });

    if (context.itensFiltrados) {
      context.setItensFiltrados(false);
      context.setSearchInput(false);
    }

    updateBd(context.userLogado.id, { ext: extintores });
  }

  function filterAvaria() {
    setCheckToogle(!checkToogle);

    filter.opt
      ? setFilter({ tipo: 'avaria', opt: false })
      : setFilter({ tipo: 'avaria', opt: true });

    const comAvaria = context.userLogado.ext.filter((f) => {
      return f.avaria;
    });
    const semAvaria = context.userLogado.ext.filter((f) => {
      return !f.avaria;
    });

    if (checkToogle) {
      context.setItensFiltrados(semAvaria);
    } else {
      context.setItensFiltrados(comAvaria);
    }
  }

  return (
    <>
      <div className={styles.filterBarWrapper}>
        <div
          style={{
            justifyContent: filter.tipo === 'local' ? 'space-around' : '',
          }}
          className={`${styles.filterBar} animateLeft`}
        >
          {!filter.tipo && (
            <>
              {!filterToggle && (
                <>
                  <p
                    className={styles.filterBtns}
                    onClick={() => {
                      setFilterToggle(!filterToggle);
                    }}
                  >
                    <i className="fa-solid fa-filter"></i>
                    filtrar
                  </p>
                  {/* <p
                    className={styles.filterBtns}
                    onClick={() => {
                      setFilterToggle(!filterToggle);
                    }}
                  >
                    <i className="fa-solid fa-filter-circle-xmark"></i>
                    limpar filtro
                  </p> */}
                </>
              )}
              {filterToggle && (
                <>
                  {' '}
                  <p
                    className={styles.filterBtns}
                    onClick={() => {
                      setFilterToggle(!filterToggle);
                    }}
                  >
                    <i className="fa-solid fa-filter-circle-xmark"></i>
                    limpar filtro
                  </p>
                  <p
                    className={styles.filterBtns}
                    onClick={() => setFilter({ tipo: 'classe', opt: '' })}
                  >
                    <i className="fa-solid fa-fire-extinguisher" />
                    tipo
                  </p>
                  <p
                    className={styles.filterBtns}
                    onClick={() => setFilter({ tipo: 'local', opt: '' })}
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
                  <p
                    className={styles.filterBtns}
                    onClick={() => filterAvaria()}
                  >
                    <i className="fa-solid fa-circle-exclamation"></i>avariados
                  </p>
                  <p
                    onClick={() => filterVistoria()}
                    className={styles.filterBtns}
                  >
                    <i className="fa-regular fa-circle-check"></i>vistoriados
                  </p>
                </>
              )}
            </>
          )}

          {filter.tipo === 'local' && (
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

          {filter.tipo === 'classe' && (
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

          {filter.tipo === 'vistoria' && (
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

          {filter.tipo === 'avaria' && (
            <>
              <div className={styles.filterBtns} onClick={() => clearFilter()}>
                <p>
                  <i className="fa-solid fa-filter-circle-xmark"></i> limpar
                </p>
              </div>

              <div className={styles.filterBtns} onClick={() => filterAvaria()}>
                {checkToogle && (
                  <>
                    {' '}
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>avariados</span>
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
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>não avariados</span>
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

      <div className={styles.container} id="container">
        {(context.itensFiltrados
          ? context.itensFiltrados
          : context.userLogado.ext
        )
          .toReversed()
          .map((item, i) => {
            return (
              <div
                id={'item' + i}
                key={'item' + i}
                className={`${styles.item}`}
              >
                <div className={styles.minorWrapper}>
                  <div className={styles.card}>
                    <span className={styles.numba}>{item.num}</span>
                    <div className={styles.iconWrap}>
                      <i className="fa-solid fa-location-dot"></i>
                      <span className={styles.placeName}>{item.local}</span>
                    </div>

                    <div className={styles.iconWrap}>
                      <i className="fa-solid fa-calendar-days"></i>
                      <span className={styles.placeName}>
                        {ultRec(item.ultRec.ano, item.ultRec.mes)}
                      </span>
                    </div>
                    <div className={styles.iconWrap}>
                      <i
                        className={`fa-solid fa-check ${
                          !stampCheck(item.vistoria.stamp) && styles.checkedLine
                        }`}
                      ></i>
                      <span
                        className={`${styles.placeName} ${
                          !stampCheck(item.vistoria.stamp) && styles.checkedLine
                        }`}
                      >
                        {item.vistoria.stamp
                          ? new Date(item.vistoria.stamp).toLocaleDateString(
                              'pt-Br',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: '2-digit',
                              },
                            )
                          : ''}
                      </span>
                    </div>
                  </div>

                  <div className={styles.iconsStats}>
                    {item.avaria && (
                      <div className={styles.iconStatus}>
                        <i className="fa-solid fa-circle-info"></i>
                        {/* <span className={styles.iconLabel}>avariado</span> */}
                      </div>
                    )}
                    <div className={styles.iconStatus}>
                      <i className="fa-solid fa-calendar-days"></i>
                      {/* <span className={styles.iconLabel}>atrasado</span> */}
                    </div>
                  </div>

                  {/* <ExtLineInfos label={'número'} info={item.num} />
                  <ExtLineInfos label={'classe'} info={item.tipo} />
                  <ExtLineInfos label={'local'} info={item.local} /> */}
                  {/* {item.avaria && (
                    <ExtLineInfos label={'avaria'} info={item.avaria} />
                  )} */}
                </div>

                <div
                  id={'minor' + i}
                  className={`${styles.toogleOff} ${
                    opened.includes(item.id) ? styles.opened : ''
                  }`}
                >
                  <ExtLineInfos
                    label={'última recarga'}
                    info={ultRec(item.ultRec.ano, item.ultRec.mes)}
                  />

                  <ExtLineInfos
                    label={'último reteste'}
                    info={
                      item.ultRet
                        ? ultRec(item.ultRet, item.ultRec.mes)
                        : 'Reteste não informado'
                    }
                  />

                  {item.avaria && (
                    <ExtLineInfos label={'avaria'} info={item.avaria} />
                  )}

                  <BtnAcoesItens
                    funcDel={(e) =>
                      excluirExtintor(e, context.userLogado.id, item, 'ext')
                    }
                    itemId={item.id}
                    editarOnClick={() =>
                      navigate(`extedit?id=${item.id}&ftr=${filter}`)
                    }
                    toCheck={(e) => {
                      doCheck(e, item.id);
                    }}
                  />
                </div>

                <div className={styles.btnActionsWrapper}>
                  <span
                    onClick={() => handleOpenCheck(item.id)}
                    className={styles.detailBtn}
                  >
                    {opened.includes(item.id) ? 'fechar' : 'detalhes'}
                  </span>
                </div>

                {/* <div
                  id={`lastCheckWrap${i}`}
                  className={styles.lastCheckWrap}
                  style={{
                    pointerEvents: !stampCheck(item.vistoria.stamp) && 'none',
                  }}
                  onClick={
                    opened.includes(item.id) ? (e) => doCheck(e, item.id) : null
                  }
                >
                  <span>
                    {!stampCheck(item.vistoria.stamp)
                      ? 'checado'
                      : 'realizar check'}
                  </span>
                </div> */}

                {/* <i className="fa-solid fa-check"></i> */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Extintores;
