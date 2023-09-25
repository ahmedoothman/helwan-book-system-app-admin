// React
import React from 'react';
// styles
import styles from './index.module.scss';
// imgs
import AddIcon from '../../../assets/icons/add-icon.svg';
const AddBtn = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    if (onPress !== undefined) {
      await onPress();
    }
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      <img src={AddIcon} alt='add' />
      {text}
    </button>
  );
});

export { AddBtn };
