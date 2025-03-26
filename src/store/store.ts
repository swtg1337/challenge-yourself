import { configureStore} from '@reduxjs/toolkit'
import challengeReducer from './challengeSlice'

export const store = configureStore({
    reducer: {
        challenges: challengeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch