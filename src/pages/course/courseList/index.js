// react
import React, { Fragment, useEffect, useReducer, useRef } from 'react';
// styles
import styles from './index.module.scss';
// components
import { CourseFolder } from '../../../components/coursesItems/courseFolder';
import { InfoBar } from '../../../components/coursesItems/infoBar';
import { NavHeader } from '../../../components/navHeader';
import { MainContainer } from '../../../components/mainContainer';
// reducer
import {
  coursesListStatesInitialState,
  coursesListStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// router
import { useNavigate } from 'react-router-dom';

/***************************************************************************/
/* Name : CourseList React Component */
/***************************************************************************/
const CourseList = React.memo(() => {
  const navigate = useNavigate();
  // reducer
  const [courseListStates, dispatchCourseListStates] = useReducer(
    coursesListStatesReducer,
    coursesListStatesInitialState
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
    dispatchCourseListStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* navigate sublist */
  /******************************************************************/
  const navigateSubList = (name, code) => {
    navigate(`/course/${name}/${code}`);
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
        <div className={styles['courses-container']}>
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: 'C-124344',
              courseName: 'معالجة الاشارات الرقمية',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: 'C-124344',
              courseName: 'معالجة الاشارات الرقمية',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: 'C-124344',
              courseName: 'معالجة الاشارات الرقمية',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: 'C-124344',
              courseName: 'معالجة الاشارات الرقمية',
            }}
          />
        </div>
      </MainContainer>

      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={courseListStates.success}
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
          !{courseListStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={courseListStates.error}
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
          !{courseListStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default CourseList;
