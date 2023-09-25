// react
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// components
import { MainContainer } from '../../../components/mainContainer';
import { NavHeader } from '../../../components/navHeader';
import { PathNavigate } from '../../../components/coursesItems/PathNavigate';
import { PDFViewer } from '../../../components/coursesItems/pdfViewer';
// reducer
import {
  documentViewStatesInitialState,
  documentViewStatesReducer,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// router
import { useNavigate } from 'react-router-dom';
// services
// import { apiServices } from '../../../services/apiServices';
// pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
/***************************************************************************/
/* Name : DocumentView React Component */
/***************************************************************************/
const DocumentView = React.memo(() => {
  const { name, code, type, itemId } = useParams();
  const navigate = useNavigate();
  // reducer
  const [documentViewStates, dispatchDocumentViewStates] = useReducer(
    documentViewStatesReducer,
    documentViewStatesInitialState
  );

  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {})();
  }, []);
  /******************************************************************/
  /* handleCloseSnackbar */
  /******************************************************************/
  const handleCloseSnackbar = () => {
    dispatchDocumentViewStates({ type: 'CLEAR' });
  };

  return (
    <Fragment>
      <NavHeader title={'المقررات الدراسية'} />
      <MainContainer>
        <PathNavigate course={{ name, code }} slugs={[type, itemId]} />
        <div
          className={styles['document-container']}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <embed
            src={'https://www.orimi.com/pdf-test.pdf'}
            width='100%'
            height='1000'
          />
          {/* <PDFViewer url={'https://www.orimi.com/pdf-test.pdf'} /> */}
        </div>
      </MainContainer>
      {/* ********** SUCCESS SNACKBAR ********** */}
      <Snackbar
        open={documentViewStates.success}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='success'
          onClose={handleCloseSnackbar}
          dir='ltr'
          sx={{
            width: '100%',
            backgroundColor: '#43A047',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          !{documentViewStates.successMessage}
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={documentViewStates.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='error'
          onClose={handleCloseSnackbar}
          dir='ltr'
          sx={{
            width: '100%',
            backgroundColor: '#D32F2F',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          !{documentViewStates.errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export default DocumentView;
