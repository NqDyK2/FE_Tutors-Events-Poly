import { apiSlice } from "./apiSlice";

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => ({
        url: "subject/get-all",
      }),
      providesTags: ["Subject"],
    }),
    getSubject: builder.query({
      query: (id) => ({
        url: `subject/show/${id}`,
      }),
      providesTags: ["Subject"],
    })
  }),
});

export const { useGetAllSubjectQuery, useGetSubjectQuery } = subjectApiSlice;