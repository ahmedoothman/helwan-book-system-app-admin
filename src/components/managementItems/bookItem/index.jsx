// react
import React, { Fragment, useEffect } from 'react';
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
/***************************************************************************/
/* Name : BookItem React Component */
/***************************************************************************/
const BookItem = React.memo(() => {
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
      <div className={styles['book-item-container']}>
        <div className={styles['book-img']}>
          <img src={BOOK} alt='book' />
        </div>
        <div className={styles['book-info']}>
          <div className={styles['book-info__single']}>
            <span> {''}اسم الكتاب</span>
            <p>مبادئ البرمجة</p>
          </div>
          <div className={styles['book-info__single']}>
            <span>اسم الدكتور</span>
            <p>جون سلامة بيشاي</p>
          </div>
        </div>
        <Seperator word='بيانات المقرر' />
        <div className={styles['book-info']}>
          <div className={styles['book-info__single']}>
            <span>اسم المقرر</span>
            <p>مبادئ البرمجة</p>
          </div>
          <div className={styles['book-info__single']}>
            <span>رمز المقرر</span>
            <p>CS101</p>
          </div>
        </div>
        <Seperator word='بيانات الكلية' />
        <div className={styles['book-info']}>
          <div className={styles['book-info__single']}>
            <span>اسم الكلية</span>
            <p>هندسة الحاسبات والمعلومات</p>
          </div>
          <div className={styles['book-info__single']}>
            <span>اسم القسم</span>
            <p>هندسة الحاسبات</p>
          </div>
          <div className={styles['book-info__single']}>
            <span>اسم البرنامج</span>
            <p>هندسة الحاسبات</p>
          </div>
        </div>
        {true && (
          <div className={`${styles['book-status']} ${styles['pending']}`}>
            <div className={styles['book-status__single']}>
              <div className={styles['book-status__single__img']}>
                <img src={WAITING} />
              </div>
              <p>في الانتظار</p>
            </div>
          </div>
        )}
        {false && (
          <div className={`${styles['book-status']} ${styles['approved']}`}>
            <div className={styles['book-status__single']}>
              <div className={styles['book-status__single__img']}>
                <img src={CHECK} />
              </div>
              <p>تمت الموافقة</p>
            </div>
          </div>
        )}
        {false && (
          <div className={`${styles['book-status']} ${styles['rejected']}`}>
            <div className={styles['book-status__single']}>
              <div className={styles['book-status__single__img']}>
                <img src={REJECT} />
              </div>
              <p>تم رفضها</p>
            </div>
          </div>
        )}
        <div className={styles['book-actions']}>
          <button className={styles['book-actions__btn']}>
            <img src={EYE} alt='eye' />
            عرض
          </button>
          <button className={styles['book-actions__btn']}>
            <img src={CHECK} alt='check' />
            موافقة
          </button>
          <button className={styles['book-actions__btn']}>
            <img src={REJECT} alt='check' />
            رفض
          </button>
        </div>
      </div>
    </Fragment>
  );
});

export { BookItem };
