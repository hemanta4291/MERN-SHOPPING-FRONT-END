import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { editUser } from "./adminAPI";

const initialState = {
    user:undefined,
    isLoading: false,
    isError: false,
    error: "",
    message:''
};

// async thunk
export const fetchSingleUser = createAsyncThunk(
    "single/fetchusers",
    async (data) => {
        const user = await editUser(data);
        return user;
    }
);

const singleUserSlice = createSlice({
    name: "singleuser",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUser.pending, (state) => {
                state.isLoading = true;
                state.message = '';
                state.user = undefined;
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.data
                // state.accessToken = action.payload.accessToken
                // state.message = action.payload.message
                // setData(import.meta.env.VITE_LOCAL_USER,action.payload.data)
                // setData(import.meta.env.VITE_ACCESS_TOKEN,action.payload.accessToken)
                // toast(action.payload.message,{autoClose:1000})
                
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = undefined;
                state.message =action.error?.message;
                state.error = action.error?.message;
                // toast(action.error?.message,{autoClose:1000})
            });
           
    },
});

export default singleUserSlice.reducer;
