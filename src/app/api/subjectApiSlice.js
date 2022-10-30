import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => `major/get-all`,
      providesTags: ['Subject'],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subject/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subject'],
    }),
    addSubject: builder.mutation({
      query: (subject) => ({
        url: 'subject/store',
        method: 'POST',
        body: subject,
      }),
      invalidatesTags: ['Subject'],
    }),
    updateSubject: builder.mutation({
      query: ({ id, ...subject }) => ({
        url: `subject/${id}/update`,
        method: 'PUT',
        body: subject,
      }),
      invalidatesTags: ['Subject'],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetAllSubjectQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation
} = subjectApiSlice;
