import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart/CartSlice'

const store = configureStore({
    reducer:{
        cart: cartReducer,
    },
});
export default store