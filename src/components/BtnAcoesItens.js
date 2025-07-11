import React from 'react';
import styles from './BtnAcoesItens.module.css';

const BtnAcoesItens = ({ funcDel, editarOnClick, itemId, toCheck }) => {
  function handleDel(e) {
    e.currentTarget.parentElement.style.display = 'none';
    e.currentTarget.parentElement.nextSibling.style.display = 'grid';
    e.stopPropagation();
  }
  function handleCancel(e) {
    e.currentTarget.parentElement.parentElement.style.display = 'none';
    e.currentTarget.parentElement.parentElement.previousSibling.style.display =
      'flex';
    e.stopPropagation();
  }

  return (
    <div id="btnAcoesItens" className={styles.container}>
      <div id={`btnContainer${itemId}`} className={styles.wrapper}>
        <div
          className={`${styles.btnWrapper} ${styles.editBtn}`}
          onClick={(e) => toCheck(e)}
        >
          {/* <i className="fa-regular fa-pen-to-square" /> */}
          <p>checkar</p>
        </div>

        <div
          className={`${styles.btnWrapper} ${styles.editBtn}`}
          onClick={(e) => editarOnClick(e)}
        >
          {/* <i className="fa-regular fa-pen-to-square" /> */}
          <p>editar</p>
        </div>

        <div
          className={`${styles.btnWrapper} ${styles.delBtn}`}
          onClick={(e) => handleDel(e)}
        >
          {/* <i className="fa-regular fa-trash-can" /> */}
          <p>excluir</p>
        </div>
      </div>

      <div
        id={`btnConfirm${itemId}`}
        className={styles.wrapperConfirmDel}
        style={{ display: 'none' }}
      >
        <span className={styles.delLabel}>Excluir este item?</span>
        <div className={styles.confirmDeleteWrap}>
          <span className={styles.delYes} onClick={(e) => handleCancel(e)}>
            <i className="fa-solid fa-arrow-left"></i> Não
          </span>
          <span className={styles.delNo} onClick={funcDel}>
            <i className="fa-regular fa-trash-can" /> Sim
          </span>
        </div>
      </div>
    </div>
  );
};

export default BtnAcoesItens;
