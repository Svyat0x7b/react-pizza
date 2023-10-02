import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, ICartSliceState } from './types';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const {items, totalPrice, totalAmount} = getCartFromLS();

export const initialState: ICartSliceState = {
    items: items,
    totalPrice: totalPrice,
    totalAmount: totalAmount,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.amount += 1;
            } else {
                state.items.push({ ...action.payload, amount: 1 });
            }

            state.totalPrice = calcTotalPrice(state.items);

            state.totalAmount += 1;
        },
        removeItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                state.totalAmount -= 1;
                state.totalPrice -= findItem.price;

                if (findItem.amount > 1) {
                    findItem.amount -= 1;
                } else {
                    state.items = state.items.filter((obj) => obj.id !== action.payload);
                }
            }
        },
        removeItemCompletly(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                state.totalPrice -= findItem.price * findItem.amount;
                state.totalAmount -= findItem.amount;
            }
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },
    },
});


export const { addItem, removeItem, removeItemCompletly, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
