import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceListClass: builder.query({
      query: () => 'attendance/list-class',
      providesTags: ['AttendanceListClass'],
    }),
    getAttendanceListStudent: builder.query({
      query: (classId) => `attendance/list-student/${classId}`,
      providesTags: ['AttendanceListStudent'],
    }),
    updateAttendanceStudentStatus: builder.mutation({
      query: (data) => ({
        url: `attendance/update/${data.classId}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['AttendanceListStudent'],
    }),
  }),
});

export const {
  useGetAttendanceListClassQuery,
  useGetAttendanceListStudentQuery,
  useUpdateAttendanceStudentStatusMutation,
} = attendanceApiSlice;
