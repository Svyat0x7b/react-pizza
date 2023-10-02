import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from './asyncActions';
import { IPizzaSliceState, Pizza } from './types';
import { Status } from './types';



export const initialState: IPizzaSliceState = {
    items: [],
    itemById: {
        id: '',
        name: '',
        price: 0,
        imageUrl: '',
        types: [],
        sizes: [],
        rating: 0,
        category: 0
    },
    status: Status.LOADING, //loading, success, error
};


export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = Status.LOADING;
            state.items = []; 
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        });
    }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
