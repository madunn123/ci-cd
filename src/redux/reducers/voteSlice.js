import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import voteService from "../../services/voteService";
import { getThreadById, setThread } from "./threadSlice";

const initialState = {
    upVoteThread: null,
    loadingUpVoteThread: false,
    errorUpVoteThread: null,

    downVoteThread: null,
    loadingDownVoteThread: false,
    errorDownVoteThread: null,

    neutralVoteThread: null,
    loadingNeutralVoteThread: false,
    errorNeutralVoteThread: null,
}

export const asyncUpVoteThread = createAsyncThunk(
    'vote/asyncUpVoteThread',
    async (thread, {
        getState, dispatch, fulfillWithValue, rejectWithValue
    }) => {
        try {
            const { user } = getState().auth;

            if (user !== null) {
                dispatch(setThread({
                    ...thread,
                    upVotesBy: [...new Set([...thread.upVotesBy, user?.id])],
                    downVotesBy: thread.downVotesBy.filter((id) => id !== user?.id),
                }))
            }

            const vote = await voteService.upVoteThread(thread?.id);
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const asyncDownVoteThread = createAsyncThunk(
    'vote/asyncDownVoteThread',
    async (thread, {
        getState, dispatch, fulfillWithValue, rejectWithValue
    }) => {
        try {
            const { user } = getState().auth;

            if (user !== null) {
                dispatch(setThread({
                    ...thread,
                    downVotesBy: [...new Set([...thread.downVotesBy, user?.id])],
                    upVotesBy: thread.upVotesBy.filter((id) => id !== user?.id),
                }))
            }

            const vote = await voteService.downVoteThread(thread?.id);
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const asyncNeutralizeVoteThread = createAsyncThunk(
    'vote/asyncNeutralizeVoteThread',
    async (thread, {
        getState, dispatch, fulfillWithValue, rejectWithValue
    }) => {
        try {
            const { user } = getState().auth;

            dispatch(setThread({
                ...thread,
                upVotesBy: thread.upVotesBy.filter((id) => id !== user?.id),
                downVotesBy: thread.downVotesBy.filter((id) => id !== user?.id),
            }))

            const vote = await voteService.neutralizeVoteThread(thread?.id);
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const asyncUpVoteComment = createAsyncThunk(
    'vote/asyncUpVoteComment',
    async ({ threadId, comment }, {
        getState, dispatch, fulfillWithValue, rejectWithValue,
    }) => {

        const thread = getThreadById(getState(), threadId);
        const { user } = getState().auth;
        try {
            const newState = {
                ...comment,
                upVotesBy: [...new Set([...comment.upVotesBy, user?.id])],
                downVotesBy: comment.downVotesBy.filter((id) => id !== user?.id),
            }

            if (user !== null) {
                dispatch(setThread({
                    ...thread,
                    comments: thread?.comments.map((c) => ((c.id === comment?.id) ? newState : c)),
                }));
            }

            const vote = await voteService.upVoteComment({ id: threadId, commentId: comment?.id });
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error);
        }
    }
)

export const asyncDownVoteComment = createAsyncThunk(
    'vote/asyncDownVoteComment',
    async ({ threadId, comment }, {
        getState, dispatch, fulfillWithValue, rejectWithValue,
    }) => {

        const thread = getThreadById(getState(), threadId);
        const { user } = getState().auth;
        try {
            const newState = {
                ...comment,
                downVotesBy: [...new Set([...comment.downVotesBy, user?.id])],
                upVotesBy: comment.upVotesBy.filter((id) => id !== user?.id),
            }

            if (user !== null) {
                dispatch(setThread({
                    ...thread,
                    comments: thread?.comments.map((c) => ((c.id === comment?.id) ? newState : c)),
                }));
            }

            const vote = await voteService.downVoteComment({ id: threadId, commentId: comment?.id });
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error);
        }
    }
)

export const asyncNeutralizeVoteComment = createAsyncThunk(
    'vote/asyncNeutralizeVoteComment',
    async ({ threadId, comment }, {
        getState, dispatch, fulfillWithValue, rejectWithValue,
    }) => {

        const thread = getThreadById(getState(), threadId);
        const { user } = getState().auth;
        try {
            const newState = {
                ...comment,
                downVotesBy: comment.downVotesBy.filter((id) => id !== user?.id),
                upVotesBy: comment.upVotesBy.filter((id) => id !== user?.id),
            }

            dispatch(setThread({
                ...thread,
                comments: thread?.comments.map((c) => ((c.id === comment?.id) ? newState : c)),
            }));

            const vote = await voteService.neutralizeVoteComment({ id: threadId, commentId: comment?.id });
            fulfillWithValue(vote);
        } catch (error) {
            rejectWithValue(error);
        }
    }
)

const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(asyncUpVoteThread.pending, (state) => {
            state.loadingUpVoteThread = true;
        })
        addCase(asyncUpVoteThread.fulfilled, (state, action) => {
            state.loadingUpVoteThread = false;
            state.upVoteThread = action.payload;
        })
        addCase(asyncUpVoteThread.rejected, (state, action) => {
            state.loadingUpVoteThread = false;
            state.errorUpVoteThread = action.error;
        })

        addCase(asyncDownVoteThread.pending, (state) => {
            state.loadingDownVoteThread = true;
        })
        addCase(asyncDownVoteThread.fulfilled, (state, action) => {
            state.loadingDownVoteThread = false;
            state.downVoteThread = action.payload;
        })
        addCase(asyncDownVoteThread.rejected, (state, action) => {
            state.loadingDownVoteThread = false;
            state.errorDownVoteThread = action.error;
        })

        addCase(asyncNeutralizeVoteThread.pending, (state) => {
            state.loadingNeutralVoteThread = true;
        })
        addCase(asyncNeutralizeVoteThread.fulfilled, (state, action) => {
            state.loadingNeutralVoteThread = false;
            state.neutralVoteThread = action.payload;
        })
        addCase(asyncNeutralizeVoteThread.rejected, (state, action) => {
            state.loadingNeutralVoteThread = false;
            state.errorNeutralVoteThread = action.error;
        })
    }
})

const voteReducer = voteSlice.reducer;

export default voteReducer;