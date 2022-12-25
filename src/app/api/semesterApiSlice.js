import { apiSlice } from './apiSlice';

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedBack: builder.query({
      query: (id) => ({
        url: `classroom/${id}/list-feedback`
      }),
      providesTags: ['FeedBack']
    }),
    getAllSemester: builder.query({
      query: () => ({
        url: 'semester/get-all',
      }),
      providesTags: ['Semester'],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getListStudentInCLass: builder.query({
      query: (id) => `classroom/${id}/students`,
      providesTags: ['Student'],
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
      invalidatesTags: ['Classroom'],
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
        url: `semester/${id}/update`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Semester'],
    }),
    deleteSemester: builder.mutation({
      query: (id) => ({
        url: `semester/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Semester'],
    }),
    // Get stats data for chart in stats page
    getSemesterStats: builder.mutation({
      query: (id) => ({
        url: `statistics/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Semester'],
    }),
    getSemesterExportData: builder.mutation({
      query: (id) => ({
        url: `statistics/${id}/export-data`,
        method: 'GET',
      }),
      invalidatesTags: ['SemesterExport'],
    }),
    getCurrentSemesterStats: builder.query({
      query: (id) => `statistics`,
      providesTags: ['Semester'],
    }),
    importResultSemester: builder.mutation({
      query: (body) => ({
        url: `semester/${body.semesterId}/import-all-result`,
        body: body.data,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }),
      invalidatesTags: ['Classroom'],
    }),
  }),
});

export const {
  useGetAllFeedBackQuery,
  useGetAllSemesterQuery,
  useGetListStudentInCLassQuery,
  useAddSemesterMutation,
  useImportStudentsSemesterMutation,
  useUpdateSemesterMutation,
  useDeleteSemesterMutation,
  useGetSemesterStatsMutation,
  useGetSemesterExportDataMutation,
  useGetCurrentSemesterStatsQuery,
  useImportResultSemesterMutation,
} = semesterApiSlice;
