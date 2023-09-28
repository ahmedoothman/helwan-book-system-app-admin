// react
import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

// styles
import styles from './index.module.scss';
// components
import { NavHeader } from '../../../components/navHeader/index';
import { Input } from '../../../components/inputs/InputField/index';
import { BtnSmall } from '../../../components/btns/btnSmall/index';
import { Message } from '../../../components/message';
import { MainContainer } from '../../../components/mainContainer';
// reducer
import {
  changePasswordStatesInitialState,
  changePasswordStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate } from 'react-router-dom';
// services
import { changePasswordService } from '../../../services/settingsServicce';

/***************************************************************************/
/* Name : ChangePassword React Component */
/***************************************************************************/
const ChangePassword = React.memo(() => {
  const navigate = useNavigate();
  // refs
  const currentPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  // reducer
  const [changePasswordStates, dispatchChangePasswordStates] = useReducer(
    changePasswordStatesReducer,
    changePasswordStatesInitialState
  );

  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);
  /******************************************************************/
  /* validate input */
  /******************************************************************/
  const validateInput = (currentPassword, password, passwordConfirm) => {
    // validate
    if (currentPassword.trim() === '') {
      currentPasswordRef.current.activeError();
      // dispatch states
      dispatchChangePasswordStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة السر',
      });
      return false;
    } else {
      currentPasswordRef.current.clearError();
    }
    if (password.trim() === '') {
      passwordRef.current.activeError();
      // dispatch states
      dispatchChangePasswordStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة السر',
      });
      return false;
    } else {
      passwordRef.current.clearError();
    }
    if (passwordConfirm.trim() === '') {
      passwordConfirmRef.current.activeError();
      // dispatch states
      dispatchChangePasswordStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة السر',
      });
      return false;
    } else {
      passwordConfirmRef.current.clearError();
    }
    if (password.trim() !== passwordConfirm.trim()) {
      passwordConfirmRef.current.activeError();
      // dispatch states
      dispatchChangePasswordStates({
        type: 'ERROR',
        errorMessage: 'كلمة السر غير متطابقة',
      });
      return false;
    } else {
      passwordConfirmRef.current.clearError();
    }
    // check password length
    if (password.trim().length < 8) {
      passwordRef.current.activeError();
      // dispatch states
      dispatchChangePasswordStates({
        type: 'ERROR',
        errorMessage: 'كلمة السر يجب ان تكون على الاقل 8 احرف',
      });
      return false;
    } else {
      passwordRef.current.clearError();
    }
    return true;
  };
  /******************************************************************/
  /* login Handler */
  /******************************************************************/
  const changePasswordHandler = async () => {
    // dispatch states
    dispatchChangePasswordStates({ type: 'PENDING' });
    const passwordCurrent = currentPasswordRef.current.getInputValue();
    const password = passwordRef.current.getInputValue();
    const passwordConfirm = passwordConfirmRef.current.getInputValue();

    // validate input
    const isValid = validateInput(passwordCurrent, password, passwordConfirm);
    if (isValid) {
      const response = await changePasswordService(
        passwordCurrent,
        password,
        passwordConfirm
      );
      if (response.status === 'success') {
        // dispatch states
        dispatchChangePasswordStates({
          type: 'SUCCESS',
          successMessage: 'تم تغيير كلمة السر بنجاح',
        });
        // navigate to dashboard
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // dispatch states
        dispatchChangePasswordStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
      return;
    }
  };

  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchChangePasswordStates({ type: 'CLEAR' });
  };
  return (
    <Fragment>
      {<NavHeader title={'تغيير كلمة السر'} />}
      {/* login box */}
      <MainContainer>
        <div className={styles['login-box']}>
          <Input
            title={' كلمة السر الحالية'}
            type='PASSWORD'
            ref={currentPasswordRef}
          />
          <p>
            <span className={styles['login-box-title']}> ملحوظة:</span>
            كلمة السر يجب ان تكون على الاقل 8 احرف و تحتوي على ارقام وحروف
          </p>
          <Input
            title={' كلمة السر الجديدة'}
            type='PASSWORD'
            ref={passwordRef}
          />
          <Input
            title={'اعد كتابة كلمة السر'}
            type='PASSWORD'
            ref={passwordConfirmRef}
          />
          <br />
          {changePasswordStates.pending && (
            <BtnSmall
              title={
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#a18a00',
                  }}
                />
              }
              onClick={changePasswordHandler}
            />
          )}
          {!changePasswordStates.pending && (
            <BtnSmall
              title={'تغيير كلمة السر'}
              onClick={changePasswordHandler}
            />
          )}
        </div>
      </MainContainer>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={changePasswordStates.error}
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
          !{changePasswordStates.errorMessage}
        </Alert>
      </Snackbar>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={changePasswordStates.success}
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
          !{changePasswordStates.successMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default ChangePassword;
