import { useMutation } from 'react-query';
import { queryClient } from '../App';
import {
  createSplit,
  deleteSplit,
  updateSplitExercises,
} from '../models/tasks/split';
import type { Split, SplitExercises } from '../types/split';

export const useAddSplitMutation = () =>
  useMutation<Split, unknown, { item: Split; editing: boolean }, unknown>(
    data => {
      return createSplit(data.item);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

export const useDeleteSplitMutation = () =>
  useMutation<Split, unknown, { item: Split }, unknown>(
    data => {
      return deleteSplit(data.item);
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
