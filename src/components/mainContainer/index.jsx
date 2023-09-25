// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : MainContainer React Component */
/***************************************************************************/
const MainContainer = React.memo((props) => {
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
      <div className={styles['main-container']}>
        <div>{props.children}</div>
      </div>
    </Fragment>
  );
});

export { MainContainer };
