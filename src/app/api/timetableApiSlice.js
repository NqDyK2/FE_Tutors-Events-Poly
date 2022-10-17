import {apiSlice} from "./apiSlice";

export const timetableApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTimeTable: builder.query({
            query:() => ({
                url:"student/lessons",
            }),
            providesTags:["Timetable"],
        })
    })
})

export const {
    useGetAllTimeTableQuery
} = timetableApiSlice