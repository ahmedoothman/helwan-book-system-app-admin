// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// icons
import Arrow from '../../../assets/icons/arrow.svg';
import Home from '../../../assets/icons/home.svg';
/***************************************************************************/
/* Name : PathNavigate React Component */
/***************************************************************************/
const PathNavigate = React.memo((props) => {
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
      <div className={styles['info-bar-container']}>
        <div className={styles['info-bar-container__part']}>
          {props.course && (
            <Fragment>
              <div className={styles['info-item']}>
                <span>المقرر </span>
                {props.course.name}
              </div>
              <div className={styles['info-item']}>
                {' '}
                <span>كود المقرر </span> {props.course.code}
              </div>
            </Fragment>
          )}
          <div className={styles['info-slugs']}>
            {!props.course && (
              <div className={styles['info-sep']}>
                <img src={Home} alt='Home' />
              </div>
            )}
            {props.slugs.length > 0 &&
              props.slugs.map((slug) => (
                <Fragment key={slug + '0'}>
                  <div className={styles['info-sep']}>
                    <img src={Arrow} alt='arrow' />
                  </div>
                  <div className={styles['info-item']}>{slug}</div>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { PathNavigate };
