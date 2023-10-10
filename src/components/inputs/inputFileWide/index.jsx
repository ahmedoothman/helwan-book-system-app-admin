// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// mui progress
import CircularProgress from '@mui/material/CircularProgress';
// components
import { BtnSmall } from '../../btns/btnSmall';
/***************************************************************************/
/* Name : InputFileWide React Component */
/***************************************************************************/
const InputFileWide = React.memo((props) => {
  // file
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState(props.tag);
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);

  /******************************************************************/
  /* onSubmitHandler */
  /******************************************************************/
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // build new file with encoded name
    const newFile = new File([file], encodeURIComponent(file.name), {
      type: file.type,
    });
    props.onClick(newFile);
  };
  return (
    <Fragment>
      <form className={styles['upload-container']} onSubmit={onSubmitHandler}>
        <input
          type={'file'}
          name={props.tag}
          id={props.tag}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className={styles['upload-btn']}>
          <label htmlFor={props.tag}>اختر ملف</label>
          <p>
            {file
              ? file.name.length > 20
                ? file.name.slice(0, 20) + '...'
                : file.name
              : 'لم يتم اختيار ملف'}
          </p>
        </div>
        {!props.pending && <BtnSmall title={'رفع'} />}
        {props.pending && (
          <div className={styles['progress-container']}>
            <BtnSmall
              title={
                <CircularProgress
                  size={20}
                  color='inherit'
                  style={{ color: '#fff' }}
                />
              }
            />
          </div>
        )}
      </form>
    </Fragment>
  );
});

export { InputFileWide };
