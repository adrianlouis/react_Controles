import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { GlobalContext } from './GlobalContext';
import Input from './Input';
import Select from './Select';

const Header = () => {
  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [headerModal, setHeaderModal] = React.useState(false);
  const url = window.location.href;

  return (
    <div className={styles.header}>
      <img id="wallpaper" />
    </div>
  );
};

export default Header;
