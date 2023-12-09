import React from 'react';
import styles from './GasEdt.module.css';

const GasEdt = ({ onDel, loja, valor, ...props }) => {
  const [shop, setShop] = React.useState(loja);
  const [number, setNumber] = React.useState(valor);

  return (
    <div id="editWrap" className={styles.editWrap}>
      <input
        className={styles.lojaInput}
        type="tel"
        {...props}
        value={shop}
        onChange={(target) => setShop(target.value)}
        maxLength={3}
      ></input>

      <input
        className={styles.medicaoInput}
        type="tel"
        maxLength={8}
        value={number}
        onChange={(target) => setNumber(target.value)}
      ></input>

      <i className="fa-solid fa-square-xmark" onClick={onDel}></i>
    </div>
  );
};

export default GasEdt;
