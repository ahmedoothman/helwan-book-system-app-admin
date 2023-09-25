// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// imgs
import Person from '../../../assets/icons/male_user.svg';
/***************************************************************************/
/* Name : InfoBar React Component */
/***************************************************************************/
const InfoBar = React.memo((props) => {
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
      <div>
        <div className={styles['info-bar-container']}>
          <div className={styles['info-bar-container__part']}>
            <div className={styles['info-bar-container__img']}>
              <img src={Person} alt='person' />
            </div>
            <div>{`اهلا , ${props.info.name}`}</div>
          </div>
          <div className={styles['info-bar-container__part']}>
            <div className={styles['info-item']}>
              <span>الكلية: </span>
              {props.info.faculty}
            </div>
            <div className={styles['info-item']}>
              {' '}
              <span>القسم: </span> {props.info.department}
            </div>
            <div className={styles['info-item']}>
              {' '}
              <span>الفرقة: </span> {props.info.level}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { InfoBar };
