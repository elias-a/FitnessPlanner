import { createSlice } from '@reduxjs/toolkit';
import type { Exercise } from '../types/exercise';

const initialExercises: Exercise[] = [];

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: initialExercises,
  },
  reducers: {
    addExercise: (state, action: { payload: Exercise }) => {
      state.exercises.push(action.payload);
    },
  },
});

export const { addExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
