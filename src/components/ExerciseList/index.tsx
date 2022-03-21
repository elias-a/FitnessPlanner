import React from 'react';
import { Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import type { Exercise } from '../../types/exercise';

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <ScrollView>
      {exercises.map(exercise => {
        return (
          <Pressable
            key={exercise.id}
            onPress={() => {}}
            style={styles.exercise}
          >
            <Text style={{ color: '#fff' }}>{exercise.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  exercise: {
    width: 300,
    height: 90,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 20,
    backgroundColor: '#909090',
  },
});

export default ExerciseList;
