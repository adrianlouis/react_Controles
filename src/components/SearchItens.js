import React from 'react';
import styles from './SearchItens.module.css';
import { GlobalContext } from '../GlobalContext';
import { useLocation } from 'react-router-dom';

const SearchItens = ({ itens }) => {
  const ctx = React.useContext(GlobalContext);
  const [menuLabel, setMenuLabel] = React.useState('');
  const local = useLocation();
  const [value, setValue] = React.useState('');
  const [found, setFound] = React.useState('');
  const [path, setPath] = React.useState(local.pathname.slice(6));

  React.useEffect(() => {
    switch (local.pathname) {
      case '/home/ext':
        setMenuLabel('Extintores');
        break;
      case '/home/hd':
        setMenuLabel('Hidrantes');
        break;
      case '/home/gas':
        setMenuLabel('Medição de gases');
        break;
      case '/home/lde':
        setMenuLabel('Luzes de emergência');
        break;
      default:
        setMenuLabel('');
        break;
    }
  }, [local]);

  React.useEffect(() => {
    const res = ctx.userLogado[path].filter((f) => {
      return f.num.includes(value);
    });
    setFound(res);
    if (!value) {
      ctx.setItensFiltrados('');
    } else {
      ctx.setItensFiltrados(res);
    }
  }, [value]);

  function handleClose() {
    ctx.setSearchInput(false);
    ctx.setItensFiltrados('');
  }

  return (
    <div className={styles.search}>
      {ctx.itensFiltrados.length !== 0 && (
        <p className={styles.searchLength}>
          {found.length}{' '}
          {found.length > 1 ? 'itens encontrados' : 'item encontrado'}.
        </p>
      )}
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        className={styles.searchInput}
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <i
        className="fa-solid fa-xmark"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleClose();
        }}
      ></i>
    </div>
  );
};

export default SearchItens;
