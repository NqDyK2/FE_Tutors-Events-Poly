import { apiSlice } from './apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMissingClass: builder.query({
      query: () => `student/missing-classes`,
      providesTags: ['Student'],
    }),
    getSchedule: builder.query({
      query: () => ({
        url: `student/schedule`,
        method: 'GET',
      }),
      invalidatesTags: ['Student'],
    }),
    joinClass: builder.mutation({
      query: (id) => ({
        url: `student/join-class/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Student'],
    }),
    inViteClass: builder.mutation({
      query: (body) => ({
        url: `mail/invite-class`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Student'],
    }),
    sendMailStudents: builder.mutation({
      query: (body) => ({
        url: 'mail/invite-all',
        body: body,
        method: 'POST',
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `classroom/${id}/update-student`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['Student'],
    }),
    feedbackTutor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `student/feedback/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    checkInTutor: builder.mutation({
      query: (id) => ({
        url: `student/check-in/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Student'],
    }),
    getScheduleTeaching: builder.query({
      query: () => ({
        url: `teacher-tutor/schedule`,
        method: 'GET',
      }),
      invalidatesTags: ['Teaching'],
    }),
    getStudentHistoryLessonBySemester: builder.mutation({
      query: (id) => ({
        url: `student/history/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentCurrentHistoryLesson: builder.query({
      query: () => ({
        url: `student/history`,
        method: 'GET',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useGetAllMissingClassQuery,
  useSendMailStudentsMutation,
  useGetScheduleQuery,
  useJoinClassMutation,
  useInViteClassMutation,
  useGetScheduleTeachingQuery,
  useUpdateStudentMutation,
  useGetStudentCurrentHistoryLessonQuery,
  useGetStudentHistoryLessonBySemesterMutation,
  useFeedbackTutorMutation,
  useCheckInTutorMutation
} = studentApiSlice;
