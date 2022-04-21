import { createSlice } from '@reduxjs/toolkit';
import type { Exercise } from '../types/exercise';
import { initialExercises } from '../data/exercise';
import {
  getExercises as getExercisesTask,
  addExercise as addExerciseTask,
  deleteExercise as deleteExerciseTask,
} from '../models/tasks/exercise';

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: initialExercises,
  },
  reducers: {
    getExercises: (state, _action: {}) => {
      state.exercises = getExercisesTask();
    },
    addExercise: (state, action: { payload: Exercise }) => {
      const exercise = addExerciseTask(action.payload);
      state.exercises.push(exercise);
    },
    deleteExercise: (state, action: { payload: Exercise }) => {
      const exercise = deleteExerciseTask(action.payload);
      state.exercises.filter(el => el.id === exercise.id);
    },
  },
});

export const { addExercise, getExercises, deleteExercise } =
  exerciseSlice.actions;
export default exerciseSlice.reducer;
