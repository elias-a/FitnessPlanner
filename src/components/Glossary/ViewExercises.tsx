import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import type { Exercise } from '../../types/exercise';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addExercise, deleteExercise } from '../../slices/exercise';
import Header from './Header';
import AddButton from './AddButton';
import ExerciseModal from '../Modals/Exercise';
import uuid from 'react-native-uuid';

type ViewExercisesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewExercises: React.FC<ViewExercisesProps> = ({ navigation }) => {
  const [isExerciseOpen, setIsExerciseOpen] = React.useState(false);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  const saveExercise = (exercise: Exercise, editing: boolean) => {
    dispatch(
      addExercise({
        exercise: {
          id: editing ? exercise.id : uuid.v4().toString(),
          name: exercise.name,
          categories: exercise.categories,
        },
        editing: editing,
      }),
    );

    setIsExerciseOpen(false);
  };

  return (
    <React.Fragment>
      <View style={styles.pageContainer}>
        <Header title={'Exercises'} goBack={() => navigation.goBack()} />

        <View style={styles.viewContainer}>
          <View style={styles.listContainer}>
            <ScrollView>
              {exercises.map(exercise => {
                return (
                  <View key={exercise.id} style={styles.exercise}>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                    </View>
                    <View style={styles.editSection}>
                      <Pressable onPress={() => {}}>
                        <MaterialCommunityIcons
                          name={'pencil'}
                          size={32}
                          color={'#000'}
                        />
                      </Pressable>
                    </View>
                    <View style={styles.deleteSection}>
                      <Pressable
                        onPress={() => dispatch(deleteExercise(exercise))}
                      >
                        <MaterialCommunityIcons
                          name={'delete'}
                          size={32}
                          color={'#000'}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.addButtonSection}>
            <AddButton add={() => setIsExerciseOpen(true)} />
          </View>
        </View>
      </View>

      <ExerciseModal
        isOpen={isExerciseOpen}
        onCancel={() => setIsExerciseOpen(false)}
        onSave={saveExercise}
        editing={false}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90%',
    maxHeight: '90%',
  },
  listContainer: {
    flex: 1,
    minHeight: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
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
  addButtonSection: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default ViewExercises;
