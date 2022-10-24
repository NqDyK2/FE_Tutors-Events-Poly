import { apiSlice } from './apiSlice';

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => `major/get-all`,
      providesTags: ['Subject'],
    }),
    deleteSubject: builder.query({
      query: (id) => ({
        url: `major/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subject'],
    }),
    addSubject: builder.mutation({
      query: (major) => ({
        url: 'major/store',
        method: 'POST',
        body: major,
      }),
      invalidatesTags: ['Subject'],
    }),
    updateSubject: builder.mutation({
      query: ({ id, ...major }) => ({
        url: `major/${id}/update`,
        method: 'PUT',
        body: major,
      }),
      invalidatesTags: ['Subject'],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetAllSubjectQuery,
  useDeleteSubjectQuery,
  useUpdateSubjectMutation,
} = lessonApiSlice;
