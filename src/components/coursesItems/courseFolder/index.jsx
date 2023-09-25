// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// icon
import Folder from '../../../assets/icons/folder.svg';
/***************************************************************************/
/* Name : CourseFolder React Component */
/***************************************************************************/
const CourseFolder = React.memo((props) => {
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);

  /******************************************************************/
  /* onClickHandler */
  /******************************************************************/
  const onClickHandler = () => {
    props.onClick(props.info.courseName, props.info.courseCode );
  };
  return (
    <Fragment>
      <div className={styles['folder']} onClick={onClickHandler}>
        <div className={styles['folder__img']}>
          <img src={Folder} alt='folder' />
        </div>
        <div className={styles['folder__code']}>{props.info.courseCode}</div>
        <div className={styles['folder__name']}>{props.info.courseName}</div>
      </div>
    </Fragment>
  );
});

export { CourseFolder };
