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
/* Name : Input React Component */
/***************************************************************************/
const Input = React.forwardRef((props, ref) => {
  // states
  const [inputStyle, setInputStyle] = useState(`${styles['inputBox']}`);
  // useRef
  const inputRef = useRef(null);
  // forward ref
  useImperativeHandle(ref, () => {
    return {
      activeError,
      clearError,
      getInputValue: () => inputRef.current.value,
      clearInput: () => (inputRef.current.value = ''),
      setInputValue: (value) => (inputRef.current.value = value),
    };
  });
  // active error function
  const activeError = () => {
    const className = `${inputStyle} ${styles['error']}`;
    setInputStyle(className);
  };
  // clear error function
  const clearError = () => {
    // take the input style but remove the error class
    const className = inputStyle.replace(`${styles['error']}`, '');
    setInputStyle(className);
  };

  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
      if (props.wd == 'md') {
        setInputStyle(`${styles['inputBox']} ${styles['md']}`);
      }
      // sm
      if (props.wd == 'sm') {
        setInputStyle(`${styles['inputBox']} ${styles['sm']}`);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className={inputStyle}>
        <label>{props.title}</label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          name=''
          className={styles['input']}
          ref={inputRef}
          step={props.step ? props.step : null}
        />
      </div>
    </Fragment>
  );
});

export { Input };
