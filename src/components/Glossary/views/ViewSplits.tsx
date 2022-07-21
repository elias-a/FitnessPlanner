import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from '../index';
import { useQuery } from 'react-query';
import {
  useAddSplitMutation,
  useDeleteSplitMutation,
} from '../../../hooks/split';
import { getExercises } from '../../../models/tasks/exercise';
import { getSplits } from '../../../models/tasks/split';
import {
  buildSplitTemplate,
  templateToSchedule,
} from '../../../algorithms/buildSplit';
import Glossary from '../Glossary';
import SplitForm from '../forms/SplitForm';
import { formatDate } from '../../../utils/formatDate';
import type { Split } from '../../../types/split';

const initialColor = '#909090';

const initialSplit: Split = {
  id: '',
  startDate: '',
  endDate: '',
  categories: {},
  exerciseTemplate: {},
  exerciseSchedule: {},
  color: initialColor,
  isDeleted: false,
};

type ViewSplitsProps = NativeStackScreenProps<Stack, 'ViewSplits'>;

const ViewSplits: React.FC<ViewSplitsProps> = ({ navigation }) => {
  const exercises = useQuery('exercises', getExercises);
  const splits = useQuery('splits', getSplits);
  const addMutation = useAddSplitMutation();
  const deleteMutation = useDeleteSplitMutation();

  const saveSplit = (split: Split, editing: boolean) => {
    if (
      Object.keys(split.exerciseTemplate).length === 0 &&
      exercises.isSuccess
    ) {
      const selectedExercises = buildSplitTemplate(split, exercises.data);
      split.exerciseTemplate = selectedExercises;
    }

    split.exerciseSchedule = templateToSchedule(
      split.exerciseTemplate,
      split.exerciseSchedule,
      split.startDate,
      split.endDate,
      editing,
    );

    addMutation.mutate({ item: split, editing });
  };

  return (
    <Glossary
      initialItem={initialSplit}
      items={splits}
      title={'Splits'}
      form={SplitForm}
      textExtractor={item =>
        `${formatDate(new Date(item.startDate))} - ${formatDate(
          new Date(item.endDate),
        )}`
      }
      goBack={() => navigation.goBack()}
      addMutation={addMutation}
      deleteMutation={deleteMutation}
      save={saveSplit}
    />
  );
};

export default ViewSplits;
