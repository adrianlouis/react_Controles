import React from 'react';
import styles from './BtnNewPost.module.css';

const BtnNewPost = ({ onclick }) => {
  return (
    <div className={`${styles.newPost} animateLeft`} onClick={onclick}>
      <i className="fa-solid fa-circle-plus"></i>
    </div>
  );
};

export default BtnNewPost;
