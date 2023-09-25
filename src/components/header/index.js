// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// icons
import faceBookIcon from '../../assets/icons/icons8_facebook.png';
import instagramIcon from '../../assets/icons/icons8_Instagram.png';
import twitterIcon from '../../assets/icons/icons8_twitter.png';
import linkedinIcon from '../../assets/icons/icons8_linkedin.png';
// logo
import logo from '../../assets/imgs/logo_blank.png';
/***************************************************************************/
/* Name : Header React Component */
/***************************************************************************/
const Header = React.memo(({ title }) => {
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
    })();
  }, []);

  /***************************************************************************/
  /* Name : load */
  /* Description : load */
  /***************************************************************************/

  return (
    <Fragment>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <img src={logo} alt='' />
        </div>
        <div className={styles['title']}>{title}</div>
        <div className={styles['contacts']}>
          <div className={styles['icons']}>
            <a target='_blank' href='https://www.facebook.com/helwan.edu.eg1'>
              <img src={faceBookIcon} alt='' />
            </a>
            <a target='_blank' href='https://www.instagram.com/helwan_un'>
              <img src={instagramIcon} alt='' />
            </a>
            <a target='_blank' href='https://www.twitter.com/Helwan_Un?s=09'>
              <img src={twitterIcon} alt='' />
            </a>
            <a
              target='_blank'
              href='https://www.linkedin.com/in/جامعة-حلوان-helwan-uni/'
            >
              <img src={linkedinIcon} alt='' />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { Header };
