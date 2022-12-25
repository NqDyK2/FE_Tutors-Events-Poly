import { apiSlice } from './apiSlice';

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLesson: builder.query({
      query: (classId) => ({
        url: `classroom/${classId}/lessons`,
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ['Lesson'],
    }),
    getOneLesson: builder.query({
      query: (id) => `lesson/${id}/get-all`,
      providesTags: ['Lesson'],
    }),
    addLesson: builder.mutation({
      query: (lesson) => ({
        url: 'lesson/store',
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: ['Lesson'],
    }),
    updateLesson: builder.mutation({
      query: ({ id, ...lesson }) => ({
        url: `lesson/${id}/update`,
        method: 'PUT',
        body: lesson,
      }),
      invalidatesTags: ['Lesson'],
    }),
    startLesson: builder.mutation({
      query: (id) => ({
        url: `lesson/${id}/start`,
        method: 'PUT',
      }),
      invalidatesTags: ['Lesson'],
    }),
    delLesson: builder.mutation({
      query: (id) => ({
        url: `lesson/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),
  }),
});

export const {
  useGetAllLessonQuery,
  useGetOneLessonQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useStartLessonMutation,
  useDelLessonMutation,
} = lessonApiSlice;
