import apiService from "./apiServices"

const commentService = {
    comment: async ({ id, content }) => {
        const response = await apiService.post(`/threads/${id}/comments`, { content });
        const { data: { data: { comment } } } = response;
        return comment
    }
}

export default commentService;