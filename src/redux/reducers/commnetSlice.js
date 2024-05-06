import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../../services/commentService";

const initialState = {
    data: null,
    loading: false,
    error: null,
}

export const asyncComment = createAsyncThunk(
    'comment/asyncComment',
    async ({ id, content }) => {
        const comment = await commentService.comment({ id, content });
        return comment;
    }
)

const commentSlice = createSlice({
    name: 'commnet',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(asyncComment.pending, (state) => {
            state.loading = true;
        })
        addCase(asyncComment.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        addCase(asyncComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export const commentState = (state) => state.comment;

const commentReducer = commentSlice.reducer;

export default commentReducer;