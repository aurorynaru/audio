import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    mode: 'dark',
    user: null,
    token: null,
    authMode: null
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
        },
        setAuthMode: (state, action) => {
            state.authMode = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setMode, setLogin, setAuthMode } = userSlice.actions

export default userSlice.reducer
