import styles from './App.module.scss';
// react
import React, { Suspense, useEffect, useState } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
import { Header } from './components/header/index';
import { Message } from './components/message/index';
import { Footer } from './components/footer/index';
// mui
import CircularProgress from '@mui/material/CircularProgress';
// login pages (lazy import)
const AdminLoginPage = React.lazy(() =>
  import('./pages/loginPages/adminLoginPage/index')
);
const StudentLoginPage = React.lazy(() =>
  import('./pages/loginPages/studentLoginPage/index')
);
const DoctorLoginPage = React.lazy(() =>
  import('./pages/loginPages/doctorLoginPage/index')
);
// course pages
const CourseMain = React.lazy(() => import('./pages/course/index'));
const CourseList = React.lazy(() => import('./pages/course/courseList/index'));
const CourseSubList = React.lazy(() =>
  import('./pages/course/courseSubList/index')
);
const CourseContent = React.lazy(() =>
  import('./pages/course/courseContent/index')
);
const DocumentView = React.lazy(() =>
  import('./pages/course/documentView/index')
);
// admin pages
// superadmin pages
// cookies
function App() {
  // get role from redux
  useEffect(() => {}, []);
  return (
    <div className={styles['main-container']}>
      <Header title={'منصة الكتاب الالكتروني'} />
      <Suspense fallback={<Message text='جاري التحميل' type={'load'} />}>
        <Routes>
          {/* Student Route */}
          <Route path='/' element={<StudentLoginPage />} />
          {/* Doctors Route */}
          <Route path='/doctor/login' element={<DoctorLoginPage />} />
          {/* Books */}
          <Route path='/course/*' element={<CourseMain />}>
            <Route path='courses' element={<CourseList />} />
            <Route path=':name/:code' element={<CourseSubList />} />
            <Route path=':name/:code/:type' element={<CourseContent />} />
            <Route
              path=':name/:code/:type/:itemId'
              element={<DocumentView />}
            />
          </Route>
          {/* Admins Route */}
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin/*' element={<h1>test</h1>}>
            <Route path='f' element={<AdminLoginPage />} />
            <Route
              path='*'
              element={
                <Message text='لم يتم العثور على هذه الصفحة' type={'error'} />
              }
            />
          </Route>

          <Route
            path='*'
            element={
              <Message text='لم يتم العثور على هذه الصفحة' type={'error'} />
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
