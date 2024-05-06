import apiService from "./apiServices"

const voteService = {
    upVoteThread: async (id) => {
        const response = await apiService.post(`/threads/${id}/up-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },
    downVoteThread: async (id) => {
        const response = await apiService.post(`/threads/${id}/down-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },
    neutralizeVoteThread: async (id) => {
        const response = await apiService.post(`/threads/${id}/neutral-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },

    upVoteComment: async ({id, commentId}) => {
        const response = await apiService.post(`/threads/${id}/comments/${commentId}/up-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },
    downVoteComment: async ({id, commentId}) => {
        const response = await apiService.post(`/threads/${id}/comments/${commentId}/down-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },
    neutralizeVoteComment: async ({id, commentId}) => {
        const response = await apiService.post(`/threads/${id}/comments/${commentId}/neutral-vote`);
        const { data: { data: { vote } } } = response;

        return vote;
    },
}

export default voteService;