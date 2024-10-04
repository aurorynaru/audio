import axios from 'axios'

export const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') // Assuming you store accessToken in localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle 401 or 403 errors
api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 || error.response.status === 403) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_REFRESH_TOKEN_URL,
                    {},
                    { withCredentials: true }
                )

                const newAccessToken = response.data.accessToken

                localStorage.setItem('accessToken', newAccessToken)

                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                console.log('Refresh token expired or invalid', refreshError)
                return Promise.reject(refreshError)
            }
        }
        //localhost:3003/api/auth/refresh
        http: return Promise.reject(error)
    }
)

export const convertBlobUrlToFile = async (
    blobUrl,
    fileName,
    mimeType = 'image/png'
) => {
    // Fetch the blob data
    const response = await fetch(blobUrl)
    const blob = await response.blob()

    // Create a File object from the blob
    const file = new File([blob], fileName, { type: mimeType })

    return file
}
