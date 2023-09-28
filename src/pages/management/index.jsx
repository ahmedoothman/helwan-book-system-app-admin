// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// react-router
import { Outlet } from 'react-router-dom';
// components
import { NavBar } from '../../components/navBar';
/***************************************************************************/
/* Name : ManagementMain React Component */
/***************************************************************************/
const ManagementMain = React.memo(() => {
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
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
