import { createSlice } from '@reduxjs/toolkit';
import type { Split } from '../types/split';

const initialSplit: Split = {
  days: 0,
  weeks: 0,
  categories: {},
};

export const splitSplice = createSlice({
  name: 'split',
  initialState: initialSplit,
  reducers: {
    createSplit: (state, action: { payload: Split }) => {
      console.log(action.payload);
      state = action.payload;
    },
  },
});

export const { createSplit } = splitSplice.actions;
export default splitSplice.reducer;
