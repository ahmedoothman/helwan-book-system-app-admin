// react
import React, {
  Fragment,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
// styles
import styles from './index.module.scss';
// components
import { MainContainer } from '../../../components/mainContainer';
import { NavHeader } from '../../../components/navHeader';
import { Message } from '../../../components/message';
import { FormPopUp } from '../../../components/formPopUp';
import { Note } from '../../../components/note/index';
import { Input } from '../../../components/inputs/InputField';
// reducer
import {
  componentStatesInitialState,
  componentStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// services
import {
  getRoleService,
  resetSystemServices,
} from '../../../services/adminService';

/***************************************************************************/
/* Name : ResetSystem React Component */
/***************************************************************************/
const ResetSystem = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // roles
  const [role, setRole] = useState('NOT'); // NOT ADMIN PUBLISHER SUPERADMIN
  // reducer
  const [resetSystemStates, dispatchResetSystemStates] = useReducer(
    componentStatesReducer,
    componentStatesInitialState
  );
  const [confirmDeleteForm, setConfirmDeleteForm] = useState(false);
  const [passwordConfirmForm, setPasswordConfirmForm] = useState(false);
  // refs
  const passwordRef = useRef(null);
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      // get role
      const { role } = await getRoleService();
      setRole(role);
    })();
  }, []);
  // close confirm delete form
  const handleCloseConfirmForm = () => {
    setConfirmDeleteForm(false);
  };
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchResetSystemStates({ type: 'CLEAR' });
  };

  /******************************************************************/
  /* resetSystemHandler */
  /******************************************************************/
  const resetSystemHandler = async () => {
    dispatchResetSystemStates({ type: 'PENDING' });
    // validate
    const password = passwordRef.current.getInputValue();
    if (password.trim() === '') {
      passwordRef.current.activeError();
      // dispatch states
      dispatchResetSystemStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة السر',
      });
      return false;
    } else {
      passwordRef.current.clearError();
    }
    // calling reset system
    const { status, message } = await resetSystemServices({ password });
    if (status === 'success') {
      // close password confirm form
      setPasswordConfirmForm(false);
      dispatchResetSystemStates({
        type: 'SUCCESS',
        successMessage: message,
      });
    } else {
      dispatchResetSystemStates({
        type: 'ERROR',
        errorMessage: message,
      });
    }
  };
  return (
    <Fragment>
      <NavHeader title='رفع البيانات' />
      {role === 'SUPERADMIN' && (
        <MainContainer>
          <div className={styles['container']}>
            <Note text='هذا الاجراء سيمسح  كل ملفات وبيانات السيستم' />
            <button
              className={styles['reset-btn']}
              onClick={() => {
                setConfirmDeleteForm(true);
              }}
            >
              اعادة التهيئة
            </button>
          </div>
          {/* ********** open Confirmation Form  confirmDeleteForm ********** */}
          <FormPopUp
            open={confirmDeleteForm}
            handleClose={handleCloseConfirmForm}
          >
            <div className={styles['confirm-input']}>
              <h2>هل انت متأكد من هذا الاجراء ؟</h2>
              <div className={styles['btns-group']}>
                <button
                  onClick={handleCloseConfirmForm}
                  className={`${styles['btn']} ${styles['normal']}`}
                >
                  لا
                </button>
                <button
                  onClick={() => {
                    setConfirmDeleteForm(false);
                    setPasswordConfirmForm(true);
                  }}
                  className={`${styles['btn']} ${styles['danger']}`}
                >
                  نعم
                </button>
              </div>
            </div>
          </FormPopUp>
          <FormPopUp
            open={passwordConfirmForm}
            handleClose={() => {
              setPasswordConfirmForm(false);
            }}
          >
            <div className={styles['confirm-input']}>
              <h2>برجاء ادخال كلمة السر للتأكيد</h2>
              <Input title={'كلمة السر'} type='PASSWORD' ref={passwordRef} />
              <br />
              <div className={styles['input-group']}>
                {!resetSystemStates.pending && (
                  <button
                    onClick={resetSystemHandler}
                    className={`${styles['btn']} ${styles['normal']}`}
                  >
                    ادخل
                  </button>
                )}
                {resetSystemStates.pending && (
                  <button
                    onClick={resetSystemHandler}
                    className={`${styles['btn']} ${styles['normal']}`}
                  >
                    <CircularProgress
                      size={20}
                      sx={{
                        color: '#a18a00',
                      }}
                    />
                  </button>
                )}
              </div>
            </div>
          </FormPopUp>
        </MainContainer>
      )}

      {role !== 'SUPERADMIN' && role !== 'NOT' && (
        <Message text={'لا يمكنك الوصول لهذه الصفحة'} type='error' />
      )}
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={resetSystemStates.success}
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
          !{resetSystemStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={resetSystemStates.error}
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
          !{resetSystemStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default ResetSystem;
