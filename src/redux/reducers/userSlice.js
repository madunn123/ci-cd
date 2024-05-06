import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const asyncGetAllUsers = createAsyncThunk(
    'users/asyncGetAllUsers',
    async () => {
        const users = userService.users();
        return users;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(asyncGetAllUsers.pending, (state) => {
            state.loading = true;
        })
        addCase(asyncGetAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        addCase(asyncGetAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export const userState = (state) => state.users;

const usersReducer = userSlice.reducer;

export default usersReducer;
