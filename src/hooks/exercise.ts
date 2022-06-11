import { useMutation } from 'react-query';
import { queryClient } from '../App';
import { addExercise, deleteExercise } from '../models/tasks/exercise';
import type { Exercise } from '../types/exercise';

export const useAddExerciseMutation = () =>
  useMutation<
    Exercise,
    unknown,
    { exercise: Exercise; editing: boolean },
    unknown
  >(
    data => {
      return addExercise(data.exercise, data.editing);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

export const useDeleteExerciseMutation = () =>
  useMutation<Exercise, unknown, { exercise: Exercise }, unknown>(
    data => {
      return deleteExercise(data.exercise);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
