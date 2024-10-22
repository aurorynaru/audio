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
