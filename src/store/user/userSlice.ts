import { createSlice } from '@reduxjs/toolkit'
import ls from '../../lib/localStorage'
import { ActionUserUpdateTypes, StateUserTypes } from '../store.types'

export const initialState: StateUserTypes = {
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: ActionUserUpdateTypes) => {
            ls.save(action.payload.token)
            state.firstName = action.payload.user.firstName
            state.lastName = action.payload.user.lastName
            state.email = action.payload.user.email
            state.id = action.payload.user.id
            state.token = action.payload.token
        },
        resetUserToInitialState: () => initialState
    }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUserToInitialState } = userSlice.actions

export default userSlice.reducer
