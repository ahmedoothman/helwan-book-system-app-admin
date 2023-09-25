// react
import React, {
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
// styles
import styles from './index.module.scss';
// icons
/***************************************************************************/
/* Name : BtnSmall React Component */
/***************************************************************************/
const BtnSmall = React.forwardRef(
  ({ title, icon, placeholder, onClick, fixedWidth }, ref) => {
    // states
    const [BtnSmallStyle, setBtnSmallStyle] = useState(
      `${fixedWidth ? styles['fixed-width'] : styles['btn']}`
    );
    // useRef
    const BtnSmallRef = useRef(null);
    // forward ref
    useImperativeHandle(ref, () => {
      return {
        activeError,
        clearError,
        getBtnSmallValue: () => BtnSmallRef.current.value,
      };
    });
    // active error function
    const activeError = () => {
      const className = `${styles['btn']} ${styles['error']}`;
      setBtnSmallStyle(className);
    };
    // clear error function
    const clearError = () => {
      const className = `${styles['btn']}`;
      setBtnSmallStyle(className);
    };
    // onClickHandler
    const onClickHandler = () => {
      if (onClick) onClick();
    };
    // useEffect
    useEffect(() => {
      (async () => {
        // calling load
        if (fixedWidth) {
          const className = `${styles['fixed-width']}`;
          setBtnSmallStyle(className);
        }
      })();
    }, []);

    return (
      <Fragment>
        <button className={BtnSmallStyle} onClick={onClickHandler}>
          {title}
          {icon !== undefined && (
            <div className={styles['icon']}>
              <img src={icon} alt='search' />
            </div>
          )}
        </button>
      </Fragment>
    );
  }
);

export { BtnSmall };
