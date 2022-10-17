import {apiSlice} from './apiSlice'

export const feedbackApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getFeedbackLesson: builder.query({
            query:() => `lesson/${id}/feedback`,
            providesTags:['Feedback'],
        }),
        AddFeedback:builder.mutation({
            query:(data) => ({
                url:`feedback/store`,
                method:'POST',
                body:feedback.data,
                headers: {
                    'Accept': 'application/json',
                }
            }),
            invalidatesTags:["Feedback"],
        }),
    })
});

export const {
    useGetFeedbackLessonQuery,
    useAddFeedbackMutation
} = feedbackApiSlice