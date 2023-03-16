import { createSelector } from '@reduxjs/toolkit'
import { StateUserTypes, StateTypes } from '../store-types'

export const userSelector = (state: StateTypes) => state.user
export const userTokenSelector = createSelector(
    userSelector,
    (user: StateUserTypes) => user.token
)
export const userIdSelector = createSelector(
    userSelector,
    (user: StateUserTypes) => user.id
)
