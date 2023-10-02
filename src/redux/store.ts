import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filterSlice';
import cartReducer from './cart/cartSlice';
import pizzasReducer from './pizzas/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzas: pizzasReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();