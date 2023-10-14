// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// redux
import { useSelector } from 'react-redux';
// smallBtn
import { DeleteBtn } from '../../btns/DeleteBtn';
/***************************************************************************/
/* Name : CourseItem React Component */
/***************************************************************************/
const CourseItem = React.memo((props) => {
  // state for style
  const [style, setStyle] = useState(`doctor-item`);
  // deleteHandler
  const deleteHandler = () => {
    props.onDeleteHandler();
  };
  // useEffect
  useEffect(() => {
    (async () => {
      setStyle(`doctor-item`);
    })();
  }, []);

  /***************************************************************************/
  /* Name : moreHandler */
  /* Description : moreHandler */
  /***************************************************************************/
  return (
    <Fragment>
      <div className={styles[`${style}`]}>
        <div className={styles[`special-info`]}>
          <span className={styles[`title`]}>اسم المقرر</span>
          <span>{props.data.name}</span>
        </div>
        <div className={styles[`${style}__columns`]}>
          <div className={styles[`${style}__part`]}>
            <div className={styles[`${style}__info`]}>
              <span className={styles[`title`]}>الكلية</span>
              <span>{props.data.faculty}</span>
            </div>
            <div className={styles[`${style}__info`]}>
              <span className={styles[`title`]}>القسم</span>
              <span>{props.data.department}</span>
            </div>
          </div>
          <div className={styles[`${style}__part`]}>
            <div className={styles[`${style}__info`]}>
              <span className={styles[`title`]}> كود المقرر</span>
              <span>{props.data.code}</span>
            </div>
            <div className={styles[`${style}__btns`]}>
              <DeleteBtn onPress={deleteHandler} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { CourseItem };
