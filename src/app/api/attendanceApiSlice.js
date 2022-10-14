import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceListClass: builder.query({
      query: () => 'attendance/classrooms',
      providesTags: ['AttendanceListClass'],
    }),
    getAttendanceListStudent: builder.query({
      query: (classId) => `attendance/${classId}/students`,
      providesTags: ['AttendanceListStudent'],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    updateAttendanceStudentStatus: builder.mutation({
      query: (data) => ({
        url: `attendance/${data.classId}/update`,
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
