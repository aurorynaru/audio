export const api = axios.create({
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: import.meta.env.VITE_API_URL
})
