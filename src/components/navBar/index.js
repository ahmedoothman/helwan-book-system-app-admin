// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
// cookies
import Cookies from 'js-cookie';
// get role
import { getRoleService } from '../../services/adminService';
// redux
/***************************************************************************/
/* Name : NavHeader React Component */
/***************************************************************************/
const NavBar = React.memo(({ title }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('NOT'); // NOT ADMIN PUBLISHER SUPERADMIN
  /***************************************************************************/
  /* Name : logOutHandler */
  /* Description : logOutHandler */
  /***************************************************************************/
  const logOutHandler = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('faculty');
    Cookies.remove('name');
    navigate('/');
  };

  // useEffect
  useEffect(() => {
    (async () => {
      // calling role
      const { role } = await getRoleService();
      setRole(role);
    })();
  }, []);

  return (
    <Fragment>
      {
        <div className={styles['nav-container']}>
          <ul>
            <NavLink
              to='/management/books'
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? styles['active-tab'] : ''
              }
            >
              الكتب
            </NavLink>
            {role === 'SUPERADMIN' && role !== 'NOT' && (
              <NavLink
                to='/management/uploadData'
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? styles['active-tab'] : ''
                }
              >
                رفع البيانات
              </NavLink>
            )}
            {role === 'SUPERADMIN' && role !== 'NOT' && (
              <NavLink
                to='/management/adminsManagement'
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? styles['active-tab'] : ''
                }
              >
                ادارة المسؤولين
              </NavLink>
            )}
            {role === 'SUPERADMIN' && role !== 'NOT' && (
              <NavLink
                to='/settings/updateAccountInfo'
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? styles['active-tab'] : ''
                }
              >
                تحديث بيانات الحساب
              </NavLink>
            )}
            {role === 'SUPERADMIN' && role !== 'NOT' && (
              <NavLink
                to='/management/resetSystem'
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? styles['active-tab'] : ''
                }
              >
                اعادة التهيئة
              </NavLink>
            )}
            <NavLink
              to='/settings/changePassword'
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? styles['active-tab'] : ''
              }
            >
              تغيير كلمة السر
            </NavLink>
            <a onClick={logOutHandler}>تسجيل الخروج</a>
          </ul>
        </div>
      }
    </Fragment>
  );
});

export { NavBar };
