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

        addComments: (state, action) => {
            const commentsList = action.payload.comment
            const id = action.payload.id
            const index = state.audios.findIndex((audio) => audio.id === id)

            if (index !== -1) {
                // Check if the audio post already has a comments array
                if (!state.audios[index].comments) {
                    // If no comments array exists, initialize it as an empty array
                    state.audios[index].comments = []
                }

                // Append the new comments to the existing comments array
                state.audios[index].comments = [
                    ...state.audios[index].comments,
                    ...commentsList
                ]
            }
        },

        updateComments: (state, action) => {
            const updateComment = action.payload
            const index = state.audios.findIndex(
                (audio) => audio.id === updateComment.id
            )

            const message = {
                id: updateComment.id,
                content: updateComment.content,
                commentId: updateComment.id,
                userId: updateComment.userId,
                User: updateComment.user,
                parentReplyId: updateComment.parentReplyId
                    ? updateComment.parentReplyId
                    : null
            }

            if (index !== -1) {
                const comments = [...state.audios[index].comments]
                comments.push(message)

                console.log(comments)

                state.audios[index] = {
                    ...state.audios[index]
                }
                state.audios[index].comments = comments
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAudio, updateLikeDislike, updateComments, addComments } =
    audioSlice.actions

export default audioSlice.reducer
