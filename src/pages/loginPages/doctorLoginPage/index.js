// react
import React, { Fragment, useEffect, useReducer, useRef } from 'react';

// styles
import styles from './index.module.scss';

// components
import { NavHeader } from '../../../components/navHeader/index';
import { Input } from '../../../components/inputs/InputField/index';
import { BtnSmall } from '../../../components/btns/btnSmall/index';
// reducer
import {
  loginPageStatesInitialState,
  loginPageStatesReducer,
} from './indexReducer';

// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate } from 'react-router-dom';
// services
import { loginRequest } from '../../../services/adminService';
/***************************************************************************/
/* Name : LoginPage React Component */
/***************************************************************************/
const LoginPage = React.memo(() => {
  const navigate = useNavigate();
  // refs
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  // reducer
  const [loginPageStates, dispatchLoginPageStates] = useReducer(
    loginPageStatesReducer,
    loginPageStatesInitialState
  );
  /******************************************************************/
  /* validate input */
  /******************************************************************/
  const validateInput = (userName, password) => {
    // validate
    if (userName.trim() === '') {
      userNameRef.current.activeError();
      // dispatch states
      dispatchLoginPageStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال اسم المستخدم',
      });
      return false;
    } else {
      userNameRef.current.clearError();
    }

    if (password.trim() === '') {
      passwordRef.current.activeError();
      // dispatch states
      dispatchLoginPageStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة السر',
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
  const loginHandler = async (e) => {
    // prevent default
    e.preventDefault();
    // get values
    const userName = userNameRef.current.getInputValue();
    const password = passwordRef.current.getInputValue();
    // validate
    const isValid = validateInput(userName, password);
    if (!isValid) {
      return;
    }
    // dispatch states
    dispatchLoginPageStates({ type: 'PENDING' });
    // calling login request
    const response = await loginRequest(userName, password);
    if (response.status === 'success') {
      // dispatch states
      dispatchLoginPageStates({ type: 'SUCCESS' });
      if (response.user.passwordChanged === true) {
        // redirect to dashboard
        navigate('/admin/studentsInfo');
      } else {
        // redirect to change password
        navigate('/admin/changePassword');
      }
    } else {
      // dispatch states
      dispatchLoginPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchLoginPageStates({ type: 'CLEAR' });
  };
  return (
    <Fragment>
      {<NavHeader title={'تسجيل الدخول'} mode={'title'} />}
      {/* login box */}
      <form className={styles['login-box']} onSubmit={loginHandler}>
        <Input title={'اسم المستخدم'} type='TEXT' ref={userNameRef} />
        <Input title={'كلمة السر'} type='PASSWORD' ref={passwordRef} />
        <br />
        {loginPageStates.pending && (
          <BtnSmall
            title={
              <CircularProgress
                size={20}
                sx={{
                  color: '#a18a00',
                }}
              />
            }
          />
        )}
        {!loginPageStates.pending && <BtnSmall title={'دخول'} />}
      </form>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={loginPageStates.error}
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
          !{loginPageStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default LoginPage;
