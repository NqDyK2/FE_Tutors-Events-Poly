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
    getAttendanceLessonListStudent: builder.query({
      query: (lessonId) => `attendance/lesson/${lessonId}`,
      providesTags: ['Attendance'],

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
  useGetAttendanceLessonListStudentQuery,
} = attendanceApiSlice;
