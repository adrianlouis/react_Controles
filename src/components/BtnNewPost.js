import React from 'react';
import styles from './BtnNewPost.module.css';
import Filter from './Filter';

const BtnNewPost = ({ onclick }) => {
  function hover(elem) {
    const filter = elem.firstChild.nextElementSibling;
    filter.classList.add('animeIcon');
    elem.style.width = '5rem';
    // elem.style.height = '5rem';
  }

  function blur(elem) {
    const blur = elem.firstChild.nextElementSibling;
    elem.style.width = '2rem';
    elem.style.height = '2rem';
    blur.classList.remove('animeIcon');
  }

  return (
    <div
      className={`${styles.container} animateLeft`}
      onMouseEnter={({ currentTarget }) => hover(currentTarget)}
      onMouseLeave={({ currentTarget }) => blur(currentTarget)}
      // onMouseLeave={({ currentTarget }) => blur(currentTarget)}
    >
      <div className={styles.newPost} onClick={onclick}>
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <Filter />
    </div>
  );
};

export default BtnNewPost;
