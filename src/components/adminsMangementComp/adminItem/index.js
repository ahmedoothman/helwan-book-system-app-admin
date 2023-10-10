// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// redux
import { useSelector } from 'react-redux';
// smallBtn
import { BtnSmall } from '../../btns/btnSmall/index';
import { DeleteBtn } from '../../btns/DeleteBtn';
import { EditBtn } from '../../btns/EditBtn';
/***************************************************************************/
/* Name : AdminItem React Component */
/***************************************************************************/
const AdminItem = React.memo((props) => {
  // state for style
  const [style, setStyle] = useState(`admin-item`);
  // deleteHandler
  const deleteHandler = () => {
    props.onDeleteHandler(props.adminData._id);
  };
  // editHandler
  const editHandler = () => {
    props.onEditHandler(props.adminData._id);
  };

  // useEffect
  useEffect(() => {
    (async () => {
      if (props.adminData.role === `SUPERADMIN`) {
        setStyle(`admin-item-supa`);
      } else if (props.adminData.role === `PUBLISHER`) {
        setStyle(`admin-item-publish`);
      } else {
        setStyle(`admin-item`);
      }
    })();
  }, []);

  /***************************************************************************/
  /* Name : moreHandler */
  /* Description : moreHandler */
  /***************************************************************************/
  return (
    <Fragment>
      <div className={styles[`${style}`]}>
        <div className={styles[`${style}__info`]}>
          <span>الاسم</span>
          <span>{props.adminData.name}</span>
        </div>
        <div className={styles[`${style}__sep`]}></div>
        <div className={styles[`${style}__info`]}>
          <span>اسم المستخدم</span>
          <span>{props.adminData.userName}</span>
        </div>
        <div className={styles[`${style}__sep`]}></div>
        <div className={styles[`${style}__info`]}>
          <span>الدور</span>
          <span>
            {props.adminData.role === 'PUBLISHER'
              ? 'هيئة النشر'
              : props.adminData.role === 'ADMIN'
              ? 'مسؤول كلية'
              : props.adminData.role}
          </span>
        </div>
        <div className={styles[`${style}__sep`]}></div>
        <div className={styles[`${style}__info`]}>
          <span>الموبايل</span>
          <span>{props.adminData.phoneNumber}</span>
        </div>
        <div className={styles[`${style}__sep`]}></div>
        {props.adminData.faculty && (
          <div>
            <div className={styles[`${style}__info`]}>
              <span>الكلية</span>
              <span>{props.adminData.faculty}</span>
            </div>
          </div>
        )}
        {props.adminData.role !== 'SUPERADMIN' && (
          <div className={styles[`${style}__btns`]}>
            <EditBtn onPress={editHandler} />
            <DeleteBtn onPress={deleteHandler} />
          </div>
        )}
      </div>
    </Fragment>
  );
});

export { AdminItem };
