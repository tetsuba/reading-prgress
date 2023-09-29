import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/userSlice'
import { bookSlice } from './book/bookSlice'
import { viewSlice } from './view/viewSlice'
import { booksSlice } from './books/booksSlice'
import { studentsSlice } from './students/studentsSlice'
import { studentSlice } from './student/studentSlice'

const store = configureStore({
    reducer: {
        book: bookSlice.reducer,
        books: booksSlice.reducer,
        student: studentSlice.reducer,
        students: studentsSlice.reducer,
        user: userSlice.reducer,
        view: viewSlice.reducer
    },
    devTools: true
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
