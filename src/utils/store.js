import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './toggleSlice'
import cartSlice from './cartSlice'
import coordinateSlice from './coordinateSlice'
import filterSlice from './filterSlice'
import authSlice from './authSlice'

const store = configureStore({
    reducer:{
        toggleSlice,
        cartSlice,
        coordinateSlice,
        filterSlice,
        authSlice
    }
})
export default store;