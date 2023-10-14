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
import { DoctorItem } from '../../../components/managementItems/doctorItem';
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// services
import {
  getRoleService,
  getAllDoctorsServices,
  deleteDoctorServices,
} from '../../../services/adminService';
import { getFacultiesService } from '../../../services/adminsManagementService';

/***************************************************************************/
/* Name : DoctorsPage React Component */
/***************************************************************************/
const DoctorsPage = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // reducer
  const [componentStates, dispatchDoctorsPageStates] = useReducer(
    componentStatesReducer,
    componentStatesInitialState
  );
  // faculty
  const [facultySelected, setFacultySelected] = useState('الكل');
  const [facultiesData, setFacultiesData] = useState([]);
  // role
  const [role, setRole] = useState('NOT');
  // pagination
  const [pageSelected, setPageSelected] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [limit, setLimit] = useState(50);
  // confirm delete form
  const [confirmDeleteForm, setConfirmDeleteForm] = useState(false);
  const [deletedItem, setDeletedItem] = useState({ name: 'temp', id: 'temp' });
  // data length
  const [dataLength, setDataLength] = useState(0);
  // states
  const [doctors, setDoctors] = useState([]);
  // search type states
  const [searchType, setSearchType] = useState('اختر نوع البحث');
  const [searchTypeData, setSearchTypeData] = useState([
    { value: 1, title: 'الايميل' },
    { value: 2, title: 'اسم الدكتور' },
    { value: 3, title: 'الرقم القومي' },
  ]);
  const searchRef = useRef(null);

  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      const { role } = await getRoleService();
      setRole(role);
      // get all doctors
      await getAllDoctorsHandler({}, pageSelected);
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
      dispatchDoctorsPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchDoctorsPageStates({ type: 'CLEAR' });
  };
  /******************************************************************/
  /* handleCloseConfirmForm */
  /******************************************************************/
  const handleCloseConfirmForm = () => {
    setConfirmDeleteForm(false);
  };
  /******************************************************************/
  /* getAllDoctorsHandler */
  /******************************************************************/
  const getAllDoctorsHandler = async (data, page) => {
    dispatchDoctorsPageStates({ type: 'PENDING' });
    const response = await getAllDoctorsServices(data, page, limit);
    if (response.status === 'success') {
      setDoctors(response.doctors);
      setDataLength(response.total);
      // calculate number of pages
      const numberOfPages = Math.ceil(response.total / limit);
      setNumberOfPages(numberOfPages);
      dispatchDoctorsPageStates({ type: 'CLEAR' });
    } else {
      dispatchDoctorsPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };

  /******************************************************************/
  /* searchForDoctorsHandler */
  /******************************************************************/
  const searchForDoctorsHandler = async (
    faculty = undefined,
    skipValidation = false,
    page = 1
  ) => {
    if (!skipValidation && searchType === 'اختر نوع البحث') {
      dispatchDoctorsPageStates({
        type: 'ERROR',
        errorMessage: 'يجب اختيار نوع البحث اولا',
      });
      return;
    }
    if (!skipValidation && searchRef.current.getInputValue().trim() === '') {
      dispatchDoctorsPageStates({
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
        email: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 2) {
      data = {
        ...data,
        name: searchRef.current.getInputValue().trim(),
      };
    }

    if (+searchType === 3) {
      data = {
        ...data,
        nationalID: searchRef.current.getInputValue().trim(),
      };
    }

    await getAllDoctorsHandler(data, page);
  };
  /******************************************************************/
  /* deleteDoctorHandler */
  /******************************************************************/
  const deleteDoctorHandler = async () => {
    dispatchDoctorsPageStates({ type: 'PENDING' });
    const response = await deleteDoctorServices(deletedItem.id);
    if (response.status === 'success') {
      dispatchDoctorsPageStates({
        type: 'SUCCESS',
        successMessage: response.message,
      });
      setConfirmDeleteForm(false);
      // remove deleted item from doctors
      const newDoctors = doctors.filter((doctor) => {
        return doctor._id !== deletedItem.id;
      });
      setDoctors(newDoctors);
      // reduce data length
      setDataLength((prev) => prev - 1);
    } else {
      dispatchDoctorsPageStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* pagination handler */
  /******************************************************************/
  const paginationHandler = async (e, page) => {
    setPageSelected(page);
    await searchForDoctorsHandler(facultySelected, true, page);
  };
  return (
    <Fragment>
      <NavHeader title='الدكاترة' />
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
              <BtnSmall
                icon={SearchIcon}
                onClick={() => {
                  setPageSelected(1);
                  searchForDoctorsHandler(facultySelected, false, 1);
                }}
              />
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
                    setPageSelected(1);
                    searchForDoctorsHandler(e.target.value, true, 1);
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
              <h3>عدد الدكاترة </h3>
              <p>{dataLength}</p>
            </div>
          </div>
          <br></br>
          {doctors.length > 0 && (
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
            <div className={styles['doctors-list']}>
              {doctors.map((doctor) => {
                return (
                  <DoctorItem
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
          {doctors.length > 0 && (
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
            {doctors.length === 0 && (
              <Message text={'لا يوجد دكاترة'} type='info' />
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

export default DoctorsPage;
