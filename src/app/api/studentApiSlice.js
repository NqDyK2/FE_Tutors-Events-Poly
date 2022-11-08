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
                method: 'PUT'
            }),
            invalidatesTags: ['Student'],
        }),
        getScheduleTeaching: builder.query({
            query: () => ({
                url: `teacher-tutor/schedule`,
                method: 'GET',
            }),
            invalidatesTags: ['Teaching'],
        })
    }),
});

export const {
    useGetAllMissingClassQuery,
    useGetScheduleQuery,
    useJoinClassMutation,
    useGetScheduleTeachingQuery,
} = studentApiSlice;
