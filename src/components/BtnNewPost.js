import React from 'react';
import styles from './BtnNewPost.module.css';
import Filter from './Filter';

const BtnNewPost = ({ onclick }) => {
  function hover(elem) {
    const filter = elem.firstChild.nextElementSibling;
    filter.style.right = '3rem';
  }
  return (
    <div
      className={styles.container}
      onMouseEnter={({ currentTarget }) => hover(currentTarget)}
    >
      <div className={`${styles.newPost} animateLeft`} onClick={onclick}>
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <Filter />
    </div>
  );
};

export default BtnNewPost;
