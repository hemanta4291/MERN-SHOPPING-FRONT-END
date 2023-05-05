import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPublicItem } from "./publicItemAPI";

const initialState = {
    items:[],
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const getIFetchtems = createAsyncThunk(
    "publicItems/fetchPublicItems",
    async (fromData) => {
        const user = await getPublicItem(fromData);
        return user;
    }
);

const publicSlice = createSlice({
    name: "publicItems",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getIFetchtems.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getIFetchtems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data
            })
            .addCase(getIFetchtems.rejected, (state, action) => {
                // console.log(action.error)
                state.isLoading = false;
                state.isError = true;
                state.items = []
                state.error = action.error?.message;
            });
           
    },
});

export default publicSlice.reducer;
