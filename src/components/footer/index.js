// react
import React, { Fragment, useEffect, useState } from 'react';

// styles
import styles from './index.module.scss';
// components
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// redux
import { useSelector } from 'react-redux';

/***************************************************************************/
/* Name : Footer React Component */
/***************************************************************************/
const Footer = React.memo(() => {
  const [footerText, setFooterText] = useState(
    useSelector((state) => state.ui.copyrights)
  );
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
      <div className={styles['footer']}>{footerText}</div>
    </Fragment>
  );
});

export { Footer };
