import React from 'react';
import styles from '../Gas.module.css';

const GasEdt = ({
  onDel,
  onchangeLoja,
  onchangeMedicao,
  loja,
  valor,
  ...props
}) => {
  return (
    <div id="editWrap" className={styles.recordsLine}>
      <div className={styles.recordsItens}>
        <i className="fa-solid fa-store"></i>
        <input
          className={styles.inpStoreEdit}
          type="tel"
          {...props}
          value={loja}
          onChange={onchangeLoja}
          maxLength={3}
        ></input>
      </div>

      <div className={styles.recGasWrapper}>
        <i className="fa-solid fa-gauge"></i>
        <input
          className={styles.inpGasEdit}
          type="tel"
          maxLength={8}
          value={valor}
          onChange={onchangeMedicao}
        ></input>
      </div>

      <div className={styles.recDelIcon}>
        <i className="fa-solid fa-square-xmark" onClick={onDel}></i>
      </div>
    </div>
  );
};

export default GasEdt;
