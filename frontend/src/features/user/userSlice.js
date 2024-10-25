import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
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
    let accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        try {
            const response = await axios.get(
                'http://localhost:3003/api/auth/verify-token',
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )
            const { userData, newAccessToken } = response.data

            dispatch(setLogin({ user: userData, newAccessToken }))
            return
        } catch (err) {
            console.warn('Access token expired, attempting to refresh...')
        }
    }

    // If accessToken is undefined or invalid, try refreshing it
    try {
        const refreshResponse = await axios.post(
            'http://localhost:3003/api/auth/refresh-token'
        )
        const { newAccessToken, user } = refreshResponse.data

        // Save the new access token
        localStorage.setItem('accessToken', newAccessToken)

        // Update Redux state
        dispatch(setLogin({ user, newAccessToken }))
    } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError)

        // If refresh token fails, log the user out
        dispatch(setLogOut())
    }
}
