import { apiSlice } from "./apiSlice";


export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
    getListClassInSemester: builder.query({
      query: (id) => `classroom/in-semester/${id}`,
      providesTags: ['Semester'],
    }),
    getListStudentInCLass: builder.query({
      query: (id) => `classroom/get-student/${id}`,
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
    addSemester: builder.mutation({
      query: (semester) => ({
        url: 'semester/store',
        method: 'POST',
        body: semester,
      }),
      invalidatesTags: ["Semester"]
    })
  }),
});

export const {
  useGetAllSemesterQuery,
  useGetListStudentInCLassQuery,
  useAddSemesterMutation,
  useGetSemesterQuery,
  useImportStudentsSemesterMutation
} = semesterApiSlice;
 