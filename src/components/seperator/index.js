//react
import React from 'react';
// styles
import styles from './index.module.scss';
const Seperator = React.memo(({ word }) => {
  return (
    <div className={styles.container}>
      <span className={styles.line}></span>
      <span className={styles.word}>{word}</span>
      <span className={styles.line}></span>
    </div>
  );
});

export { Seperator };
