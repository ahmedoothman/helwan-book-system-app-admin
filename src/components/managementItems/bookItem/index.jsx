// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// components
import { Seperator } from '../../../components/seperator';
// icons
import BOOK from '../../../assets/icons/book.svg';
import EYE from '../../../assets/icons/eye-w.svg';
import CHECK from '../../../assets/icons/Done.svg';
import REJECT from '../../../assets/icons/Close.svg';
import WAITING from '../../../assets/icons/sand_timer.svg';
// services
import { getRoleService } from '../../../services/adminService';
/***************************************************************************/
/* Name : BookItem React Component */
/***************************************************************************/
const BookItem = React.memo(
  ({ book, viewBookHandler, approveBookHandler, rejectBookHandler }) => {
    const [role, setRole] = useState('NOT');
    /******************************************************************/
    /* useEffect */
    /******************************************************************/
    useEffect(() => {
      (async () => {
        const { role } = await getRoleService();
        setRole(role);
      })();
    }, []);
    return (
      <Fragment>
        <div className={styles['book-item-container']}>
          <div className={styles['book-img']}>
            <img src={BOOK} alt='book' />
          </div>
          <div className={styles['book-info']}>
            <div className={styles['book-info__single']}>
              <span> {''}اسم الكتاب</span>
              <p>{book.materialName}</p>
            </div>
            <div className={styles['book-info__single']}>
              <span>اسم الدكتور</span>
              <p>{book.doctorName}</p>
            </div>
          </div>
          <Seperator word='بيانات المقرر' />
          <div className={styles['book-info']}>
            <div className={styles['book-info__single']}>
              <span>اسم المقرر</span>
              <p>{book.courseName}</p>
            </div>
            <div className={styles['book-info__single']}>
              <span>رمز المقرر</span>
              <p>{book.courseCode}</p>
            </div>
          </div>
          <Seperator word='بيانات الكلية' />
          <div className={styles['book-info']}>
            <div className={styles['book-info__single']}>
              <span>اسم الكلية</span>
              <p>{book.faculty}</p>
            </div>
            <div className={styles['book-info__single']}>
              <span>اسم القسم</span>
              <p>{book.department}</p>
            </div>
          </div>
          {role !== 'SUPERADMIN' && role !== 'NOT' && (
            <Fragment>
              {book.status === 'pending' && (
                <div
                  className={`${styles['book-status']} ${styles['pending']}`}
                >
                  <div className={styles['book-status__single']}>
                    <div className={styles['book-status__single__img']}>
                      <img src={WAITING} />
                    </div>
                    <p>في الانتظار</p>
                  </div>
                </div>
              )}
              {book.status === 'accepted' && (
                <div
                  className={`${styles['book-status']} ${styles['approved']}`}
                >
                  <div className={styles['book-status__single']}>
                    <div className={styles['book-status__single__img']}>
                      <img src={CHECK} />
                    </div>
                    <p>تمت الموافقة</p>
                  </div>
                </div>
              )}

              {book.status === 'rejected' && (
                <div
                  className={`${styles['book-status']} ${styles['rejected']}`}
                >
                  <div className={styles['book-status__single']}>
                    <div className={styles['book-status__single__img']}>
                      <img src={REJECT} />
                    </div>
                    <p>تم رفضها</p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          {role === 'SUPERADMIN' && role !== 'NOT' && (
            <Seperator word='حالة الكتاب' />
          )}
          {role === 'SUPERADMIN' && role !== 'NOT' && (
            <div className={styles['book-status-super']}>
              {book.publisherStatus === 'accepted' &&
                book.adminStatus === 'accepted' && <p>🟢 تم قبول الكتاب </p>}
              {book.publisherStatus === 'accepted' &&
                book.adminStatus !== 'accepted' && (
                  <p>🟢 تم قبول الكتاب من هيئة النشر </p>
                )}
              {book.publisherStatus !== 'accepted' &&
                book.adminStatus === 'accepted' && (
                  <p>🟢 تم قبول الكتاب من مسؤول الكلية </p>
                )}
              {book.publisherStatus === 'pending' &&
                book.adminStatus === 'pending' && <p>🟡 جاري مراجعة الكتاب </p>}
              {book.publisherStatus === 'pending' &&
                book.adminStatus !== 'pending' && (
                  <p>🟡 جاري مراجعة الكتاب من هيئة النشر </p>
                )}
              {book.publisherStatus !== 'pending' &&
                book.adminStatus === 'pending' && (
                  <p>🟡جاري مراجعة الكتاب من مسؤول الكلية </p>
                )}
              {book.publisherStatus === 'rejected' &&
                book.adminStatus === 'rejected' && (
                  <p>🔴تم رفض الكتاب من هيئة النشر و مسؤول الكلية</p>
                )}

              {book.publisherStatus === 'rejected' &&
                book.adminStatus !== 'rejected' && (
                  <p> 🔴تم رفض الكتاب من هيئة النشر</p>
                )}
              {book.publisherStatus !== 'rejected' &&
                book.adminStatus === 'rejected' && (
                  <p>🔴تم رفض الكتاب من مسؤول الكلية</p>
                )}
            </div>
          )}
          <div className={styles['book-actions']}>
            <button
              className={styles['book-actions__btn']}
              onClick={() => {
                viewBookHandler(book.materialPath);
              }}
            >
              <img src={EYE} alt='eye' />
              عرض
            </button>
            {book.status !== 'accepted' && role !== 'SUPERADMIN' && (
              <button
                className={` ${styles['approve-btn']}`}
                onClick={() => {
                  // call api
                  approveBookHandler(book._id);
                }}
              >
                <img src={CHECK} alt='check' />
                موافقة
              </button>
            )}
            {role !== 'SUPERADMIN' && (
              <button
                className={` ${styles['reject-btn']}`}
                onClick={() => {
                  // call api
                  rejectBookHandler(book._id);
                }}
              >
                <img src={REJECT} alt='check' />
                رفض
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
);

export { BookItem };
