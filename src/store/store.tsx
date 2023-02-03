import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/userSlice'
import { bookSlice } from './book/bookSlice'

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        book: bookSlice.reducer
    },
    devTools: true
})
