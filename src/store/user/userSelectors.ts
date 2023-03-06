import { createSelector } from '@reduxjs/toolkit'

export const userSelector = (state: any) => state.user
export const userTokenSelector = createSelector(userSelector, (user) => user.token)
export const userIdSelector = createSelector(userSelector, (user) => user.id)
