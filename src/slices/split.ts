import { createSlice } from '@reduxjs/toolkit';
import type { Split, SplitExercise } from '../types/split';
import {
  getSplits as getSplitsTask,
  createSplit as createSplitTask,
} from '../models/tasks/split';

const initialSplit: Split = {
  id: '',
  startDate: '',
  endDate: '',
  categories: {},
  exercises: {},
};

export const splitSplice = createSlice({
  name: 'split',
  initialState: initialSplit,
  reducers: {
    getSplits: (state, _action: {}) => {
      const splits = getSplitsTask();
      console.log('slice', splits);

      const today = new Date();
      const currentSplit = splits.find(
        split =>
          today >= new Date(split.startDate) &&
          today <= new Date(split.endDate),
      );

      if (currentSplit) {
        state.id = currentSplit.id;
        state.startDate = currentSplit.startDate;
        state.endDate = currentSplit.endDate;
        state.categories = currentSplit.categories;
        state.exercises = currentSplit.exercises;
      } else {
        state.id = initialSplit.id;
        state.startDate = initialSplit.startDate;
        state.endDate = initialSplit.endDate;
        state.categories = initialSplit.categories;
        state.exercises = initialSplit.exercises;
      }
    },
    createSplit: (state, action: { payload: Split }) => {
      const { id, startDate, endDate, categories, exercises } = createSplitTask(
        action.payload,
      );

      state.id = id;
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

export const { getSplits, createSplit, updateExercises } = splitSplice.actions;
export default splitSplice.reducer;
