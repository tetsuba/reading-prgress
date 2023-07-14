import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/userSlice'
import { bookSlice } from './book/bookSlice'
import { viewSlice } from './view/viewSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        book: bookSlice.reducer,
        view: viewSlice.reducer
    },
    devTools: true
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
