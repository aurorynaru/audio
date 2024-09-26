import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    mode: 'dark',
    user: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        }
    }
})

// Action creators are generated for each case reducer function
export const { setMode, setLogin } = userSlice.actions

export default counterSlice.reducer
