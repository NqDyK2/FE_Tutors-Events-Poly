import { apiSlice } from './apiSlice';

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: 'semester/get-all',
      }),
      providesTags: ['Semester'],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getListClassInSemester: builder.query({
      query: (id) => `semester/${id}/classrooms`,
      providesTags: ['Semester'],
    }),
    getListStudentInCLass: builder.query({
      query: (id) => `classroom/${id}/students`,
      providesTags: ['Semester'],
    }),
    importStudentsSemester: builder.mutation({
      query: (body) => ({
        url: `semester/${body.semesterId}/import`,
        body: body.data,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }),
      invalidatesTags: ['Semester'],
    }),
    addSemester: builder.mutation({
      query: (semester) => ({
        url: 'semester/store',
        method: 'POST',
        body: semester,
      }),
      invalidatesTags: ['Semester'],
    }),
    updateSemester: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `semsester/${id}/update`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Semester'],
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useGetListStudentInCLassQuery,
  useAddSemesterMutation,
  useGetListClassInSemesterQuery,
  useImportStudentsSemesterMutation,
  useUpdateSemesterMutation,
} = semesterApiSlice;
