import React from 'react';
import styles from './GasEdt.module.css';

const GasEdt = ({
  onDel,
  onchangeLoja,
  onchangeMedicao,
  loja,
  valor,
  ...props
}) => {
  return (
    <div id="editWrap" className={styles.editWrap}>
      <input
        className={styles.lojaInput}
        type="tel"
        {...props}
        value={loja}
        onChange={onchangeLoja}
        maxLength={3}
      ></input>

      <input
        className={styles.medicaoInput}
        type="tel"
        maxLength={8}
        value={valor}
        onChange={onchangeMedicao}
      ></input>

      <i className="fa-solid fa-square-xmark" onClick={onDel}></i>
    </div>
  );
};

export default GasEdt;
