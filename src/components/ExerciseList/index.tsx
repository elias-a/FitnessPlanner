import React from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import type { SplitExercise } from '../../types/split';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ExerciseListProps {
  exercises: SplitExercise[];
  toggleIsCompleted: (id: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  toggleIsCompleted,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises.map(exercise => {
          return (
            <View key={exercise.exercise.id} style={styles.exercise}>
              <Pressable
                onPress={() => toggleIsCompleted(exercise.exercise.id)}
                style={styles.checkbox}
              >
                {exercise.isCompleted ? (
                  <MaterialCommunityIcons
                    name={'checkbox-marked-circle'}
                    size={50}
                    color={'#000'}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={'checkbox-blank-circle-outline'}
                    size={50}
                    color={'#000'}
                  />
                )}
              </Pressable>
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseName}>
                  {exercise.exercise.name}
                </Text>
                <Text style={styles.setsAndReps}>
                  {`${exercise.sets} x ${exercise.reps}`}
                </Text>
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
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8,
    marginTop: 20,
    backgroundColor: '#909090',
  },
  checkbox: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  exerciseDetails: {
    position: 'absolute',
    left: 80,
    top: 20,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 24,
  },
  setsAndReps: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExerciseList;
