import { apiSlice } from "./apiSlice";


export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
<<<<<<< HEAD
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
=======
    getSemester: builder.query({
      query: (id) => `semester/show/${id}`,
      providesTags: ['Semester'],
>>>>>>> dddf2c4 (Create UI List subjects)
    }),
  }),
});

<<<<<<< HEAD
export const { useGetAllSemesterQuery, useImportStudentsSemesterMutation } = semesterApiSlice;
=======
export const { useGetAllSemesterQuery, useGetSemesterQuery } = semesterApiSlice;
>>>>>>> dddf2c4 (Create UI List subjects)
