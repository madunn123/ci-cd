import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const initialState = {
    token: null,
    user: null,

    dataAsyncRegister: null,
    loadingAsyncRegister: false,
    errorAsyncRegister: null,

    dataAsyncLogin: null,
    loadingAsyncLogin: false,
    errorAsyncLogin: null,

    loadingAsyncMe: false,
    errorAsyncMe: null
}

export const asyncRegister = createAsyncThunk(
    'auth/asyncRegister',
    async ({ email, name, password }) => {
        const user = userService.register({ name, email, password });
        return user;
    }
)

export const asyncLogin = createAsyncThunk(
    'auth/asyncLogin',
    async ({ email, password }) => {
        const token = userService.login({ email, password });
        return token;
    }
)

export const asyncMe = createAsyncThunk(
    'auth/asyncMe',
    async (_, {
        dispatch
    }) => {
        try {
            dispatch(showLoading());
            const user = userService.me();
            return user;

        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(hideLoading());
        }

    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(asyncRegister.pending, (state) => {
            state.loadingAsyncRegister = true;
        })
        addCase(asyncRegister.fulfilled, (state, action) => {
            // state.loadingAsyncRegister = false;
            // state.dataAsyncRegister = action.payload;
        })
        addCase(asyncRegister.rejected, (state, action) => {
            state.loadingAsyncRegister = false;
            state.errorAsyncRegister = action.error;
        })

        addCase(asyncLogin.pending, (state) => {
            state.loadingAsyncLogin = true;
        })
        addCase(asyncLogin.fulfilled, (state, action) => {
            state.loadingAsyncLogin = false;
            state.token = action.payload;
            state.dataAsyncLogin = action.payload;
        })
        addCase(asyncLogin.rejected, (state, action) => {
            state.loadingAsyncLogin = false;
            state.errorAsyncLogin = action.error;
        })

        addCase(asyncMe.pending, (state) => {
            state.loadingAsyncMe = true;
        })
        addCase(asyncMe.fulfilled, (state, action) => {
            state.loadingAsyncMe = false;
            state.user = action.payload;
        })
        addCase(asyncMe.rejected, (state, action) => {
            state.loadingAsyncMe = false;
            state.errorAsyncLogin = action.error;
        })
    }
})

export const authState = (state) => state.auth;

export const { logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;