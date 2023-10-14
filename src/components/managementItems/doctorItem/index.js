// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// redux
import { useSelector } from 'react-redux';
// smallBtn
import { DeleteBtn } from '../../btns/DeleteBtn';
/***************************************************************************/
/* Name : DoctorItem React Component */
/***************************************************************************/
const DoctorItem = React.memo((props) => {
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
        <div className={styles[`${style}__part`]}>
          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>الاسم</span>
            <span>{props.data.name}</span>
          </div>

          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>الرقم القومي</span>
            <span>{props.data.nationalID}</span>
          </div>

          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>الايميل</span>
            <span>{props.data.email.split('@')[0]}</span>
            <span>{props.data.email.split('@')[1] + '@'}</span>
          </div>
          <div className={styles[`${style}__btns`]}>
            <DeleteBtn onPress={deleteHandler} />
          </div>
        </div>
        <div className={styles[`${style}__part`]}>
          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>الكلية</span>
            <span>{props.data.faculty}</span>
          </div>
          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>القسم</span>
            <span>{props.data.department}</span>
          </div>
          <div className={styles[`${style}__info`]}>
            <span className={styles[`title`]}>المقررات</span>
            <div className={styles[`${style}__info__list`]}>
              {props.data.coursesCode.map((course, index) => (
                <span key={index}>{course}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { DoctorItem };
