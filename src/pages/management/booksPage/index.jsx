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
import { BookItem } from '../../../components/managementItems/bookItem';
import { NavHeader } from '../../../components/navHeader';
import { Message } from '../../../components/message';
import { Input } from '../../../components/inputs/InputField';
import { BtnSmall } from '../../../components/btns/btnSmall';
// imgs
import SearchIcon from '../../../assets/icons/icons8_search.png';
// reducer
import {
  componentStatesInitialState,
  componentStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
  // pagination
  const [pageSelected, setPageSelected] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [limit, setLimit] = useState(50);
  // search type states
  const [searchType, setSearchType] = useState('اختر نوع البحث');
  const [searchTypeData, setSearchTypeData] = useState([
    { value: 1, title: 'كود المقرر' },
    { value: 2, title: 'كلية المقرر' },
    { value: 3, title: ' اسم الملف' },
    { value: 4, title: 'اسم الدكتور' },
    { value: 5, title: 'الرقم القومي للدكتور ' },
  ]);
  const [searchTypeData2, setSearchTypeData2] = useState('all');
  const [filterationData, setFilterationData] = useState([
    { value: 'all', title: 'الكل' },
    { value: 'accepted', title: 'تمت الموافقة' },
    { value: 'rejected', title: 'تم الرفض' },
    { value: 'pending', title: 'في الانتظار' },
  ]);
  const searchRef = useRef(null);
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
      // calculate number of pages
      // get all books
      await getAllBookHandler({}, pageSelected);
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
  const getAllBookHandler = async (data, page) => {
    dispatchBooksPageStates({ type: 'PENDING' });
    const response = await getAllBooksService(data, page, limit);
    if (response.status === 'success') {
      setBooks(response.books);
      // calculate number of pages
      const numberOfPages = Math.ceil(response.length / limit);
      setNumberOfPages(numberOfPages);
      // dispatch clear
      dispatchBooksPageStates({ type: 'CLEAR' });
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
  /******************************************************************/
  /* searchForBooksHandler */
  /******************************************************************/
  const searchForBooksHandler = async (
    status = undefined,
    skipValidation = false,
    page = 1
  ) => {
    if (!skipValidation && searchType === 'اختر نوع البحث') {
      dispatchBooksPageStates({
        type: 'ERROR',
        errorMessage: 'يجب اختيار نوع البحث اولا',
      });
      return;
    }
    if (!skipValidation && searchRef.current.getInputValue().trim() === '') {
      dispatchBooksPageStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة البحث',
      });
      return;
    }
    let data = {
      status: status === 'all' ? undefined : status,
    };
    if (+searchType === 1) {
      data = {
        courseCode: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 2) {
      data = {
        ...data,
        courseFaculty: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 3) {
      data = {
        ...data,
        materialName: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 4) {
      data = {
        ...data,
        doctorName: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 5) {
      data = {
        ...data,
        doctorNationalId: searchRef.current.getInputValue().trim(),
      };
    }

    await getAllBookHandler(data, page);
  };

  /******************************************************************/
  /* pagination handler */
  /******************************************************************/
  const paginationHandler = async (e, page) => {
    setPageSelected(page);
    await searchForBooksHandler(setSearchTypeData2, true, page);
  };
  return (
    <Fragment>
      <NavHeader title='الكتب' />
      <br />
      <MainContainer>
        <div className={styles['search-container']}>
          <div className={styles['part']}>
            <div className={styles['form-control-special']}>
              <select
                id='nationality'
                name='nationality'
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
              >
                <option value={'اختر نوع البحث'}>اختر نوع البحث</option>
                {searchTypeData.map((el) => (
                  <option value={el.value} key={el.value}>
                    {el.title}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type='search'
              placeholder={'اختر نوع البحث اولا'}
              wd='md'
              ref={searchRef}
            >
              اختر الكلية
            </Input>
            <BtnSmall
              icon={SearchIcon}
              onClick={() => {
                setPageSelected(1);
                searchForBooksHandler(searchTypeData2, false, 1);
              }}
            />
          </div>
          <div className={styles['part']}>
            {' '}
            <div className={styles['form-control-special']}>
              <select
                id='nationality'
                name='nationality'
                value={searchTypeData2}
                onChange={(e) => {
                  setSearchTypeData2(e.target.value);
                  setPageSelected(1);
                  searchForBooksHandler(e.target.value, true, 1);
                }}
              >
                {filterationData.map((el) => (
                  <option value={el.value} key={el.value}>
                    {el.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <br />
        {books.length > 0 && (
          <div className={styles['pagination-container']}>
            <Stack spacing={2}>
              <Pagination
                count={+numberOfPages}
                page={pageSelected}
                color='primary'
                size='large'
                dir='ltr'
                onChange={paginationHandler}
              />
            </Stack>
          </div>
        )}
        {!componentStates.pending && (
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
                      role === 'ADMIN'
                        ? book.adminStatus
                        : book.publisherStatus,
                    faculty: book.courseFaculty,
                    department: book.courseDepartment,
                  }}
                />
              );
            })}
          </div>
        )}
        {books.length > 0 && (
          <div className={styles['pagination-container']}>
            <Stack spacing={2}>
              <Pagination
                count={+numberOfPages}
                page={pageSelected}
                color='primary'
                size='large'
                dir='ltr'
                onChange={paginationHandler}
              />
            </Stack>
          </div>
        )}
        <div className={styles['message-container']}>
          {books.length === 0 && <Message text={'لا يوجد كتب'} type='info' />}
          {componentStates.pending && (
            <Message text={'يتم تحميل الكتب'} type='load' />
          )}
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
