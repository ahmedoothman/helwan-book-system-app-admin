// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
/***************************************************************************/
/* Name : NavHeader React Component */
/***************************************************************************/
const NavHeader = React.memo(({ title, mode, hideBack }) => {
  const navigate = useNavigate();
  /***************************************************************************/
  /* Name : backwardHandler */
  /* Description : backwardHandler */
  /***************************************************************************/
  const backwardHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    (async () => {
      // get role
    })();
  }, []);

  return (
    <Fragment>
      <div className={styles['container']}>
        <div>{title}</div>
        <div className={styles['links']}>
          {!hideBack && <a onClick={backwardHandler}>رجوع</a>}
        </div>
      </div>
    </Fragment>
  );
});

export { NavHeader };
