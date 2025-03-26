import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store.ts'

type Challenge = {
    id: string;
    title: string;
    description?: string;
    totalDays?: number;
    completedDays: number;
    isCompletedToday: boolean;
}

type  ChallengesState = {
    items: Challenge[];
    loading: boolean;
    error: string | null;
}

const initialState: ChallengesState = {
    items: [],
    loading: false,
    error: null
}

export const fetchChallenges = createAsyncThunk(
    'challenges/fetchChallenges',
    async () => {
        const res = await fetch('http://localhost:3001/challenges')
        const data = await res.json() as Challenge[]

        return data
})

export const deleteChallenge = createAsyncThunk(
    'challenges/deleteChallenge',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/challenges/${id}`, { method: 'DELETE' })

            if (!response.ok) {
                throw new Error('Ошибка удаления челленджа')
            }

            return id
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка сети')
        }
    }
)

export const toggleCompletedDay = createAsyncThunk<
    { id: string; isCompletedToday: boolean },
    string,
    { state: RootState }
>(
    'challenges/toggleCompletedDay',
    async (id: string, { getState, rejectWithValue }) => {
        const challenge = (getState() as { challenges: ChallengesState }).challenges.items.find(
            (challenge) => challenge.id === id
        )

        if (!challenge) {
            return rejectWithValue('Challenge not found')
        }

        const newIsCompletedToday = !challenge.isCompletedToday

        const response = await fetch(`http://localhost:3001/challenges/${id}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isCompletedToday: newIsCompletedToday,
            }),
        })

        if (response.ok) {
            return { id, isCompletedToday: newIsCompletedToday }
        } else {
            return rejectWithValue('Error updating challenge')
        }
    }
)



const challengeSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        addChallenge: (state, action: PayloadAction<Challenge>) => {
            state.items.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallenges.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchChallenges.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false
            })
            .addCase(fetchChallenges.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Ошибка загрузки челленджей'
            })
            .addCase(deleteChallenge.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteChallenge.fulfilled, (state, action) => {
                state.items = state.items.filter((challenge) => challenge.id !== action.payload);
                state.loading = false
            })
            .addCase(deleteChallenge.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(toggleCompletedDay.fulfilled, (state, action) => {
                const { id, isCompletedToday } = action.payload

                const challenge = state.items.find(challenge => challenge.id === id);

                if (challenge) {
                    challenge.isCompletedToday = isCompletedToday

                    if (isCompletedToday) {
                        challenge.completedDays += 1
                    } else {
                        challenge.completedDays -= 1
                    }
                }
            })
    }
    }
)

export const { addChallenge } = challengeSlice.actions
export default challengeSlice.reducer