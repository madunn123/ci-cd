import axios from "axios";

let store;

export const injectStore = (_store) => {
    store = _store;
}

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API || 'https://forum-api.dicoding.dev/v1',
    headers: {
        "Content-Type": 'application/json'
    }
});

apiService.interceptors.request.use(
    (config) => {
        const { token } = store.getState().auth;

        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default apiService;
