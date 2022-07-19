import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import { useQuery } from 'react-query';
import { useAddSplitMutation, useDeleteSplitMutation } from '../../hooks/split';
import { getExercises } from '../../models/tasks/exercise';
import { getSplits } from '../../models/tasks/split';
import {
  buildSplitTemplate,
  templateToSchedule,
} from '../../algorithms/buildSplit';
import SplitModal from '../Modals/Split';
import Glossary from './Glossary';
import { formatDate } from '../../utils/formatDate';
import type { Split } from '../../types/split';

type ViewSplitsProps = NativeStackScreenProps<Stack, 'ViewSplits'>;

const ViewSplits: React.FC<ViewSplitsProps> = ({ navigation }) => {
  const [isSplitOpen, setIsSplitOpen] = React.useState(false);
  const [selectedSplit, setSelectedSplit] = React.useState<Split>();
  const exercises = useQuery('exercises', getExercises);
  const splits = useQuery('splits', getSplits);
  const addMutation = useAddSplitMutation();
  const deleteMutation = useDeleteSplitMutation();

  const handleEdit = (split: Split) => {
    setSelectedSplit(split);
    setIsSplitOpen(true);
  };

  const handleRemove = (split: Split) => {
    addMutation.mutate({
      split: {
        ...split,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (split: Split) => {
    addMutation.mutate({
      split: {
        ...split,
        isDeleted: false,
      },
      editing: true,
    });
  };

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

    addMutation.mutate({ split, editing });

    closeSplitModal();
  };

  const closeSplitModal = () => {
    setIsSplitOpen(false);
    setSelectedSplit(undefined);
  };

  return (
    <Glossary
      items={splits}
      modal={
        <SplitModal
          isOpen={isSplitOpen}
          onCancel={closeSplitModal}
          onSave={saveSplit}
          selectedSplit={selectedSplit}
        />
      }
      title={'Splits'}
      textExtractor={item =>
        `${formatDate(new Date(item.startDate))} - ${formatDate(
          new Date(item.endDate),
        )}`
      }
      goBack={() => navigation.goBack()}
      clickAdd={() => setIsSplitOpen(true)}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
      handleUndoRemove={handleUndoRemove}
    />
  );
};

export default ViewSplits;
