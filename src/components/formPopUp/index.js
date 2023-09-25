// react
import React, { Fragment } from 'react';
// styles
import styles from './index.module.scss';
// mui
import Backdrop from '@mui/material/Backdrop';
// icons
import CloseIcon from '../../assets/icons/Close-Icon.svg';
/***************************************************************************/
/* Name : formPopUp */
/***************************************************************************/
const FormPopUp = React.memo((props) => {
  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <div className={styles.formPopUpContainer}>
          <div className={styles.closeIcon}>
            <img src={CloseIcon} alt='close-icon' onClick={props.handleClose} />
          </div>
          {props.children}
        </div>
      </Backdrop>
    </Fragment>
  );
});

export { FormPopUp };
