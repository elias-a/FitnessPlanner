import { useMutation } from 'react-query';
import { queryClient } from '../App';
import {
  createSplit,
  deleteSplit,
  updateSplitExercises,
} from '../models/tasks/split';
import type { Split, SplitExercises } from '../types/split';

export const useAddSplitMutation = () =>
  useMutation<Split, unknown, { split: Split; editing: boolean }, unknown>(
    data => {
      return createSplit(data.split, data.editing);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

export const useDeleteSplitMutation = () =>
  useMutation<Split, unknown, { split: Split }, unknown>(
    data => {
      return deleteSplit(data.split);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

export const useUpdateExercises = () =>
  useMutation<
    SplitExercises,
    unknown,
    { id: string; splitExercises: SplitExercises },
    unknown
  >(
    data => {
      return updateSplitExercises(data.id, data.splitExercises);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
