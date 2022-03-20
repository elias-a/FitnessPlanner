import { createSlice } from '@reduxjs/toolkit';
import type { Split } from '../types/split';

const initialSplit: Split = {
  days: 0,
  weeks: 0,
  categories: {},
  exercises: {},
};

export const splitSplice = createSlice({
  name: 'split',
  initialState: initialSplit,
  reducers: {
    createSplit: (state, action: { payload: Split }) => {
      state = action.payload;
    },
  },
});

export const { createSplit } = splitSplice.actions;
export default splitSplice.reducer;
