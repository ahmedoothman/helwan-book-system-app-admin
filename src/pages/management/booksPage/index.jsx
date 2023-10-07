// react
import React, { Fragment, useEffect, useReducer, useState } from 'react';
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
import {
  getRoleService,
  getAllBooksService,
  changeBookStatusService,
} from '../../../services/adminService';
// react-redux;
import { useSelector } from 'react-redux';
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
  // role
  const [role, setRole] = useState('NOT');
  // states
  const [books, setBooks] = useState([]);
  // api_url
  const [apiUrl, dispatchApiUrl] = useState(
    useSelector((state) => state.ui.api_url)
  );
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      const { role } = await getRoleService();
      setRole(role);
      // get all books
      await getAllBookHandler();
    })();
  }, []);
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchBooksPageStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* getAllBookHandler */
  /******************************************************************/
  const getAllBookHandler = async () => {
    dispatchBooksPageStates({ type: 'PENDING' });
    const response = await getAllBooksService();
    if (response.status === 'success') {
      setBooks(response.books);
    } else {
      dispatchBooksPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* viewBookHandler */
  /******************************************************************/
  const viewBookHandler = (path) => {
    console.log('view : ' + `${apiUrl}/${path}`);
    window.open(`${apiUrl}/${path}`, '_blank');
  };
  /******************************************************************/
  /* approveBookHandler */
  /******************************************************************/
  const approveBookHandler = async (bookId) => {
    dispatchBooksPageStates({ type: 'PENDING' });
    const response = await changeBookStatusService(bookId, 'accepted');
    if (response.status === 'success') {
      dispatchBooksPageStates({
        type: 'SUCCESS',
        successMessage: 'تمت الموافقة على الكتاب بنجاح',
      });
      await getAllBookHandler();
    } else {
      dispatchBooksPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* rejectBookHandler */
  /******************************************************************/
  const rejectBookHandler = async (bookId) => {
    dispatchBooksPageStates({ type: 'PENDING' });
    const response = await changeBookStatusService(bookId, 'rejected');
    if (response.status === 'success') {
      dispatchBooksPageStates({
        type: 'SUCCESS',
        successMessage: 'تم رفض الكتاب بنجاح',
      });
      await getAllBookHandler();
    } else {
      dispatchBooksPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  return (
    <Fragment>
      <NavHeader title='الكتب' />
      <br />
      <MainContainer>
        <div className={styles['books-list']}>
          {books.map((book) => {
            return (
              <BookItem
                viewBookHandler={viewBookHandler}
                approveBookHandler={approveBookHandler}
                rejectBookHandler={rejectBookHandler}
                key={book._id}
                book={{
                  ...book,
                  status:
                    role === 'ADMIN' ? book.adminStatus : book.publisherStatus,
                  doctorName: 'محمد عبد الرحمن',
                  courseName: 'البرمجة المتقدمة',
                  faculty: 'العلوم',
                  department: 'علوم الحاسب',
                }}
              />
            );
          })}
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
