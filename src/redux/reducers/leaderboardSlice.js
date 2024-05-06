import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import leaderboardService from "../../services/leaderboardService";

const initialState = {
    leaderboards: [],
    loading: false,
    error: null,
}

export const asyncLeaderboard = createAsyncThunk(
    'leaderboard/asyncLeaderboard',
    async () => {
        const leaderboard = await leaderboardService.leaderboard();
        return leaderboard;
    }
)

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(asyncLeaderboard.pending, (state) => {
            state.loading = true;
        })
        addCase(asyncLeaderboard.fulfilled, (state, action) => {
            state.loading = false;
            state.leaderboards = action.payload;
        })
        addCase(asyncLeaderboard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export const leaderboardState = (state) => state.leaderboard;

const leaderboardReducer = leaderboardSlice.reducer;

export default leaderboardReducer;
