import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceListClass: builder.query({
      query: () => 'attendance/classrooms',
      providesTags: ['Attendance'],
    }),
    getAttendanceClassLesson: builder.query({
      query: (classId) => `attendance/classroom/${classId}/lessons`,
      providesTags: ['Attendance'],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getAttendanceLessonListStudent: builder.mutation({
      // query: (lessonId) => `attendance/lesson/${lessonId}`,
      query: (lessonId) => ({
        url: `attendance/lesson/${lessonId}`,
        method: 'GET',

      }),
      invalidatesTags: ['Attendance'],

    }),
    updateAttendanceStudentStatus: builder.mutation({
      query: (data) => ({
        url: `attendance/lesson/${data.lessonId}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetAttendanceListClassQuery,
  useGetAttendanceClassLessonQuery,
  useUpdateAttendanceStudentStatusMutation,
  useGetAttendanceLessonListStudentMutation,
} = attendanceApiSlice;
