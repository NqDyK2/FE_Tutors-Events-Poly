import { apiSlice } from "./apiSlice";


export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
    importStudentsSemester: builder.mutation({
      query: (body) => ({
        url: `semester/import/${body.semesterId}`,
        body: body.data,
        method: "POST",
      }),
      invalidatesTags: ["Semester"],
    }),
  }),
});

export const { useGetAllSemesterQuery, useImportStudentsSemesterMutation } = semesterApiSlice;