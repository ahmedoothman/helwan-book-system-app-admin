// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// react-router
import { Outlet, useNavigate } from 'react-router-dom';
// components
import { NavBar } from '../../components/navBar';
// cookies
import Cookies from 'js-cookie';
/***************************************************************************/
/* Name : ManagementMain React Component */
/***************************************************************************/
const ManagementMain = React.memo(() => {
  const navigate = useNavigate();
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/');
      }
    })();
  }, []);

  /******************************************************************/
  /* functions */
  /******************************************************************/
  return (
    <Fragment>
      <NavBar />
      <Outlet />
    </Fragment>
  );
});

export default ManagementMain;
