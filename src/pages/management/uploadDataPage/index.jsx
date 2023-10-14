// react
import React, { Fragment, useEffect, useReducer, useState } from 'react';
// styles
import styles from './index.module.scss';
// components
import { MainContainer } from '../../../components/mainContainer';
import { InputFileWide } from '../../../components/inputs/inputFileWide';
import { NavHeader } from '../../../components/navHeader';
import { Message } from '../../../components/message';
// libs
import FormData from 'form-data';
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
// services
import {
  getRoleService,
  uploadDoctorService,
  uploadCoursesService,
} from '../../../services/adminService';
import { getFacultiesService } from '../../../services/adminsManagementService';
/***************************************************************************/
/* Name : UploadData React Component */
/***************************************************************************/
const UploadData = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // roles
  const [role, setRole] = useState('NOT'); // NOT ADMIN PUBLISHER SUPERADMIN
  // reducer
  const [uploadDataStates, dispatchUploadDataStates] = useReducer(
    componentStatesReducer,
    componentStatesInitialState
  );
  // faculty
  const [facultySelected, setFacultySelected] = useState('اختر الكلية');
  const [facultiesData, setFacultiesData] = useState([]);
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      // get role
      const { role } = await getRoleService();
      setRole(role);
      // get faculties
      await getFacultiesHandler();
    })();
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
  const uploadDoctorsDataHandler = async (file) => {
    dispatchUploadDataStates({ type: 'PENDING-DOCTORS' });
    const formData = new FormData();
    if (role === 'SUPERADMIN') {
      // check if faculty selected
      if (facultySelected === 'اختر الكلية') {
        dispatchUploadDataStates({
          type: 'ERROR',
          errorMessage: 'يجب اختيار الكلية',
        });
        return;
      }
      formData.append('faculty', facultySelected);
    }
    formData.append('file', file);
    const response = await uploadDoctorService(formData);
    if (response.status === 'success') {
      dispatchUploadDataStates({
        type: 'SUCCESS',
        successMessage: response.message,
      });
    } else {
      dispatchUploadDataStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /*********************************************************************/
  /* getFacultiesHandler */
  /*********************************************************************/
  const getFacultiesHandler = async () => {
    const response = await getFacultiesService();
    if (response.status === 'success') {
      setFacultiesData(response.data);
    } else {
      //dispacth errors
      dispatchUploadDataStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* uploadCourses */
  /******************************************************************/
  const uploadCoursesHandler = async (file) => {
    dispatchUploadDataStates({ type: 'PENDING-COURSES' });
    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadCoursesService(formData);
    if (response.status === 'success') {
      dispatchUploadDataStates({
        type: 'SUCCESS',
        successMessage: response.message,
      });
    } else {
      dispatchUploadDataStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  return (
    <Fragment>
      <NavHeader title='رفع البيانات' />

      {role !== 'PUBLISHER' && role !== 'NOT' && (
        <MainContainer>
          <br />
          <br />
          <div className={styles['upload-item']}>
            <div className={styles['upload-item__title']}>
              رفع بيانات الدكاترة
            </div>
            <div className={styles['upload-item__content']}>
              {role === 'SUPERADMIN' && role !== 'NOT' && (
                <div className={styles['form-control']}>
                  <h3>الكلية</h3>
                  <select
                    id='faculty'
                    name='faculty'
                    value={facultySelected}
                    onChange={(e) => {
                      setFacultySelected(e.target.value);
                    }}
                  >
                    <option value={'اختر الكلية'}>اختر الكلية</option>
                    {facultiesData.map((el) => (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <InputFileWide
                onClick={uploadDoctorsDataHandler}
                tag={'doctors'}
                pending={uploadDataStates.pendingDoctors}
              />
            </div>
          </div>
          <br />
          {role === 'SUPERADMIN' && role !== 'NOT' && (
            <div className={styles['upload-item']}>
              <div className={styles['upload-item__title']}>
                رفع بيانات المقررات
              </div>
              <div className={styles['upload-item__content']}>
                <InputFileWide
                  onClick={uploadCoursesHandler}
                  tag={'courses'}
                  pending={uploadDataStates.pendingCourses}
                />
              </div>
            </div>
          )}
        </MainContainer>
      )}
      {role !== 'SUPERADMIN' && role !== 'ADMIN' && role !== 'NOT' && (
        <Message text={'لا يمكنك الوصول لهذه الصفحة'} type='error' />
      )}
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
