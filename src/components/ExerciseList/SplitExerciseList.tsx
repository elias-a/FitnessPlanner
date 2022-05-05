import React from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import type { SplitExercise } from '../../types/split';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ExerciseListProps {
  exercises: SplitExercise[];
  editExercise: (exercise: SplitExercise) => void;
  removeExercise: (exercise: SplitExercise) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  editExercise,
  removeExercise,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises.map(exercise => {
          return (
            <View
              key={exercise.id}
              style={[styles.exercise, styles.splitSelection]}
            >
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseName}>
                  {`${exercise.exercise.name} (${exercise.sets} x ${exercise.reps})`}
                </Text>
              </View>
              <View style={styles.editSection}>
                <Pressable onPress={() => editExercise(exercise)}>
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
              </View>
              <View style={styles.deleteSection}>
                <Pressable onPress={() => removeExercise(exercise)}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercise: {
    width: 340,
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 20,
    borderBottomWidth: 2,
  },
  splitSelection: {
    height: 40,
    marginTop: 10,
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

export default ExerciseList;
