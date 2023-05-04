import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./signUpAPI";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    isError: false,
    error: "",
    message:'',
    navigateUrl:false,
};

// async thunk
export const signUp = createAsyncThunk(
    "signup/fetchSignup",
    async (data) => {
        const user = await createUser(data);
        return user;
    }
);

const signUpSlice = createSlice({
    name: "signup",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.navigateUrl = true
                state.message = action.payload.message
                state.error=""
                toast(action.payload.message,{autoClose:1000})
            })
            .addCase(signUp.rejected, (state, action) => {
                // console.log(action.error)
                state.isLoading = false;
                state.isError = true;
                state.navigateUrl = false
                state.message =action.error?.message;
                state.error = action.error?.message;
                toast(action.error?.message,{autoClose:2000})
            });
           
    },
});

export default signUpSlice.reducer;
