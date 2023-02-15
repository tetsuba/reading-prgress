import { createSelector } from '@reduxjs/toolkit'

const stateUser = (state: any) => state.user

export const userTokenSelector = createSelector(stateUser, (user) => user.token)
export const userIdSelector = createSelector(stateUser, (user) => user.id)
