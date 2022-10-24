import { apiSlice } from './apiSlice';

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClassInSemester: builder.query({
      query: (id) => `semester/${id}/classrooms`,
      providesTags: ['Classroom'],
    }),
    deleteClassroom: builder.query({
      query: (id) => ({
        url: `classroom/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Classroom'],
    }),
    addClassroom: builder.mutation({
      query: (classroom) => ({
        url: 'classroom/store',
        method: 'POST',
        body: classroom,
      }),
      invalidatesTags: ['Classroom'],
    }),
    updateClassroom: builder.mutation({
      query: ({ id, ...classroom }) => ({
        url: `classroom/${id}/update`,
        method: 'PUT',
        body: classroom,
      }),
      invalidatesTags: ['Classroom'],
    }),
  }),
});

export const {
  useAddClassroomMutation,
  useGetAllClassInSemesterQuery,
  useDeleteClassroomQuery,
  useUpdateClassroomMutation,
} = lessonApiSlice;
