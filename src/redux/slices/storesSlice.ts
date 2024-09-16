import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../storeTypes';

interface StoresState {
  stores: Store[];
}

const initialState: StoresState = {
  stores: [],
};

const storesSlice = createSlice({
  name: 'allStores',
  initialState,
  reducers: {
    setStores(state, action: PayloadAction<Store[]>) {
      state.stores = action.payload;
    },
  },
});

export const { setStores } = storesSlice.actions;
export default storesSlice.reducer;
