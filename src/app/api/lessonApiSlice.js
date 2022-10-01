import { apiSlice } from "./apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllLesson: builder.query({
            query: (classId) => ({
                url: `lesson/${classId}/get-all`
            }),
            providesTags: ["Lesson"],
        }),
        getOneLesson: builder.query({
            query:(id) => `lesson/${id}/get-all`,
            providesTags:["Lesson"],
        }),
        addLesson: builder.mutation({
            query: (lesson) => ({
                url: 'lesson/store',
                method:'POST',
                body:lesson
            }),
            invalidatesTags: ["Lesson"]
        }),
        updateLesson: builder.mutation({
            query: ({id, ...lesson}) => ({
                url: 'lesson/update/' + id,
                method: 'PUT',
                body:lesson,
            }),
            invalidatesTags: ["Lesson"],
        }),
        delLesson: builder.mutation({
            query: (id) => ({
                url: 'lesson/destroy' +id,
                method:'DELETE'
            }),
            invalidatesTags:["Lesson"]
        }),
    }),
});

export const {
    useGetAllLessonQuery,
    useGetOneLessonQuery,
    useAddLessonMutation,
    useUpdateLessonMutation,
    useDelLessonMutation,
} = lessonApiSlice;