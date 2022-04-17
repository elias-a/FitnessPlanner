import { createSlice } from '@reduxjs/toolkit';
import type { Split, SplitExercise } from '../types/split';

const initialSplit: Split = {
  startDate: '',
  endDate: '',
  categories: {},
  exercises: {},
};

export const splitSplice = createSlice({
  name: 'split',
  initialState: initialSplit,
  reducers: {
    createSplit: (state, action: { payload: Split }) => {
      const { startDate, endDate, categories, exercises } = action.payload;

      state.startDate = startDate;
      state.endDate = endDate;
      state.categories = categories;
      state.exercises = exercises;
    },
    updateExercises: (
      state,
      action: { payload: { [key: string]: SplitExercise[] } },
    ) => {
      const splitExercises = action.payload;

      state.exercises = splitExercises;
    },
  },
});

export const { createSplit, updateExercises } = splitSplice.actions;
export default splitSplice.reducer;
