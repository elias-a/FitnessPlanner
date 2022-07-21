import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from '../index';
import type { Exercise } from '../../../types/exercise';
import { useQuery } from 'react-query';
import uuid from 'react-native-uuid';
import {
  useAddExerciseMutation,
  useDeleteExerciseMutation,
} from '../../../hooks/exercise';
import { getExercises } from '../../../models/tasks/exercise';
import Glossary from '../Glossary';
import ExerciseForm from '../forms/ExerciseForm';

const initialExercise: Exercise = {
  id: '',
  name: '',
  categories: [],
  isDeleted: false,
};

type ViewExercisesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewExercises: React.FC<ViewExercisesProps> = ({ navigation }) => {
  const exercises = useQuery('exercises', getExercises);
  const addMutation = useAddExerciseMutation();
  const deleteMutation = useDeleteExerciseMutation();

  const saveExercise = (item: Exercise, editing: boolean) => {
    addMutation.mutate({
      item: {
        ...item,
        id: editing ? item.id : uuid.v4().toString(),
        isDeleted: false,
      },
      editing: editing,
    });
  };

  return (
    <Glossary
      initialItem={initialExercise}
      items={exercises}
      title={'Exercises'}
      form={ExerciseForm}
      textExtractor={item => item.name}
      goBack={() => navigation.goBack()}
      addMutation={addMutation}
      deleteMutation={deleteMutation}
      save={saveExercise}
    />
  );
};

export default ViewExercises;
