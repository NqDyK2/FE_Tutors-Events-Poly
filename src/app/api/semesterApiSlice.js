import { apiSlice } from "./apiSlice";

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
    addSemester: builder.mutation({
      query: (semester) => ({
        url: 'semester/store',
        method: 'POST',
        body: semester,
      }),
      invalidatesTags: ['Semester']
    })
  }),
});

export const { 
  useGetAllSemesterQuery,
  useAddSemesterMutation,
} = semesterApiSlice;