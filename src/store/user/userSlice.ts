import { createSlice } from '@reduxjs/toolkit'
import ls from '../../lib/localStorage'

export interface UserTypes {
  firstname: string
  lastname: string
  email: string
  token: string
  id: string
}

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  token: '',
  id: '',
} as UserTypes

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      ls.save(action.payload.token)
      state.firstname = action.payload.data.firstName
      state.lastname = action.payload.data.lastName
      state.email = action.payload.data.email
      state.id = action.payload.data.id
      state.token = action.payload.token
    },
    resetUserToInitialState: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUserToInitialState } = userSlice.actions

export default userSlice.reducer
