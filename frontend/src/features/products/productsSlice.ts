import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { RootState } from '../../app/store';
import { createProduct, fetchProducts } from './productsThunks';

interface ProductsState {
  items: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.createLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsFetching = (state: RootState) => state.products.fetchLoading;
export const selectProductCreating = (state: RootState) => state.products.createLoading;
