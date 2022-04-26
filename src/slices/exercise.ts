import { createSlice } from '@reduxjs/toolkit';
import type { Exercise } from '../types/exercise';
import {
  getExercises as getExercisesTask,
  addExercise as addExerciseTask,
  deleteExercise as deleteExerciseTask,
} from '../models/tasks/exercise';

const initialExercises: Exercise[] = [];

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: initialExercises,
  },
  reducers: {
    getExercises: (state, _action: {}) => {
      state.exercises = getExercisesTask();
    },
    addExercise: (
      state,
      action: { payload: { exercise: Exercise; editing: boolean } },
    ) => {
      const { exercise, editing } = action.payload;
      const newExercise = addExerciseTask(exercise, editing);

      if (editing) {
        state.exercises = state.exercises.map(el => {
          if (el.id === newExercise.id) {
            return { ...newExercise };
          } else {
            return { ...el };
          }
        });
      } else {
        state.exercises.push(newExercise);
      }
    },
    deleteExercise: (state, action: { payload: Exercise }) => {
      const exercise = deleteExerciseTask(action.payload);
      state.exercises = state.exercises.filter(el => el.id !== exercise.id);
    },
  },
});

export const { addExercise, getExercises, deleteExercise } =
  exerciseSlice.actions;
export default exerciseSlice.reducer;
