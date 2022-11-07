import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flexBreadcrumb: "Test"
};

const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setFlexBredcrumb: (state, action) => {
            state.flexBreadcrumb = action.payload
        },
        resetFlexBredcrumb: () => initialState,
    },
});

export const { setFlexBredcrumb, resetFlexBredcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;

export const getFlexBredcrumb = (state) => state.breadcrumb.flexBreadcrumb;