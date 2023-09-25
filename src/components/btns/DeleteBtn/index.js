// React
import React from 'react';
// styles
import styles from './index.module.scss';
// imgs
import DeleteIcon from '../../../assets/icons/delete-icon.svg';
const DeleteBtn = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    if (onPress !== undefined) {
      await onPress();
    }
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      <div>
        <img src={DeleteIcon} alt='delete' />
      </div>
    </button>
  );
});

export { DeleteBtn };
