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
  const [filter, setFilter] = React.useState({
    tipo: '',
    opt: context.filterSelect,
  });
  const [checkToogle, setCheckToogle] = React.useState(false);
  const [listaAtiva, setListaAtiva] = React.useState(
    [...context.userLogado.ext].reverse(),
  );

  const filtro = { tipo: '', opt: '' };

  const [filterChoice, setFilterChoice] = React.useState(false);

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
    setFilter({ tipo: filter.tipo, opt: type });

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
    setFilter({ tipo: '', opt: '' });
    setCheckToogle(false);
    context.setItensFiltrados(null);
  }

  async function handleCheck(elem, item) {
    const stamp = Date.now();
    elem.firstChild.style.color = 'rgb(166,243,166)';
    elem.parentElement.previousSibling
      .querySelectorAll('fieldset')
      .forEach((e) => {
        e.style.color = 'rgb(106, 183, 106)';
      });
    elem.parentElement.querySelectorAll('fieldset').forEach((e) => {
      e.style.color = 'rgb(106, 183, 106)';
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
      // console.log('HOJE');
      return 'rgb(106, 183, 106) !important';
    } else {
      // console.log('ONTEM');
      return 'var(--span-branco)';
    }
  }

  function handleShowCard(ind) {
    const el = document.querySelector('#minor' + ind);
    if (el.style.display === 'block') {
      el.style.display = 'none';
      el.previousElementSibling.style.display = 'grid';
      el.previousElementSibling.style.flexDirection = 'unset';
      el.previousElementSibling.firstChild.style.margin = '0 10px 0 0';
      el.previousElementSibling.firstChild.nextSibling.style.margin =
        '0 10px 0 0';
    } else {
      el.style.display = 'block';
      el.previousElementSibling.style.display = 'flex';
      el.previousElementSibling.style.flexDirection = 'column';
      el.previousElementSibling.firstChild.style.margin = '0 0 1rem 0';
      el.previousElementSibling.firstChild.nextSibling.style.margin =
        '0 0 1rem 0';
    }
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
        <div className={`${styles.filterBar} animateLeft`}>
          {!filter.tipo && (
            <>
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
              <p className={styles.filterBtns} onClick={() => filterAvaria()}>
                <i className="fa-solid fa-circle-exclamation"></i>avariados
              </p>
              <p onClick={() => filterVistoria()} className={styles.filterBtns}>
                <i className="fa-regular fa-circle-check"></i>vistoriados
              </p>
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
        {!context.itensFiltrados &&
          listaAtiva.map((item, i) => {
            return (
              <div
                id={'item' + i}
                key={'item' + i}
                className={`${styles.item} animateLeft`}
                onClick={() => handleShowCard(i)}
              >
                <div className={styles.minorWrapper}>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-hashtag" />
                    <span className="numId">{item.num}</span>
                  </fieldset>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-fire-extinguisher" />
                    <span>{item.tipo}</span>
                  </fieldset>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-location-dot" />
                    <span>{item.local}</span>
                  </fieldset>
                </div>

                <div id={'minor' + i} className={styles.toogleOff}>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-calendar-day" />
                    <span>{ultRec(item.ultRec.ano, item.ultRec.mes)}</span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-regular fa-calendar" />
                    <span>
                      {item.ultRet
                        ? ultRec(item.ultRet, item.ultRec.mes)
                        : 'Reteste não informado'}
                    </span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
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
                    <fieldset
                      className={styles.fieldsetAvaria}
                      style={{ color: checked(item.vistoria.stamp) }}
                    >
                      <span className={styles.avaria}>{item.avaria}</span>
                    </fieldset>
                  )}

                  {/* <BtnAcoesItens
                    funcDel={() =>
                      excluirExtintor(context.userLogado.id, item, 'ext')
                    }
                    itemId={item.id}
                    editarOnClick={() =>
                      navigate(
                        `extedit?id=${item.id}&ftr=${filter}&ftrtp=${filterChoice}`,
                      )
                    }
                  /> */}

                  <fieldset className={styles.fieldsetBtns}>
                    <button className={styles.fsBtns}>
                      <i className="fa-regular fa-pen-to-square"></i> editar
                    </button>
                    <button className={styles.fsBtns}>
                      <i className="fa-regular fa-trash-can"></i> excluir
                    </button>
                  </fieldset>
                </div>
              </div>
            );
          })}

        {context.itensFiltrados &&
          context.itensFiltrados.map((item, i) => {
            return (
              <div
                id={'item' + i}
                key={'item' + i}
                className={`${styles.item} animateLeft`}
                onClick={() => handleShowCard(i)}
              >
                <div className={styles.minorWrapper}>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-hashtag" />
                    <span className="numId">{item.num}</span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-fire-extinguisher" />
                    <span>{item.tipo}</span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-location-dot" />

                    <span>{item.local}</span>
                  </fieldset>
                </div>

                <div id={'minor' + i} className={styles.toogleOff}>
                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-solid fa-calendar-day" />

                    <span>{ultRec(item.ultRec.ano, item.ultRec.mes)}</span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
                    className={styles.fieldset}
                  >
                    <i className="fa-regular fa-calendar" />
                    <span>
                      {item.ultRet
                        ? ultRec(item.ultRet, item.ultRec.mes)
                        : 'Reteste não informado'}
                    </span>
                  </fieldset>

                  <fieldset
                    style={{ color: checked(item.vistoria.stamp) }}
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
