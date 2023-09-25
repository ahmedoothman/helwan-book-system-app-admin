// React
import React, { useState, useEffect } from 'react';
// styles
import styles from './index.module.scss';

const Note = React.memo(({ text }) => {
  // useEffect
  useEffect(() => {}, []);
  return (
    <div className={styles[`note`]}>
      <p>
        <span>ملحوظة</span>
        {text}
      </p>
    </div>
  );
});

export { Note };
