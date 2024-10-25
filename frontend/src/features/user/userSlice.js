import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    mode: 'dark',
    user: null,
    token: null,
    isAuthenticated: false,
    authMode: {
        login: false,
        register: false,
        close: true
    },
    SessionExpired: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isAuthenticated = true
        },
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setAuthMode: (state, action) => {
            state.authMode = action.payload
        },

        setSessionExpired: (state, action) => {
            state.SessionExpired = action.payload
        },
        setLogOut: (state, action) => {
            state.user = null
            state.token = null
            localStorage.removeItem('accessToken')
            state.isAuthenticated = false
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setMode,
    setLogin,
    setAuthMode,
    setSessionExpired,
    setToken,
    setUser,
    setLogOut
} = userSlice.actions

export default userSlice.reducer

export const rehydrateAuth = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        try {
            // Optionally verify accessToken with an API call
            const response = await api.get('api/auth/verify-token', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            const userData = response.data // Assume the user data is returned

            // Set the credentials in Redux if token is valid
            dispatch(setCredentials({ user: userData, accessToken }))
        } catch (err) {
            // If accessToken is invalid/expired, try to refresh it
            try {
                const refreshResponse = await api.post('api/auth/refresh-token')
                const { accessToken, user } = refreshResponse.data

                localStorage.setItem('accessToken', accessToken) // Save the new access token
                dispatch(setCredentials({ user, accessToken })) // Rehydrate Redux state
            } catch (refreshError) {
                // If refresh token also fails, log the user out
                dispatch(logout())
            }
        }
    }
}
