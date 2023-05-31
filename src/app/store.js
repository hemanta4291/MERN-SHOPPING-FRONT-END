import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/auth/signUpSlice';
import signInReducer from '../features/auth/signInSlice';
import publicItemReducer from '../features/publicItems/publicItemSlice';
import userItemReducer from '../features/item/itemSlice';
import adminDataReducer from '../features/admin/adminSlice';
import editUserReducer from '../features/admin/singleUserSlice';
import pdfReducer from '../features/pdf/pdfSlice';

export const store = configureStore({
  reducer: {
    signup: signUpReducer,
    auth: signInReducer,
    publicItems: publicItemReducer,
    userItems:userItemReducer,
    pdf:pdfReducer,
    admin:adminDataReducer,
    editUser:editUserReducer
  },
});