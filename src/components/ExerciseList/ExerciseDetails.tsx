import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SplitExercise } from '../../types/split';

interface ExerciseDetailsProps {
  exercise: SplitExercise;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise }) => {
  return (
    <View style={styles.exerciseDetails}>
      <Text style={styles.exerciseName}>
        {exercise.isSingleArm
          ? `Single Arm ${exercise.exercise.name}`
          : `${exercise.exercise.name}`}
        {` (${exercise.sets} x ${exercise.reps})`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },
  exerciseName: {
    color: '#000',
    fontSize: 18,
  },
});

export default ExerciseDetails;
