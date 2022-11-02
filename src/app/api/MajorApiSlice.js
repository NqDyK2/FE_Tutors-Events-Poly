import { apiSlice } from "./apiSlice";

export const majorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMajor: builder.query({
            query: () => `major/get-all`,
            providesTags: ['Major'],
        }),
        deleteMajor: builder.query({
            query: (id) => ({
                url: `major/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Major'],
        }),
        AddMajor: builder.mutation({
            query: (major) => ({
                url: 'major/store',
                method: 'POST',

                body: major,
            }),
            invalidatesTags: ['Major']
        }),
        updateMajor: builder.mutation({
            query: ({ id, ...major }) => ({
                url: `major/${id}/update`,
                method: 'PUT',
                body: major,
            }),
            invalidatesTags: ['Major'],
        }),
    }),
});

export const {
    useGetAllMajorQuery,
    useAddMajorMutation,
    useUpdateMajorMutation,
    useDeleteMajorQuery,
} = majorApiSlice