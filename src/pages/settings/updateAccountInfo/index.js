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
// reducer
import {
  updateAccoundInfoStatesInitialState,
  updateAccoundInfoStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate } from 'react-router-dom';
// services
import { updateAccountInfoService, getMe } from '../../../services/userService';
// get role
import { getRoleService } from '../../../services/userService';
/***************************************************************************/
/* Name : UpdateAccountInfo React Component */
/***************************************************************************/
const UpdateAccountInfo = React.memo(() => {
  const navigate = useNavigate();
  // refs
  const nameRef = useRef();
  const userNameRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  // reducer
  const [updateAccoundInfoStates, dispatchUpdateAccoundInfoStates] = useReducer(
    updateAccoundInfoStatesReducer,
    updateAccoundInfoStatesInitialState
  );
  // role state
  const [role, setRole] = useState('SUPERADMIN'); // NOT ADMIN PUBLISHER SUPERADMIN
  const [passwordChanged, setPasswordChanged] = useState(false); // true false
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      // get role
      // const { role } = await getRoleService();
      // const { passwordChanged } = await getRoleService();
      // setRole(role);
      // setPasswordChanged(passwordChanged);
      // get me
      // await getMeHandler();
    })();
  }, []);
  /******************************************************************/
  /* getMe */
  /******************************************************************/
  const getMeHandler = async () => {
    const response = await getMe();
    if (response.status === 'success') {
      const data = response.data;
      nameRef.current.setInputValue(data.name);
      userNameRef.current.setInputValue(data.userName);
      phoneNumberRef.current.setInputValue(data.phoneNumber);
    }
  };
  /******************************************************************/
  /* validate input */
  /******************************************************************/
  const validateInput = (name, userName, phoneNumber, password) => {
    // validate
    if (name === '') {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: 'الاسم لا يمكن ان يكون فارغ',
      });
      // activate error
      nameRef.current.activeError();
      return false;
    } else {
      nameRef.current.clearError();
    }

    if (userName === '') {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: 'اسم المستخدم لا يمكن ان يكون فارغ',
      });
      // activate error
      userNameRef.current.activeError();
      return false;
    } else {
      userNameRef.current.clearError();
    }
    if (userName.trim().length < 5) {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: 'اسم المستخدم يجب ان يكون 5 احرف على الاقل',
      });
      // activate error
      userNameRef.current.activeError();
      return false;
    } else {
      userNameRef.current.clearError();
    }

    if (phoneNumber === '') {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: 'رقم الموبايل لا يمكن ان يكون فارغ',
      });
      // activate error
      phoneNumberRef.current.activeError();
      return false;
    } else {
      phoneNumberRef.current.clearError();
    }

    // check password
    if (password === '') {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: 'كلمة السر لا يمكن ان تكون فارغة',
      });
      // activate error
      passwordRef.current.activeError();
      return false;
    } else {
      passwordRef.current.clearError();
    }

    return true;
  };
  /******************************************************************/
  /* login Handler */
  /******************************************************************/
  const updateAccoundInfoHandler = async () => {
    // get input value
    const name = nameRef.current.getInputValue();
    const userName = userNameRef.current.getInputValue();
    const phoneNumber = phoneNumberRef.current.getInputValue();
    const password = passwordRef.current.getInputValue();
    // validate input
    const isValid = validateInput(name, userName, phoneNumber, password);
    if (!isValid) {
      return;
    }
    // calling reducer
    dispatchUpdateAccoundInfoStates({ type: 'PENDING' });
    // construct data
    const data = {
      name,
      userName,
      phoneNumber,
      password,
    };
    // calling service
    const response = await updateAccountInfoService(data);
    if (response.status === 'success') {
      dispatchUpdateAccoundInfoStates({
        type: 'SUCCESS',
        successMessage: 'تم تعديل البيانات بنجاح',
      });
    } else {
      dispatchUpdateAccoundInfoStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };

  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchUpdateAccoundInfoStates({ type: 'CLEAR' });
  };
  return (
    <Fragment>
      {<NavHeader title={'تحديث بيانات الحساب'} />}
      {/* login box */}
      {((role === 'ADMIN' && passwordChanged === false) ||
        role === 'SUPERADMIN') && (
        <div className={styles['login-box']}>
          <Input title={'الاسم'} type='text' ref={nameRef} />
          <Input title={'اسم المستخدم'} type='text' ref={userNameRef} />
          <Input title={' الموبايل'} type='text' ref={phoneNumberRef} />
          <p>
            <span className={styles['login-box-title']}> ملحوظة:</span>
            الرجاء ادخال كلمة السر للتأكيد
          </p>
          <Input title={'كلمة السر'} type='password' ref={passwordRef} />
          <br />
          {updateAccoundInfoStates.pending && (
            <BtnSmall
              title={
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#a18a00',
                  }}
                />
              }
              onClick={updateAccoundInfoHandler}
            />
          )}
          {!updateAccoundInfoStates.pending && (
            <BtnSmall title={'تحديث'} onClick={updateAccoundInfoHandler} />
          )}
        </div>
      )}
      {role === 'ADMIN' && role !== 'NOT' && passwordChanged === true && (
        <Message text='لا يمكنك الوصول لهذه الصفحة' type='error' />
      )}
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={updateAccoundInfoStates.error}
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
          !{updateAccoundInfoStates.errorMessage}
        </Alert>
      </Snackbar>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={updateAccoundInfoStates.success}
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
          !{updateAccoundInfoStates.successMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default UpdateAccountInfo;
