import { apiSlice } from "./apiSlice";


export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
    getSemester: builder.query({
      query: (id) => `classroom/in-semester/${id}`,
      providesTags: ['Semester'],
    }),
    importStudentsSemester: builder.mutation({
      query: (body) => ({
        url: `semester/import/${body.semesterId}`,
        body: body.data,
        method: "POST",
        headers: {
          'Accept': 'application/json',
        }
      }),
      invalidatesTags: ["Semester"],
    }),
  }),
});

export const { useGetAllSemesterQuery, useGetSemesterQuery, useImportStudentsSemesterMutation } = semesterApiSlice;
