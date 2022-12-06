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
                url: `evnet/${id}/update`,
                method: 'PUT',
                body: event,
                exceptContentType: true,
            }),
            invalidatesTags: ['Event'],
        }),
        cancelEvent: builder.mutation({
            query: () => ({
                url: `event/cancel`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),
    }),
});

export const {
    useAddEventMutation,
    useCancelEventMutation,
    useDeleteEventMutation,
    useGetAllEventQuery,
    useUpdateEventMutation
} = eventApiSlice