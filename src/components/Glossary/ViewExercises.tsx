import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import type { Exercise } from '../../types/exercise';
import { useQuery } from 'react-query';
import {
  useAddExerciseMutation,
  useDeleteExerciseMutation,
} from '../../hooks/exercise';
import { getExercises } from '../../models/tasks/exercise';
import ExerciseModal from '../Modals/Exercise';
import Glossary from './Glossary';
import uuid from 'react-native-uuid';

type ViewExercisesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewExercises: React.FC<ViewExercisesProps> = ({ navigation }) => {
  const [isExerciseOpen, setIsExerciseOpen] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise>();
  const exercises = useQuery('exercises', getExercises);
  const addMutation = useAddExerciseMutation();
  const deleteMutation = useDeleteExerciseMutation();

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseOpen(true);
  };

  const handleRemove = (exercise: Exercise) => {
    addMutation.mutate({
      exercise: {
        ...exercise,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (exercise: Exercise) => {
    addMutation.mutate({
      exercise: {
        ...exercise,
        isDeleted: false,
      },
      editing: true,
    });
  };

  const saveExercise = (exercise: Exercise, editing: boolean) => {
    addMutation.mutate({
      exercise: {
        id: editing ? exercise.id : uuid.v4().toString(),
        name: exercise.name,
        categories: exercise.categories,
      },
      editing: editing,
    });

    closeExerciseModal();
  };

  const closeExerciseModal = () => {
    setIsExerciseOpen(false);
    setSelectedExercise(undefined);
  };

  return (
    <Glossary
      items={exercises}
      modal={
        <ExerciseModal
          isOpen={isExerciseOpen}
          onCancel={closeExerciseModal}
          onSave={saveExercise}
          selectedExercise={selectedExercise}
        />
      }
      title={'Exercises'}
      textExtractor={item => item.name}
      goBack={() => navigation.goBack()}
      clickAdd={() => setIsExerciseOpen(true)}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
      handleUndoRemove={handleUndoRemove}
    />
  );
};

export default ViewExercises;
