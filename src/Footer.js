import React from 'react';
import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <i
        className="fa-solid fa-house"
        onClick={() => navigate('/home/inicio')}
      ></i>
      <i className="fa-solid fa-magnifying-glass"></i>
      <i className="fa-solid fa-users" onClick={() => navigate('/profile')}></i>
      <i className="fa-solid fa-envelope"></i>
    </footer>
  );
};

export default Footer;
