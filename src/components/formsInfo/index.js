// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : StudentsInfo React Component */
/***************************************************************************/
const FormsInfo = React.memo(({ data }) => {
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
    })();
  }, []);

  /***************************************************************************/
  /* Name : load */
  /* Description : load */
  /***************************************************************************/

  return (
    <Fragment>
      <div className={styles['student-details']}>
        <div className={styles['nav']}>الاستمارات</div>
        {styles['value']}
        <div className={styles['details-container']}>
          {data.map((item, index) => {
            return (
              <div className={styles['item']} key={index}>
                <div className={styles['title']}>{item.name}</div>
                <div className={styles['value']}>{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
});

export { FormsInfo };
