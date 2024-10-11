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

            if (index !== -1) {
                state.audios[index] = {
                    ...state.audios[index],
                    ...updatedAudio
                }
            }
        },

        updateComments: (state, action) => {
            const updateComment = action.payload
            const index = state.audios.findIndex(
                (audio) => audio.id === updatedAudio.id
            )

            if (index !== -1) {
                // state.audios[index] = {
                //     ...state.audios[index],
                //     ...updatedAudio
                // }
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAudio, updateLikeDislike, updateComments } =
    audioSlice.actions

export default audioSlice.reducer
