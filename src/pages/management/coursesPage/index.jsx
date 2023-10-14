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
import { CourseItem } from '../../../components/managementItems/courseItem';
import { NavHeader } from '../../../components/navHeader';
import { Message } from '../../../components/message';
import { Input } from '../../../components/inputs/InputField';
import { BtnSmall } from '../../../components/btns/btnSmall';
import { FormPopUp } from '../../../components/formPopUp';
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
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// services
import {
  getRoleService,
  getAllCoursesServices,
  deleteCourseServices,
} from '../../../services/adminService';
import { getFacultiesService } from '../../../services/adminsManagementService';

/***************************************************************************/
/* Name : CoursesPage React Component */
/***************************************************************************/
const CoursesPage = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // reducer
  const [componentStates, dispatchCoursesPageStates] = useReducer(
    componentStatesReducer,
    componentStatesInitialState
  );
  // faculty
  const [facultySelected, setFacultySelected] = useState('الكل');
  const [facultiesData, setFacultiesData] = useState([]);
  // role
  const [role, setRole] = useState('NOT');
  // confirm delete form
  const [confirmDeleteForm, setConfirmDeleteForm] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ name: 'temp', id: 'temp' });
  // data length
  const [dataLength, setDataLength] = useState(0);
  // states
  const [courses, setCourses] = useState([]);
  // search type states
  const [searchType, setSearchType] = useState('اختر نوع البحث');
  const [searchTypeData, setSearchTypeData] = useState([
    { value: 1, title: 'اسم المقرر' },
    { value: 2, title: 'كود القومي' },
  ]);
  const searchRef = useRef(null);

  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      const { role } = await getRoleService();
      setRole(role);
      // get all courses
      await getAllCoursesHandler({});
      // get faculties
      await getFacultiesHandler();
    })();
  }, []);
  /*********************************************************************/
  /* getFacultiesHandler */
  /*********************************************************************/
  const getFacultiesHandler = async () => {
    const response = await getFacultiesService();
    if (response.status === 'success') {
      setFacultiesData(response.data);
    } else {
      //dispacth errors
      dispatchCoursesPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchCoursesPageStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* handleCloseConfirmForm */
  /******************************************************************/
  const handleCloseConfirmForm = () => {
    setConfirmDeleteForm(false);
  };
  /******************************************************************/
  /* getAllCoursesHandler */
  /******************************************************************/
  const getAllCoursesHandler = async (data) => {
    dispatchCoursesPageStates({ type: 'PENDING' });
    const response = await getAllCoursesServices(data);
    if (response.status === 'success') {
      setCourses(response.courses);
      setDataLength(response.total);
      dispatchCoursesPageStates({ type: 'CLEAR' });
    } else {
      dispatchCoursesPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };

  /******************************************************************/
  /* searchForcoursesHandler */
  /******************************************************************/
  const searchForcoursesHandler = async (
    faculty = undefined,
    skipValidation
  ) => {
    if (!skipValidation && searchType === 'اختر نوع البحث') {
      dispatchCoursesPageStates({
        type: 'ERROR',
        errorMessage: 'يجب اختيار نوع البحث اولا',
      });
      return;
    }
    if (!skipValidation && searchRef.current.getInputValue().trim() === '') {
      dispatchCoursesPageStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال كلمة البحث',
      });
      return;
    }
    let data = {
      faculty: faculty === 'الكل' ? undefined : faculty,
    };
    if (+searchType === 1) {
      data = {
        ...data,
        name: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 2) {
      data = {
        ...data,
        code: searchRef.current.getInputValue().trim(),
      };
    }

    await getAllCoursesHandler(data);
  };
  /******************************************************************/
  /* deleteDoctorHandler */
  /******************************************************************/
  const deleteDoctorHandler = async () => {
    dispatchCoursesPageStates({ type: 'PENDING' });
    const response = await deleteCourseServices(deletedItem.id);
    if (response.status === 'success') {
      dispatchCoursesPageStates({
        type: 'SUCCESS',
        successMessage: response.message,
      });
      setConfirmDeleteForm(false);
      // remove deleted item from courses
      const newcourses = courses.filter((doctor) => {
        return doctor._id !== deletedItem.id;
      });
      setCourses(newcourses);
      // reduce data length
      setDataLength((prev) => prev - 1);
    } else {
      dispatchCoursesPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  return (
    <Fragment>
      <NavHeader title='المقررات' />
      <br />
      {role === 'SUPERADMIN' && role !== 'NOT' && (
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
                الكل
              </Input>
              <BtnSmall icon={SearchIcon} onClick={searchForcoursesHandler} />
            </div>
            <div className={styles['part']}>
              <div className={styles['form-control']}>
                <h3>الكلية</h3>
                <select
                  id='faculty'
                  name='faculty'
                  value={facultySelected}
                  onChange={(e) => {
                    setFacultySelected(e.target.value);
                    searchForcoursesHandler(e.target.value, true);
                  }}
                >
                  <option value={'الكل'}>الكل</option>
                  {facultiesData.map((el) => (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <br />
          <div className={styles['infos']}>
            <div className={styles['info']}>
              <h3>عدد المقررات </h3>
              <p>{dataLength}</p>
            </div>
          </div>
          {!componentStates.pending && (
            <div className={styles['courses-list']}>
              {courses.map((doctor) => {
                return (
                  <CourseItem
                    key={doctor._id}
                    data={doctor}
                    onDeleteHandler={() => {
                      setConfirmDeleteForm(true);
                      setDeletedItem({ name: doctor.name, id: doctor._id });
                    }}
                  />
                );
              })}
            </div>
          )}
          <div className={styles['message-container']}>
            {courses.length === 0 && (
              <Message text={'لا يوجد كتب'} type='info' />
            )}
            {componentStates.pending && (
              <Message text={'يتم تحميل الكتب'} type='load' />
            )}
          </div>
        </MainContainer>
      )}
      {role !== 'SUPERADMIN' && role !== 'NOT' && (
        <Message text={'لا يمكنك الوصول لهذه الصفحة'} type='error' />
      )}
      {/* ********** open Confirmation Form  confirmDeleteForm ********** */}
      <FormPopUp open={confirmDeleteForm} handleClose={handleCloseConfirmForm}>
        <div className={styles['confirm-input']}>
          <h2>هل تريد مسح {deletedItem.name}؟</h2>
          <div className={styles['btns-group']}>
            <button
              onClick={handleCloseConfirmForm}
              className={`${styles['btn']} ${styles['normal']}`}
            >
              لا
            </button>
            <button
              onClick={deleteDoctorHandler}
              className={`${styles['btn']} ${styles['danger']}`}
            >
              نعم
            </button>
          </div>
        </div>
      </FormPopUp>
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

export default CoursesPage;
