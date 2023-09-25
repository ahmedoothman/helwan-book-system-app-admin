// React
import React from 'react';
// styles
import styles from './index.module.scss';
// imgs
import EditIcon from '../../../assets/icons/edit-icon.svg';
const EditBtn = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    if (onPress !== undefined) {
      await onPress();
    }
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      <div>
        <img src={EditIcon} alt='edit' />
      </div>
    </button>
  );
});

export { EditBtn };
