import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        //TODO: would add more slices here for posts in the future
    }
})

export default store; 