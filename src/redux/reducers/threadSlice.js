import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import threadService from "../../services/threadService";

const initialState = {
    threads: [],
    loadingGetAll: false,
    errorGetAll: null,

    selected: null,

    dataGetDetail: null,
    loadingGetDetail: false,
    errorGetDetail: null,
}

export const asyncCreateThread = createAsyncThunk(
    'thread/asyncCreateThread',
    async ({ title, body, category }) => {
        const thread = await threadService.create({ title, body, category });
        return thread;
    }
)

export const asyncGetAllThread = createAsyncThunk(
    'thread/asyncGetAllThread',
    async () => {
        const thread = await threadService.getAll();
        return thread;
    }
)

export const asyncGetDetail = createAsyncThunk(
    'thread/asyncGetDetail',
    async (id) => {
        const thread = await threadService.detail(id);
        return thread;
    }
)

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        setSelect: (state, action) => {
            state.selected = action.payload;
        },
        setThread: (state, action) => {
            state.threads = state?.threads.map((item) => (item?.id === action.payload.id ? action.payload : item))
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(asyncGetDetail.pending, (state) => {
            state.loadingGetDetail = true;
        })
        addCase(asyncGetDetail.fulfilled, (state, action) => {
            state.loadingGetDetail = false;
            state.dataGetDetail = action.payload;
            state.threads = state.threads.map((item) => (item.id === action.payload.id ? action.payload : item));
        })
        addCase(asyncGetDetail.rejected, (state, action) => {
            state.loadingGetDetail = false;
            state.errorGetDetail = action.error;
        })

        addCase(asyncGetAllThread.pending, (state) => {
            state.loadingGetAll = true;
        })
        addCase(asyncGetAllThread.fulfilled, (state, action) => {
            state.loadingGetAll = false;
            state.threads = action.payload;
        })
        addCase(asyncGetAllThread.rejected, (state, action) => {
            state.loadingGetAll = false;
            state.errorGetAll = action.error
        })

    }
})

export const threadState = (state) => state.thread;

export const getThreadById = (state, id) => state.thread.threads.find((thread) => thread?.id === id);

export const { setSelect, setThread } = threadSlice.actions;

const threadReducer = threadSlice.reducer;

export default threadReducer;