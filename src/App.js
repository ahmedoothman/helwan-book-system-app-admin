import styles from './App.module.scss';
// react
import React, { Suspense, useEffect, useState } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
import { Header } from './components/header/index';
import { Message } from './components/message/index';
import { Footer } from './components/footer/index';

// login pages (lazy import)
const AdminLoginPage = React.lazy(() =>
  import('./pages/loginPages/adminLoginPage/index')
);
// ManagementMain pages (facultyAdmin, puplisherAdmin, superAdmin)
const ManagementMain = React.lazy(() => import('./pages/management/index'));
const BooksPage = React.lazy(() =>
  import('./pages/management/booksPage/index')
);
// settings pages
const ChangePassword = React.lazy(() =>
  import('./pages/settings/changePassword/index')
);
// cookies
function App() {
  // get role from redux
  useEffect(() => {}, []);
  return (
    <div className={styles['main-container']}>
      <Header title={'منصة الكتاب الالكتروني'} />
      <Suspense fallback={<Message text='جاري التحميل' type={'load'} />}>
        <Routes>
          {/* **************************************** */}
          {/* Login Routes */}
          {/* **************************************** */}
          <Route path='/' element={<AdminLoginPage />} />
          {/* **************************************** */}
          {/* management Routes */}
          {/* **************************************** */}
          <Route path='/management/*' element={<ManagementMain />}>
            <Route path='books' element={<BooksPage />} />
            <Route
              path='*'
              element={
                <Message text='لم يتم العثور على هذه الصفحة' type={'error'} />
              }
            />
          </Route>
          {/* **************************************** */}
          {/* settings Routes */}
          {/* **************************************** */}
          <Route path='/settings/changePassword' element={<ChangePassword />} />
          {/* **************************************** */}
          {/* notFound */}
          {/* **************************************** */}
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
