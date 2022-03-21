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
      const { days, weeks, categories, exercises } = action.payload;

      state.days = days;
      state.weeks = weeks;
      state.categories = categories;
      state.exercises = exercises;
    },
  },
});

export const { createSplit } = splitSplice.actions;
export default splitSplice.reducer;
