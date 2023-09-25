// react
import React, { Fragment, useEffect, useReducer, useState } from 'react';

// styles
import styles from './index.module.scss';
// components
import { InfoBar } from '../../../components/coursesItems/infoBar';
import { NavHeader } from '../../../components/navHeader';
import { BtnSmall } from '../../../components/btns/btnSmall';
import { FormPopUp } from '../../../components/formPopUp';
import { MainContainer } from '../../../components/mainContainer';
import { PathNavigate } from '../../../components/coursesItems/PathNavigate';
// reducer
import {
  courseContentStatesReducer,
  courseContentStatesInitialState,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate, useParams } from 'react-router-dom';
// icons
import Arrow from '../../../assets/icons/arrow.svg';
import Eye from '../../../assets/icons/eye.svg';
import Delete from '../../../assets/icons/Delete.svg';
/***************************************************************************/
/* Name : CourseContent React Component */
/***************************************************************************/
const CourseContent = React.memo(() => {
  const navigate = useNavigate();
  // params
  const { name, code, type } = useParams();
  const [role, setRole] = useState('DOCTOR');
  // confirm delete state
  const [confirmDeleteForm, setConfirmDeleteForm] = useState(false);
  // item name
  const [itemName, setItemName] = useState('ملف');
  // file
  const [file, setFile] = useState(null);
  // reducer
  const [courseContentStates, dispatchCourseContentStates] = useReducer(
    courseContentStatesReducer,
    courseContentStatesInitialState
  );
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);
  // close confirm delete form
  const handleCloseConfirmForm = () => {
    setConfirmDeleteForm(false);
  };
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchCourseContentStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* view */
  /******************************************************************/
  const viewHandler = (itemId) => {
    // api call to get pdf
    // navigate to pdf view page
    navigate(`/course/${name}/${code}/${type}/${itemId}`);
  };
  /******************************************************************/
  /* delete */
  /******************************************************************/
  const deleteHandler = (itemNameA) => {
    // open confirm delete form
    setConfirmDeleteForm(true);
    // set item name
    setItemName(itemNameA);
  };
  /******************************************************************/
  /* deleteCouserItemHandler */
  /******************************************************************/
  const deleteCouserItemHandler = () => {
    // api call
  };
  return (
    <Fragment>
      <NavHeader title={'المقررات الدراسية'} />
      <MainContainer>
        <InfoBar
          info={{
            name: 'احمد عثمان علي',
            role: 'STUDENT',
            faculty: 'الحاسبات والمعلومات',
            department: 'علوم الحاسب',
            level: 'الفرقة الثانية',
          }}
        />

        <PathNavigate course={{ name, code }} slugs={[type]} />
        {role === 'DOCTOR' && (
          <form className={styles['upload-container']}>
            <input
              type='file'
              name='file'
              id='file'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <div className={styles['upload-btn']}>
              <label for='file'>اختر ملف</label>
              <p>
                {file
                  ? file.name.length > 20
                    ? file.name.slice(0, 20) + '...'
                    : file.name
                  : 'لم يتم اختيار ملف'}
              </p>
            </div>
            <BtnSmall title={'رفع'} />
          </form>
        )}
        <div className={styles['list-container']}>
          <table className={styles['table']}>
            <tr>
              <th>الاسم</th>
              <th>الحجم</th>
              {role === 'DOCTOR' && <th>الحالة</th>}
              <th>:</th>
            </tr>
            <tr>
              <td>محاضرة 1</td>
              <td>1.5 MB</td>
              {role === 'DOCTOR' && <td>تمت الموافقة 🟢</td>}
              <td>
                <img
                  src={Eye}
                  onClick={() => {
                    viewHandler('33');
                  }}
                />
                {role === 'DOCTOR' && (
                  <img
                    src={Delete}
                    onClick={() => {
                      deleteHandler('محاضرة s');
                    }}
                  />
                )}
              </td>
            </tr>
          </table>
        </div>
      </MainContainer>{' '}
      {/* ********** open Confirmation Form  confirmDeleteForm ********** */}
      <FormPopUp open={confirmDeleteForm} handleClose={handleCloseConfirmForm}>
        <div className={styles['confirm-input']}>
          <h2>هل تريد مسح {itemName} ؟</h2>
          <div className={styles['btns-group']}>
            <button
              onClick={handleCloseConfirmForm}
              className={`${styles['btn']} ${styles['normal']}`}
            >
              لا
            </button>
            <button
              onClick={deleteCouserItemHandler}
              className={`${styles['btn']} ${styles['danger']}`}
            >
              نعم
            </button>
          </div>
        </div>
      </FormPopUp>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={courseContentStates.success}
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
          !{courseContentStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={courseContentStates.error}
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
          !{courseContentStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default CourseContent;
