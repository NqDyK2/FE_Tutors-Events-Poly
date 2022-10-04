import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CheckPoint from '../features/auth/components/CheckPoint.js';
import RequireAuth from '../features/auth/components/RequireAuth.js';
import AttendanceList from '../features/attendance/pages/attendanceList/index.js';
import AuthPage from '../features/auth/pages/index.js';
import EventsPage from '../features/events/pages/index.js';
import HomePage from '../features/home-page/pages/index.js';
import AddClassPage from '../features/tutors/pages/TutorAddClass/index.js';
import WelcomePage from '../features/welcom-page/pages/index.js';
import AppLayout from '../layout/AppLayout.js';
import ListStudent from '../features/list-students/pages/index.js';
import PageNotFound from '../features/404page/pages/index.js';
import AttendanceStudent from '../features/attendance/pages/attendanceStudent/index.js';
import TutorImportStudents from '../features/tutors/pages/TutorImportStudents/index.js';
import AddPost from '../features/tutors/pages/TutorPost/AddPost.js';
import ListPost from '../features/tutors/pages/TutorPost/ListPost.js';
import CanlendarTutors from '../features/tutors/pages/Calendar/index.js';
import SemesterPage from '../features/semester/pages/index.js';
import SubjectPage from '../features/semester/pages/ListSubject.js';
import ListClass from '../features/lesson/pages/ListClass.js';
import ListLesson from '../features/lesson/pages/ListLesson.js';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/checkpoint' element={<CheckPoint />} />
      <Route path='/welcome' element={<WelcomePage />} />
      <Route element={<RequireAuth />}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/crclass' element={<AddClassPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/diem-danh' element={<AttendanceList />} />
          <Route path='/diem-danh/:classId' element={<AttendanceStudent />} />
          <Route path='/import-students' element={<TutorImportStudents />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/list-post' element={<ListPost />} />
          <Route path='/calendar-tutor' element={<CanlendarTutors />} />
          <Route path='/manage' element={<SemesterPage />} />
          <Route path='/manage/sem/:id' element={<SubjectPage />} />
          <Route path='/manage/class/:id' element={<ListStudent />} />
          <Route path='/manage/class/lesson/:id' element={<ListLesson />} />
          <Route path='/list-class' element={<ListClass />} />
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
