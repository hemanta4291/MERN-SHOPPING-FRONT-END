import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { signInUser } from "./signInAPI";
import { removeData, setData } from "../../utils/localStorageConfig";

const initialState = {
    user:undefined,
    accessToken:undefined,
    isLoading: false,
    isError: false,
    error: "",
    message:''
};

// async thunk
export const signIn = createAsyncThunk(
    "signin/fetchSignin",
    async (data) => {
        const user = await signInUser(data);
        return user;
    }
);

const signInSlice = createSlice({
    name: "signin",
    initialState,
    reducers:{
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state, action) => {
            state.accessToken = undefined
            state.user = undefined;
            removeData(import.meta.env.VITE_LOCAL_USER)
            removeData(import.meta.env.VITE_ACCESS_TOKEN)
            toast("Logout done successfully",{autoClose:1000})
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.message = '';
                state.user = undefined;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.data
                state.accessToken = action.payload.accessToken
                state.message = action.payload.message
                setData(import.meta.env.VITE_LOCAL_USER,action.payload.data)
                setData(import.meta.env.VITE_ACCESS_TOKEN,action.payload.accessToken)
                toast(action.payload.message,{autoClose:1000})
                
            })
            .addCase(signIn.rejected, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.isError = true;
                state.user = undefined;
                state.message =action.error?.message;
                state.error = action.error?.message;
                toast(action.error?.message,{autoClose:1000})
            });
           
    },
});
export const {userLoggedIn,userLoggedOut} = signInSlice.actions
export default signInSlice.reducer;
