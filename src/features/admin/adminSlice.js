import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { updateUser ,getUser, deleteUser} from "./adminAPI";

const initialState = {
    users:[],
    isLoading: false,
    isError: false,
    error: "",
    message:''
};

// async thunk
export const fetchUsers = createAsyncThunk(
    "admin/fetchusers",
    async () => {
        const user = await getUser();
        return user;
    }
);

// async thunk update
export const updateUserFetch = createAsyncThunk(
    "admin/updateUser",
    async (data) => {
        const user = await updateUser(data);
        return user;
    }
);

// delte user

export const deleteUserFetch = createAsyncThunk(
    "admin/deleteUser",
    async (id) => {
        const user = await deleteUser(id);
        return user;
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.message = '';
                state.users = undefined;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.users = action.payload.data
                
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.users = undefined;
                state.message =action.error?.message;
                state.error = action.error?.message;
                // toast(action.error?.message,{autoClose:1000})
            })
            .addCase(updateUserFetch.pending, (state) => {
                state.isLoading = true;
                state.message = '';
                state.users = undefined;
            })
            .addCase(updateUserFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.users = action.payload.data
                state.message = action.payload.message
                toast(action.payload.message,{autoClose:1000})
                
            })
            .addCase(updateUserFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.users = undefined;
                state.message =action.error?.message;
                state.error = action.error?.message;
            })
            .addCase(deleteUserFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.users = state.users.filter((user)=>user._id !== action.payload.data._id)
                state.message = action.payload.message
                toast(action.payload.message,{autoClose:1000})
                
            })
            .addCase(deleteUserFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.users = undefined;
                state.message =action.error?.message;
                state.error = action.error?.message;
            });
           
    },
});

export default adminSlice.reducer;
