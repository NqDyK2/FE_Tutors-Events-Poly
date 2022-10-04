import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceListClass: builder.query({
      query: () => 'attendance/list-class',
      providesTags: ['AttendanceListClass'],
    }),
    getAttendanceListStudent: builder.query({
      query: (classId) => `attendance/get/${classId}`,
      providesTags: ['AttendanceListStudent'],
      transformResponse: (response) => {
        return response.data;
      },
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
