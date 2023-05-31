import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPdf } from "./pdfAPI";

const initialState = {
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const getIFetchPdf = createAsyncThunk(
    "pdf/pdfFetch",
    async () => {
        const pdf = await getPdf();
        return pdf;
    }
);

const pdfSlice = createSlice({
    name: "pdf",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getIFetchPdf.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getIFetchPdf.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data
            })
            .addCase(getIFetchPdf.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
           
    },
});

export default pdfSlice.reducer;
