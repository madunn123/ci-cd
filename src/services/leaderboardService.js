import apiService from "./apiServices"

const leaderboardService = {
    leaderboard: async () => {
        const response = await apiService.get('/leaderboards');
        const { data: { data: { leaderboards } } } = response;
        return leaderboards;
    }
}

export default leaderboardService;
