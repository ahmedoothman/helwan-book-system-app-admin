// react
import React, { Fragment, useEffect, useReducer, useRef } from 'react';
// styles
import styles from './index.module.scss';
// components
import { MainContainer } from '../../../components/mainContainer';
import { InputFileWide } from '../../../components/inputs/inputFileWide';
import { NavHeader } from '../../../components/navHeader';
// reducer
import {
  componentStatesInitialState,
  componentStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
// services
/***************************************************************************/
/* Name : UploadData React Component */
/***************************************************************************/
const UploadData = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // reducer
  const [uploadDataStates, dispatchUploadDataStates] = useReducer(
    componentStatesReducer,
    componentStatesInitialState
  );
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchUploadDataStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* uploadDoctorsData */
  /******************************************************************/
  const uploadDoctorsDataHandler = async (file) => {};
  /******************************************************************/
  /* uploadCourses */
  /******************************************************************/
  const uploadCoursesHandler = async (file) => {};
  return (
    <Fragment>
      <NavHeader title='رفع البيانات' />
      <MainContainer>
        <br />
        <br />
        <div className={styles['upload-item']}>
          <div className={styles['upload-item__title']}>
            رفع بيانات الدكاترة
          </div>
          <div className={styles['upload-item__content']}>
            <InputFileWide onClick={uploadDoctorsDataHandler} />
          </div>
        </div>
        <br />
        <div className={styles['upload-item']}>
          <div className={styles['upload-item__title']}>
            رفع بيانات المقررات
          </div>
          <div className={styles['upload-item__content']}>
            <InputFileWide onClick={uploadCoursesHandler} />
          </div>
        </div>
      </MainContainer>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={uploadDataStates.success}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='success'
          onClose={handleCloseSnackbar}
          dir='ltr'
          sx={{
            width: '100%',
            backgroundColor: '#43A047',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          !{uploadDataStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={uploadDataStates.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='error'
          onClose={handleCloseSnackbar}
          dir='ltr'
          sx={{
            width: '100%',
            backgroundColor: '#D32F2F',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          !{uploadDataStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default UploadData;
