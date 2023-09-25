// react
import React, { Fragment, useEffect, useReducer, useRef } from 'react';

// styles
import styles from './index.module.scss';
// components
import { CourseFolder } from '../../../components/coursesItems/courseFolder';
import { InfoBar } from '../../../components/coursesItems/infoBar';
import { NavHeader } from '../../../components/navHeader';
import { MainContainer } from '../../../components/mainContainer';
import { PathNavigate } from '../../../components/coursesItems/PathNavigate';
// reducer
import {
  courseSubListStatesReducer,
  courseSubListStatesInitialState,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';

/***************************************************************************/
/* Name : CourseSubList React Component */
/***************************************************************************/
const CourseSubList = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // params
  const { name, code } = useParams();
  // reducer
  const [courseSubListStates, dispatchCourseSubListStates] = useReducer(
    courseSubListStatesReducer,
    courseSubListStatesInitialState
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
    dispatchCourseSubListStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* navigate sublist */
  /******************************************************************/
  const navigateSubList = (type, coded) => {
    navigate(`/course/${name}/${code}/${type}`);
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
        <PathNavigate course={{ name, code }} slugs={[]} />
        <div className={styles['courses-container']}>
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: '',
              courseName: 'Books',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: '',
              courseName: 'Slides',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: '',
              courseName: 'Sheets',
            }}
          />
          <CourseFolder
            onClick={navigateSubList}
            info={{
              courseCode: '',
              courseName: 'Others',
            }}
          />
        </div>
      </MainContainer>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={courseSubListStates.success}
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
          !{courseSubListStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={courseSubListStates.error}
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
          !{courseSubListStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default CourseSubList;
