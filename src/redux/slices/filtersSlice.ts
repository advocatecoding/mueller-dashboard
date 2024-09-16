import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  region: string;
  sections: string[];
}

const initialState: FiltersState = {
  region: '',
  sections: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
    setSections(state, action: PayloadAction<string[]>) {
      state.sections = action.payload;
    },
  },
});

export const { setRegion, setSections } = filtersSlice.actions;
export default filtersSlice.reducer;
