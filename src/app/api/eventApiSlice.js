import { apiSlice } from "./apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvent: builder.query({
            query: () => `event/get-all`,
            providesTags: ['Event'],
        }),
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `event/${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: ['Event'],
        }),
        addEvent: builder.mutation({
            query: (event) => ({
                url: 'event/store',
                method: 'POST',
                body: event,
                exceptContentType: true,
            }),
            invalidatesTags: ['Event']
        }),
        updateEvent: builder.mutation({
            query: ({ id, ...event }) => ({
                url: `event/${id}/update`,
                method: 'POST',
                body: event,
                exceptContentType: true,
            }),
            invalidatesTags: ['Event'],
        }),
        joinEvent: builder.mutation({
            query: (id) => ({
                url: `event/${id}/join`,
                method: "POST",
            }),
            invalidatesTags: ['Event']
        }),
        cancelEvent: builder.mutation({
            query: (id) => ({
                url: `event/${id}/cancel`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),
        getAllTrashEvent: builder.query({
            query: () => `event/in-trash`,
            providesTags: ['Event'],
        }),
        retstoreEvent: builder.mutation({
            query: ({ id }) => ({
                url: `event/${id}/restore`,
                method: "PUT",
            }),
            invalidatesTags: ['Event']
        }),
        feedbackEvent: builder.mutation({
            query: ({ id, fb }) => ({
                url: `event/${id}/feedback`,
                body: fb,
                method: "POST",
            }),
            invalidatesTags: ['Event'],
        })
    }),
});

export const {
    useAddEventMutation,
    useCancelEventMutation,
    useDeleteEventMutation,
    useGetAllEventQuery,
    useUpdateEventMutation,
    useGetAllTrashEventQuery,
    useRetstoreEventMutation,
    useJoinEventMutation,
} = eventApiSlice