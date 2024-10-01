import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    playerId: null
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayer: (state, action) => {
            state.playerId = action.payload.id
        }
    }
})

// Action creators are generated for each case reducer function
export const { setPlayer } = playerSlice.actions

export default playerSlice.reducer
