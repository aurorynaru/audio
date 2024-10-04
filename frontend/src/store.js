import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user/userSlice'
import playerReducer from './features/player/playerSlice'
import audioReducer from './features/audio/audioSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        player: playerReducer,
        audio: audioReducer
    }
})
