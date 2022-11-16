import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useUpdateSubjectMutation,
  useDeleteSubjectMutation
} = subjectApiSlice;
