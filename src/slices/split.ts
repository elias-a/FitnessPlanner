import { createSlice } from '@reduxjs/toolkit';
import type { Split, SplitExercise } from '../types/split';
import {
  getSplits as getSplitsTask,
  createSplit as createSplitTask,
  deleteSplit as deleteSplitTask,
} from '../models/tasks/split';

const initialCurrentSplit: Split = {
  id: '',
  startDate: '',
  endDate: '',
  categories: {},
  exercises: {},
};

const initialSplits: Split[] = [];

export const splitSplice = createSlice({
  name: 'split',
  initialState: {
    currentSplit: initialCurrentSplit,
    splits: initialSplits,
  },
  reducers: {
    getSplits: (state, _action: {}) => {
      const splits = getSplitsTask();
      state.splits = splits;

      const today = new Date();
      const currentSplit = splits.find(
        split =>
          today >= new Date(split.startDate) &&
          today <= new Date(split.endDate),
      );

      if (currentSplit) {
        state.currentSplit.id = currentSplit.id;
        state.currentSplit.startDate = currentSplit.startDate;
        state.currentSplit.endDate = currentSplit.endDate;
        state.currentSplit.categories = currentSplit.categories;
        state.currentSplit.exercises = currentSplit.exercises;
      } else {
        state.currentSplit.id = initialCurrentSplit.id;
        state.currentSplit.startDate = initialCurrentSplit.startDate;
        state.currentSplit.endDate = initialCurrentSplit.endDate;
        state.currentSplit.categories = initialCurrentSplit.categories;
        state.currentSplit.exercises = initialCurrentSplit.exercises;
      }
    },
    createSplit: (state, action: { payload: Split }) => {
      const { id, startDate, endDate, categories, exercises } = createSplitTask(
        action.payload,
      );

      state.splits.push({ id, startDate, endDate, categories, exercises });

      const today = new Date();
      const currentSplit = state.splits.find(
        split =>
          today >= new Date(split.startDate) &&
          today <= new Date(split.endDate),
      );

      if (currentSplit) {
        state.currentSplit.id = id;
        state.currentSplit.startDate = startDate;
        state.currentSplit.endDate = endDate;
        state.currentSplit.categories = categories;
        state.currentSplit.exercises = exercises;
      }
    },
    updateExercises: (
      state,
      action: { payload: { [key: string]: SplitExercise[] } },
    ) => {
      const splitExercises = action.payload;

      state.currentSplit.exercises = splitExercises;
    },
    deleteSplit: (state, action: { payload: Split }) => {
      const split = deleteSplitTask(action.payload);
      state.splits = state.splits.filter(el => el.id !== split.id);

      if (split.id === state.currentSplit.id) {
        state.currentSplit.id = initialCurrentSplit.id;
        state.currentSplit.startDate = initialCurrentSplit.startDate;
        state.currentSplit.endDate = initialCurrentSplit.endDate;
        state.currentSplit.categories = initialCurrentSplit.categories;
        state.currentSplit.exercises = initialCurrentSplit.exercises;
      }
    },
  },
});

export const { getSplits, createSplit, updateExercises, deleteSplit } =
  splitSplice.actions;
export default splitSplice.reducer;
