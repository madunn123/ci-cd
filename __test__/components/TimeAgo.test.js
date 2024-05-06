/**
 * test scenario for leaderboardSlice
 *
 * 1. asyncThunks
 * - should return leaderboard when given by asyncLeaderboard thunk
 * - should return error when given by asyncLeaderboard thunk
 */
 
import { asyncLeaderboard } from '../../src/redux/reducers/leaderboardSlice'; 
import leaderboardService from '../../src/services/leaderboardService';
import { describe, it, expect, vi, beforeEach } from 'vitest';
 
const fakeLeaderboard = [
  {
    id: 1,
    name: 'Firman Mardiyanto',
  },
];
 
const fakeError = new Error('Something went wrong');
 
describe('leaderboardSlice', () => {
  describe('asyncThunks', () => {
    beforeEach(() => {
      leaderboardService._leaderboard = leaderboardService.leaderboard;
    });
 
    it('should return leaderboard when given by asyncLeaderboard thunk', async () => {
      leaderboardService.leaderboard = vi.fn().mockResolvedValue(fakeLeaderboard);
 
      const dispatch = vi.fn();
      const getState = vi.fn();
 
      await asyncLeaderboard()(dispatch, getState, {});
 
      expect(leaderboardService.leaderboard).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.fulfilled.type,
          payload: fakeLeaderboard,
        }),
      );
    });
 
    it('should return error when given by asyncLeaderboard thunk', async () => {
      leaderboardService.leaderboard = vi.fn().mockRejectedValue(fakeError);
 
      const dispatch = vi.fn();
 
      await asyncLeaderboard()(dispatch);
 
      expect(leaderboardService.leaderboard).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.rejected.type,
        }),
      );
    });
  });
});