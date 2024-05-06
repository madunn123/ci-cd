import apiService from "./apiServices"

const userService = {
    register: async ({ name, email, password }) => {
        const response = await apiService.post('/register', { name, email, password });
        const { data: { data: { user } } } = response;
        return user;
    },
    login: async ({ email, password }) => {
        const response = await apiService.post('/login', { email, password });
        const { data: { data: { token } } } = response;
        return token;
    },
    users: async () => {
        const response = await apiService.get('/users');
        const { data: { data: { users } } } = response;
        return users;
    },
    me: async () => {
        const response = await apiService.get('/users/me');
        const { data: { data: { user } } } = response;
        return user;
    },
}

export default userService;