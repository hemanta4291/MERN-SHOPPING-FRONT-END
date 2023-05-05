import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemAPI,deleteItemAPI, createItemAPI,updateItemAPI } from "./itemAPI";
import { toast } from "react-toastify";

const initialState = {
    items:[],
    isLoading:true,
    isModal:false,
    isError: false,
    error: "",
    message:''
};

// async get items
export const getIFetchtemBySingleUser = createAsyncThunk(
    "itemSlice/fetchItems",
    async (formData) => {
        const items = await getItemAPI(formData);
        return items;
    }
);

// async create item
export const createItemBySingleUser = createAsyncThunk(
    "itemSlice/createItem",
    async (item) => {
        const items = await createItemAPI(item);
        return items;
    }
);

// async update item
export const updateItemBySingleUser = createAsyncThunk(
    "itemSlice/updateItem",
    async ({id,name}) => {
        const item = await updateItemAPI({id,name});
        return item;
    }
);

// async delete items
export const deleteItemBySingleUser = createAsyncThunk(
    "itemSlice/delteItem",
    async (id) => {
        const item = await deleteItemAPI(id);
        return item;
    }
);

const itemSlice = createSlice({
    name: "itemSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(createItemBySingleUser.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message=''
                console.log('create.........')
            })
            .addCase(createItemBySingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isModal = false,
                state.isError = false;
                state.items.push(action.payload.data)
                state.message = action.payload.message
                toast(action.payload.message,{autoClose:1000})
            })
            .addCase(createItemBySingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isModal = true
                state.isError = true;
                state.message =action.error?.message;
                state.error = action.error?.message;
                toast(action.error?.message,{autoClose:1000})
            })
            .addCase(updateItemBySingleUser.pending, (state) => {
                state.isLoading = true;
                state.message=''
                console.log('update.........')
            })
            .addCase(updateItemBySingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isModal = false,
                state.isError = false
                state.items = state.items.map((item)=>{
                    if(item._id === action.payload.data._id){
                        return {
                            ...item,
                            name: action.payload.data.name
                        }
                    }
                    return item
                })
                state.message = action.payload.message
                toast(action.payload.message,{autoClose:1000})
            })
            .addCase(updateItemBySingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isModal = true,
                state.isError = true;
                state.message =action.error?.message;
                state.error = action.error?.message;
                toast(action.error?.message,{autoClose:1000})
            })
            .addCase(getIFetchtemBySingleUser.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message=''
                console.log('fatching.........')
            })
            .addCase(getIFetchtemBySingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data
                state.message = action.payload.message
            })
            .addCase(getIFetchtemBySingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.items = []
                state.error = action.error?.message;
            })
            .addCase(deleteItemBySingleUser.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.message=''
                console.log('delte.........')
            })
            .addCase(deleteItemBySingleUser.fulfilled, (state, action) => {
                state.items = state.items.filter((item)=>item._id !== action.payload.data._id)
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(deleteItemBySingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });

           
    },
});

export default itemSlice.reducer;
