import { apiSlice } from "./apiSlice";

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "semester/get-all",
      }),
      providesTags: ["Semester"],
    }),
  }),
});

export const { useGetAllSemesterQuery } = semesterApiSlice;