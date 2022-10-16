import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceListClass: builder.query({
      query: () => 'attendance/classrooms',
      providesTags: ['Attendance'],
    }),
    getAttendanceListStudent: builder.query({
      query: (classId) => `attendance/${classId}/students`,
      providesTags: ['Attendance'],
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
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetAttendanceListClassQuery,
  useGetAttendanceListStudentQuery,
  useUpdateAttendanceStudentStatusMutation,
} = attendanceApiSlice;
