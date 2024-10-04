import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    audios: []
}

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setAudio: (state, action) => {
            state.audios = action.payload
        },

        updateLikeDislike: (state, action) => {
            const updatedAudio = action.payload
            const index = state.audios.findIndex(
                (audio) => audio.id === updatedAudio.id
            )
            console.log(updatedAudio)
            if (index !== -1) {
                state.audios[index] = {
                    ...state.audios[index],
                    ...updatedAudio
                }
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAudio, updateLikeDislike } = audioSlice.actions

export default audioSlice.reducer
