import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => `major/get-all`,
      providesTags: ['MajorSubject'],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subject/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MajorSubject'],
    }),
    addSubject: builder.mutation({
      query: (subject) => ({
        url: 'subject/store',
        method: 'POST',
        body: subject,
      }),
      invalidatesTags: ['MajorSubject'],
    }),
    updateSubject: builder.mutation({
      query: ({ id, ...subject }) => ({
        url: `subject/${id}/update`,
        method: 'PUT',
        body: subject,
      }),
      invalidatesTags: ['MajorSubject'],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetAllSubjectQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation
} = subjectApiSlice;
