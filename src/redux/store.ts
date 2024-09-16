import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
