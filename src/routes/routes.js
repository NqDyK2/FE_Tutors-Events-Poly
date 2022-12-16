import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from '../features/auth/components/RequireAuth.js';
import AuthPage from '../features/auth/pages/index.js';
import EventsPage from '../features/events/customer/pages/index.js';
import HomePage from '../features/home-page/pages/index.js';
import WelcomePage from '../features/welcom-page/pages/index.js';
import AppLayout from '../layout/AppLayout.js';
import ListStudent from '../features/list-students/pages/index.js';
import PageNotFound from '../features/404page/pages/index.js';
import SemesterPage from '../features/semester/pages/index.js';
import SubjectPage from '../features/semester/pages/ListSubject.js';
import ListLesson from '../features/lesson/pages/ListLesson.js';
import ManageGuard from './guard/ManageGuard.js';
import AttendanceGuard from './guard/AttendanceGuard.js';
import AttendanceClassList from '../features/attendance/pages/AttendanceClassList/index.js';
import AttendanceClassLessons from '../features/attendance/pages/AttendanceClassLessons/index.js';
import AttendanceStudentList from '../features/attendance/pages/AttendanceStudentList/index.js';
import MajorPage from '../features/major/pages/index.js';
import LichHocGuard from './guard/LichHocGuard.js';
import AdminGuard from './guard/AdminGuard.js';
import ListFeedback from '../features/feedback/index.js';
import TeacherPage from '../features/teachers/pages/index.js';
import TeachingSchedule from '../features/teaching-schedule/index.js';
import ManageEvent from '../features/events/manage/pages/index.js';
import CallBack from '../features/auth/components/CallBack.js';
import StudentLessonHistoryPage from '../features/student/pages/LessonHistory/index.js';
import TimeTable from '../features/student/pages/TimeTable/index.js';
import StatsPage from '../features/stats/pages/index.js';
import Trash from '../features/events/manage/pages/Trash.js';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/callback" element={<CallBack />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />

          <Route element={<LichHocGuard />}>
            <Route path="/lich-hoc" element={<TimeTable />} />
            <Route path="/lich-su-hoc" element={<StudentLessonHistoryPage />} />
          </Route>

          <Route element={<ManageGuard />}>
            <Route path="/manage" element={<SemesterPage />} />
            <Route path="/manage/sem/:id" element={<SubjectPage />} />
            <Route path="/manage/class/:id" element={<ListStudent />} />
            <Route path="/manage/class/lesson/:id" element={<ListLesson />} />
            <Route path="/manage/feedback" element={<ListFeedback />} />
            <Route path="/manage/events" element={<ManageEvent />} />
            <Route path="/manage/events-trash" element={<Trash />} />
          </Route>
          <Route element={<AdminGuard />}>
            <Route path="/manage/major" element={<MajorPage />} />
            <Route path="/manage/teacher" element={<TeacherPage />} />
            <Route path="/thong-ke" element={<StatsPage />} />
          </Route>

          <Route element={<AttendanceGuard />}>
            <Route path="/lich-day" element={<TeachingSchedule />} />
            {/* <Route path="/diem-danh" element={<AttendanceClassList />} /> */}
            {/* <Route
              path="/diem-danh/lop/:classId"
              element={<AttendanceClassLessons />}
            /> */}
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
