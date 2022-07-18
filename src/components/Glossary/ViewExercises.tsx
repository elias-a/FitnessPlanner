import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import type { Exercise } from '../../types/exercise';
import { useQuery } from 'react-query';
import {
  useAddExerciseMutation,
  useDeleteExerciseMutation,
} from '../../hooks/exercise';
import { getExercises } from '../../models/tasks/exercise';
import ScrollableList from '../ScrollableList';
import ExerciseModal from '../Modals/Exercise';
import ContextMenu from '../ContextMenu';
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
    <ScrollableList
      title={'Exercises'}
      goBack={() => navigation.goBack()}
      clickAddButton={() => setIsExerciseOpen(true)}
      modal={
        <ExerciseModal
          isOpen={isExerciseOpen}
          onCancel={closeExerciseModal}
          onSave={saveExercise}
          selectedExercise={selectedExercise}
        />
      }
    >
      {exercises.isSuccess &&
        exercises.data.map(exercise => {
          return (
            <View
              key={exercise.id}
              style={[
                styles.exercise,
                Object.keys(exercise).includes('isDeleted') &&
                  exercise.isDeleted && { backgroundColor: '#ffcccb' },
              ]}
            >
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>

              <ContextMenu
                item={exercise}
                edit={handleEdit}
                remove={handleRemove}
                undoRemove={handleUndoRemove}
              />
            </View>
          );
        })}
    </ScrollableList>
  );
};

const styles = StyleSheet.create({
  exercise: {
    width: 340,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 20,
    borderBottomWidth: 2,
  },
  exerciseDetails: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    marginLeft: 5,
  },
  editSection: {
    flex: 2,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  deleteSection: {
    flex: 3,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  exerciseName: {
    color: '#000',
    fontSize: 22,
  },
});

export default ViewExercises;
