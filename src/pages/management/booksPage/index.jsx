// react
import React, { Fragment, useEffect, useReducer, useRef } from 'react';
// styles
import styles from './index.module.scss';
// components
import { MainContainer } from '../../../components/mainContainer';
import { BookItem } from '../../../components/managementItems/bookItem';
import { NavHeader } from '../../../components/navHeader';
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
// import { apiServices } from '../../../services/apiServices';
/***************************************************************************/
/* Name : BooksPage React Component */
/***************************************************************************/
const BooksPage = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // reducer
  const [componentStates, dispatchBooksPageStates] = useReducer(
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
    dispatchBooksPageStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* functions */
  /******************************************************************/
  return (
    <Fragment>
      <NavHeader title='الكتب' />
      <br />
      <MainContainer>
        <div className={styles['books-list']}>
          <BookItem />
          <BookItem />
          <BookItem />
        </div>
      </MainContainer>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={componentStates.success}
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
          !{componentStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={componentStates.error}
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
          !{componentStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default BooksPage;
