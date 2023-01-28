import {createSelector} from '@reduxjs/toolkit'

const stateUser = (state: any) => state.user

export const userTokenSelector = createSelector(stateUser, (user) => user.token)
