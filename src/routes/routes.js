import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CheckPoint from '../features/auth/components/CheckPoint.js';
import RequireAuth from '../features/auth/components/RequireAuth.js';
import AuthPage from '../features/auth/pages/index.js';
import HomePage from '../features/home-page/pages/index.js';
import AddClassPage from '../features/tutors/pages/TutorAddClass/index.js';
import WelcomePage from '../features/welcom-page/pages/index.js';
import AppLayout from '../layout/AppLayout.js';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/checkpoint' element={<CheckPoint />}/>
      <Route path='/welcome' element={<WelcomePage />} />
      <Route element={<RequireAuth />}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/crclass' element={<AddClassPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
