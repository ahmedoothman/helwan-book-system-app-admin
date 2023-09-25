// React
import React, { useState, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// imgs
// info icon
import InfoIcon from '../../assets/icons/info.svg';
// spinner
import CircularProgress from '@mui/material/CircularProgress';
// error icon
import ErrorIcon from '../../assets/icons/not.svg';
const Message = React.memo(({ text, type }) => {
  const [style, setStyle] = useState('message');
  // useEffect
  useEffect(() => {
    if (type === 'info') {
      setStyle('message');
    } else if (type === 'error') {
      setStyle('error');
    } else if (type === 'load') {
      setStyle('load');
    }
  }, []);
  return (
    <div className={styles[`${style}`]}>
      <div className={styles[`${style}__icon`]}>
        {type === 'info' && <img src={InfoIcon} alt='info' />}
        {type === 'error' && <img src={ErrorIcon} alt='info' />}
        {type === 'load' && (
          <CircularProgress
            size={50}
            sx={{
              color: '#8f7a09',
            }}
          />
        )}
      </div>
      <p>{text}</p>
    </div>
  );
});

export { Message };
