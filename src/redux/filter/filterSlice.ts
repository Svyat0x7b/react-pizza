import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, Sort } from './types';
import { SortPropertyEnum } from './types';

export const initialState: IFilterSliceState = {
    searchValue: '',
    currPage: 1,
    activeCategory: 0,
    activeSort: {
        name: 'popularity',
        sortProp: SortPropertyEnum.RATING_DESC,
    },
    category: 0,
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload;
        },
        setActiveSort(state, action: PayloadAction<Sort>) {
            state.activeSort = action.payload;
        },
        setCurrPage(state, action: PayloadAction<number>) {
            state.currPage = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            state.currPage = Number(action.payload.currPage);
            state.activeCategory = Number(action.payload.activeCategory);
            state.activeSort = action.payload.activeSort;
        },
    },
});

export const { setSearchValue, setActiveCategory, setActiveSort, setCurrPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
