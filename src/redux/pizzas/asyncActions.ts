import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";
import axios from "axios";

export const fetchItems = createAsyncThunk<Pizza[],Record<string, string>>('pizzas/fetchPizzasStatus', 
async (params) => {
    const { selectedCategory, selectedSort, selectedOrder, selectedSearch, currPage } = params;
    const { data } = await axios.get(
        `https://64a8288adca581464b8568db.mockapi.io/api/v1/pizzas?page=${currPage}&limit=4&${selectedCategory}&${selectedSort}&${selectedOrder}&${selectedSearch}`,
    );
    return data;
});