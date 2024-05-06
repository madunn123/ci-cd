import apiService from "./apiServices"

const threadService = {
    create: async ({ title, body, category }) => {
        const response = await apiService.post('/threads', { title, body, category });
        const { data: { data: { thread } } } = response;
        return thread;
    },
    getAll: async () => {
        const response = await apiService.get('/threads');
        const { data: { data: { threads } } } = response;
        return threads;
    },
    detail: async (id) => {
        const response = await apiService.get(`/threads/${id}`)
        const { data: { data: { detailThread } } } = response;
        return detailThread;
    }
}

export default threadService;