import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/userSlice'
import { bookSlice } from './book/bookSlice'
import { viewSlice } from './view/viewSlice'

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        book: bookSlice.reducer,
        view: viewSlice.reducer
    },
    devTools: true
})
