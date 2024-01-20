import React, { useContext } from 'react';
import styles from './Footer.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

const Footer = () => {
  const navigate = useNavigate();
  const ctx = useContext(GlobalContext);
  const local = useLocation();

  function handleSearch() {
    if (
      local.pathname.slice(6) === 'gas' ||
      local.pathname.slice(6) === 'inicio'
    ) {
      ctx.setItensFiltrados('');
      ctx.setSearchInput(false);
      // document.querySelector('#iconSearch').style.color = '#515151';
    } else {
      ctx.setItensFiltrados('');
      ctx.setSearchInput(true);
    }
  }

  return (
    <footer className={styles.footer}>
      <i
        className="fa-solid fa-house"
        onClick={() => navigate('/home/inicio')}
      ></i>
      <i
        id="iconSearch"
        style={{ color: ctx.searchInput ? '#53aa96' : '#d1d1d1' }}
        className="fa-solid fa-magnifying-glass"
        onClick={() => handleSearch()}
      ></i>
      <i className="fa-solid fa-users" onClick={() => navigate('/profile')}></i>
      <i className="fa-solid fa-envelope"></i>
    </footer>
  );
};

export default Footer;
