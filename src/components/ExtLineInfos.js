import React from 'react';
import styles from './ExtLineInfos.module.css';

const ExtLineInfos = ({ info, label, check }) => {
  return (
    <div className={styles.infoLine}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoLineSpan}>{info}</span>
    </div>
  );
};

export default ExtLineInfos;
