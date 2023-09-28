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
import { FormPopUp } from '../../../components/formPopUp';
import { AdminItem } from '../../../components/adminsMangementComp/adminItem';
import { AddBtn } from '../../../components/btns/AddBtn';
import { BtnSmall } from '../../../components/btns/btnSmall';
import { Input } from '../../../components/inputs/InputField/index';
import { Message } from '../../../components/message/index';
// reducer
import {
  dashboardStatesInitialState,
  dashboardStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// services
// import { getFacultiesService } from "../../../services/universityStructureService";
import {
  getAllAdminsService,
  addAdminService,
  deleteAdminService,
  editAdminService,
  resetPasswordService,
  getAdminService,
} from '../../../services/adminsManagementService';
// get role
import { getRoleService } from '../../../services/userService';
// imgs
import SearchIcon from '../../../assets/icons/search.svg';
import CopyIcon from '../../../assets/icons/copy.svg';
/***************************************************************************/
/* Name : AdminsManagementPage React Component */
/***************************************************************************/
const AdminsManagementPage = React.memo(() => {
  // role
  const [role, setRole] = useState('SUPERADMIN'); // NOT ADMIN PUBLISHER SUPERADMIN
  // form open state
  const [formOpen, setFormOpen] = useState(false);
  // confirm delete state
  const [confirmDeleteForm, setConfirmDeleteForm] = useState(false);
  // adminSelectedID
  const [adminSelectedID, setAdminSelectedID] = useState('');
  // admin login info
  const [adminLoginInfo, setAdminLoginInfo] = useState({
    userName: 'othman',
    password: '123fyre6',
  });
  const [copyState, setCopyState] = useState('نسخ');
  // form type
  const [formType, setFormType] = useState('add');
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  // faculty
  const [facultySelected, setFacultySelected] = useState('اختر الكلية');
  const [facultiesData, setFacultiesData] = useState([]);
  // reducer
  const [dashboardStates, dispatchDashboardStates] = useReducer(
    dashboardStatesReducer,
    dashboardStatesInitialState
  );
  // roles
  const [rolesData, setRolesData] = useState([
    { value: 'ADMIN', title: 'مسؤول كلية' },
    { value: 'PUBLISHER', title: 'هيئة النشر' },
  ]);
  const [rolesSelected, setRolesSelected] = useState('PUBLISHER');
  // search type states
  const [searchType, setSearchType] = useState('اختر نوع البحث');
  const [searchTypeData, setSearchTypeData] = useState([
    { value: 1, title: 'اسم المستخدم' },
    { value: 2, title: 'الموبايل' },
  ]);
  // refs
  const nameRef = useRef(null);
  const nationalID = useRef(null);
  const userNameRef = useRef(null);
  const phoneRef = useRef(null);
  const searchRef = useRef(null);
  // admins data
  const [adminsData, setAdminsData] = useState([]);
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchDashboardStates({ type: 'CLEAR' });
  };
  // close form
  const handleCloseForm = () => {
    setFormOpen(false);
    setShowLoginInfo(false);
    // reset all states
  };
  // close confirm delete form
  const handleCloseConfirmForm = () => {
    setConfirmDeleteForm(false);
  };
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      // get role
      /*       const { role } = await getRoleService();
      if (role === 'SUPERADMIN') {
        // get faculties
        await getFacultiesHandler();
        // get admins
        await getAdminsHandler();
      }
      setRole(role); */
    })();
  }, []);
  // set Form New Open
  const setFormNewOpen = () => {
    // set form type
    setFormType('add');
    // clear refs
    userNameRef.current.clearInput();
    phoneRef.current.clearInput();
    nationalID.current.clearInput();
    nameRef.current.clearInput();
    // set faculty to default
    setFacultySelected('اختر الكلية');
    setFormOpen(true);
  };
  // serr form edit open
  const setFormEditOpen = (id) => {
    // set form type
    setFormType('edit');
    // clear refs
    userNameRef.current.clearInput();
    phoneRef.current.clearInput();
    nationalID.current.clearInput();
    nameRef.current.clearInput();
    // set faculty to default
    setFacultySelected('اختر الكلية');
    // fill data  ad pass it to form
    const adminData = adminsData.find((admin) => admin._id === id);
    // set faculty
    if (adminData.faculty) {
      setFacultySelected(adminData.faculty);
    } else {
      setFacultySelected('اختر الكلية');
    }
    // set refs
    userNameRef.current.setInputValue(adminData.userName);
    phoneRef.current.setInputValue(adminData.phoneNumber);
    nationalID.current.setInputValue(adminData.nationalID);
    nameRef.current.setInputValue(adminData.name);

    // set form open
    setFormOpen(true);
  };
  /******************************************************************/
  /* copyHandler */
  /******************************************************************/
  const copyHandler = async () => {
    const text = `userName: ${adminLoginInfo.userName}\npassword: ${adminLoginInfo.password}`;
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopyState('تم النسخ');
      setTimeout(() => {
        setCopyState('نسخ');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************/
  /* get admins */
  /******************************************************************/
  const getAdminsHandler = async () => {
    // get admins
    const response = await getAllAdminsService();
    if (response.status === 'success') {
      // set admins
      setAdminsData(response.data);
    } else {
      //dispacth errors
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /******************************************************************/
  /* validate input */
  /******************************************************************/
  const validateInput = (data) => {
    // validate
    if (data.name.trim() === '') {
      nameRef.current.activeError();
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال الاسم',
      });
      return false;
    } else {
      nameRef.current.clearError();
    }
    if (data.nationalID.trim() === '') {
      nationalID.current.activeError();
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال الرقم القومي',
      });
      return false;
    } else {
      nationalID.current.clearError();
    }
    // check national id 14 digit
    if (data.nationalID.trim().length !== 14) {
      nationalID.current.activeError();
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'الرقم القومي يجب ان يكون 14 رقم',
      });
      return false;
    } else {
      nationalID.current.clearError();
    }

    if (data.userName.trim() === '') {
      userNameRef.current.activeError();
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال اسم المستخدم',
      });
      return false;
    } else {
      userNameRef.current.clearError();
    }
    if (data.userName.trim().length < 5) {
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'اسم المستخدم يجب ان يكون 5 احرف على الاقل',
      });
      // activate error
      userNameRef.current.activeError();
      return false;
    } else {
      userNameRef.current.clearError();
    }

    if (data.phoneNumber.trim() === '') {
      phoneRef.current.activeError();
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال رقم الموبايل',
      });
      return false;
    } else {
      phoneRef.current.clearError();
    }
    // check faculty
    if (facultySelected === 'اختر الكلية') {
      // dispatch states
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب اختيار الكلية',
      });
      return false;
    }
    return true;
  };
  /******************************************************************/
  /* add admin */
  /******************************************************************/
  const addAdminHandler = async () => {
    // dispatch pending
    dispatchDashboardStates({ type: 'PENDING' });
    // get data
    const data = {
      name: nameRef.current.getInputValue(),
      nationalID: nationalID.current.getInputValue(),
      userName: userNameRef.current.getInputValue(),
      phoneNumber: phoneRef.current.getInputValue(),
      faculty: facultySelected,
    };
    // vaiidate data
    const isValid = validateInput(data);
    if (isValid) {
      const response = await addAdminService(data);
      if (response.status === 'success') {
        // dispatch success
        dispatchDashboardStates({
          type: 'SUCCESS',
          successMessage: 'تم اضافة مسؤول بنجاح',
        });
        // add admin to admins data
        setAdminsData((prev) => [...prev, response.data.user]);
        // set admin login info
        setAdminLoginInfo(response.data.data);
        setShowLoginInfo(true);
      } else {
        // dispatch error
        dispatchDashboardStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  /******************************************************************/
  /* delete admin */
  /******************************************************************/
  const deleteAdminHandler = async () => {
    // dispatch pending
    dispatchDashboardStates({ type: 'PENDING' });
    // delete admin
    const response = await deleteAdminService(adminSelectedID);
    if (response.status === 'success') {
      // remove admin from admins data
      setAdminsData((prev) =>
        prev.filter((admin) => admin._id !== adminSelectedID)
      );
      // dispatch success
      dispatchDashboardStates({
        type: 'SUCCESS',
        successMessage: 'تم حذف المسؤول بنجاح',
      });
    } else {
      // dispatch error
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
    // close confirm form
    handleCloseConfirmForm();
  };
  /******************************************************************/
  /* edit admin */
  /******************************************************************/
  const editAdminHandler = async () => {
    // dispatch pending
    dispatchDashboardStates({ type: 'PENDING' });
    // get data
    const data = {
      name: nameRef.current.getInputValue(),
      nationalID: nationalID.current.getInputValue(),
      userName: userNameRef.current.getInputValue(),
      phoneNumber: phoneRef.current.getInputValue(),
      faculty: facultySelected,
    };
    // vaiidate data
    const isValid = validateInput(data);
    if (isValid) {
      const response = await editAdminService(adminSelectedID, data);
      if (response.status === 'success') {
        // edit admin in admins data
        setAdminsData((prev) =>
          prev.map((admin) => {
            if (admin._id === adminSelectedID) {
              return response.data;
            }
            return admin;
          })
        );
        // dispatch success
        dispatchDashboardStates({
          type: 'SUCCESS',
          successMessage: 'تم تعديل المسؤول بنجاح',
        });
      } else {
        // dispatch error
        dispatchDashboardStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  /******************************************************************/
  /* resetPasswordHandler */
  /******************************************************************/
  const resetPasswordHandler = async () => {
    // dispatch pending
    dispatchDashboardStates({ type: 'PENDING' });
    // reset password
    const response = await resetPasswordService(adminSelectedID);
    if (response.status === 'success') {
      // set admin login info
      setAdminLoginInfo(response.data);
      setShowLoginInfo(true);
      // dispatch success
      dispatchDashboardStates({
        type: 'SUCCESS',
        successMessage: 'تم اعادة تعيين كلمة المرور بنجاح',
      });
    } else {
      // dispatch error
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
    // close confirm form
    handleCloseConfirmForm();
  };
  /******************************************************************/
  /* search for admin */
  /******************************************************************/
  const searchForAdminHandler = async () => {
    // dispatch pending
    const value = searchRef.current.getInputValue();
    dispatchDashboardStates({ type: 'PENDING' });
    if (searchType === 'اختر نوع البحث') {
      // dispatch error
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب اختيار نوع البحث',
      });
      return;
    }
    if (value.trim() === '') {
      // dispatch error
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: 'يجب ادخال قيمة البحث',
      });
      return;
    }
    let response = {};
    if (+searchType === 1) {
      response = await getAdminService(value, null);
    }
    if (+searchType === 2) {
      response = await getAdminService(null, value);
    }
    // search for admin
    if (response.status === 'success') {
      // set admins
      setAdminsData(response.data);
    } else {
      // dispatch error
      dispatchDashboardStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  return (
    <Fragment>
      <NavHeader title='ادارة المسؤولين' />

      {/* ********** Admins Data ********** */}
      {role === 'SUPERADMIN' && (
        <div className={styles['admins-container']}>
          <div className={styles['nav-search']}>
            <div className={styles['search-container']}>
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
              <BtnSmall icon={SearchIcon} onClick={searchForAdminHandler} />
            </div>
            <div>
              <AddBtn text={'اضف مسؤول'} onPress={setFormNewOpen} />
            </div>
          </div>
          {adminsData.map((el) => (
            <AdminItem
              key={el._id}
              adminData={el}
              onDeleteHandler={(id) => {
                setAdminSelectedID(id);
                setConfirmDeleteForm(true);
              }}
              onEditHandler={() => {
                setAdminSelectedID(el._id);
                setFormEditOpen(el._id);
              }}
            />
          ))}
          {adminsData.length === 0 && (
            <Message text={'لم يتم العثور على نتائج'} type='info' />
          )}
        </div>
      )}
      {role !== 'SUPERADMIN' && role !== 'NOT' && (
        <Message text={'لا يمكنك الوصول لهذه الصفحة'} type='error' />
      )}
      {/* ********** Form Pop up ********** */}
      <FormPopUp open={formOpen} handleClose={handleCloseForm}>
        {!showLoginInfo && (
          <div className={styles['nav-input']}>
            <div className={styles['form-control']}>
              <Input title={'الاسم'} type='text' ref={nameRef} />
            </div>
            <div className={styles['form-control']}>
              <Input title={'الرقم القومي'} type='text' ref={nationalID} />
            </div>
            <div className={styles['form-control']}>
              <Input title={'اسم المستخدم'} type='text' ref={userNameRef} />
            </div>
            <div className={styles['form-control']}>
              <Input title={'الموبايل'} type='text' ref={phoneRef} />
            </div>
            <div className={styles['form-control']}>
              <h3>الصلاحية</h3>
              <select
                id='role'
                name='role'
                value={rolesSelected}
                onChange={(e) => {
                  setRolesSelected(e.target.value);
                }}
              >
                {rolesData.map((el) => (
                  <option value={el.value} key={el.value}>
                    {el.title}
                  </option>
                ))}
              </select>
            </div>
            {rolesSelected === 'ADMIN' && (
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
            <br></br>
            {!dashboardStates.pending && formType === 'add' && (
              <button onClick={addAdminHandler}>اضف</button>
            )}

            {!dashboardStates.pending && formType !== 'add' && (
              <div className={styles['edit-btn-group']}>
                <button onClick={editAdminHandler}>تعديل</button>
                <button onClick={resetPasswordHandler}>
                  اعادة تعيين كلمة السر
                </button>
              </div>
            )}
            {dashboardStates.pending && (
              <button>
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#a18a00',
                  }}
                />
              </button>
            )}
          </div>
        )}

        {showLoginInfo && (
          <div className={styles['nav-input']}>
            <div className={styles['login-info']}>
              <div>
                <h3>اسم المستخدم</h3>
                <p>{adminLoginInfo.userName}</p>
              </div>
              <div>
                <h3>كلمة المرور</h3>
                <p>{adminLoginInfo.password}</p>
              </div>
            </div>
            <div className={styles['btns-group']}>
              {false && (
                <button onClick={copyHandler} className={styles['copy-btn']}>
                  <img src={CopyIcon}></img>
                  <p>{copyState}</p>
                </button>
              )}
            </div>
          </div>
        )}
      </FormPopUp>
      {/* ********** open Confirmation Form  confirmDeleteForm ********** */}
      <FormPopUp open={confirmDeleteForm} handleClose={handleCloseConfirmForm}>
        <div className={styles['confirm-input']}>
          <h2>هل تريد مسح هذا الادمن؟</h2>
          <div className={styles['btns-group']}>
            <button
              onClick={handleCloseConfirmForm}
              className={`${styles['btn']} ${styles['normal']}`}
            >
              لا
            </button>
            <button
              onClick={deleteAdminHandler}
              className={`${styles['btn']} ${styles['danger']}`}
            >
              نعم
            </button>
          </div>
        </div>
      </FormPopUp>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={dashboardStates.success}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          dir='ltr'
          sx={{
            width: '100%',
            backgroundColor: '#388E3C',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {dashboardStates.successMessage}!
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={dashboardStates.error}
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
          !{dashboardStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default AdminsManagementPage;
