import { apiSlice } from "./apiSlice";

export const majorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMajor: builder.query({
            query: () => `major/get-all`,
            providesTags: ['MajorSubject'],
        }),
        deleteMajor: builder.mutation({
            query: (id) => ({
                url: `major/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MajorSubject'],
        }),
        AddMajor: builder.mutation({
            query: (major) => ({
                url: 'major/store',
                method: 'POST',

                body: major,
            }),
            invalidatesTags: ['MajorSubject']
        }),
        updateMajor: builder.mutation({
            query: ({ id, ...major }) => ({
                url: `major/${id}/update`,
                method: 'PUT',
                body: major,
            }),
            invalidatesTags: ['MajorSubject'],
        }),
    }),
});

export const {
    useGetAllMajorQuery,
    useAddMajorMutation,
    useUpdateMajorMutation,
    useDeleteMajorMutation,
} = majorApiSlice