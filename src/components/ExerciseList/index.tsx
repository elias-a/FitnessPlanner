import React from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import type { SplitExercise } from '../../types/split';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ExerciseListProps {
  exercises: SplitExercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <ScrollView>
      {exercises.map(exercise => {
        return (
          <View key={exercise.exercise.id} style={styles.exercise}>
            <Pressable onPress={() => {}}>
              {exercise.isCompleted ? (
                <MaterialCommunityIcons
                  name={'checkbox-marked-circle'}
                  size={32}
                  color={'#000'}
                />
              ) : (
                <MaterialCommunityIcons
                  name={'checkbox-blank-circle-outline'}
                  size={32}
                  color={'#000'}
                />
              )}
            </Pressable>
            <Text style={{ color: '#fff' }}>{exercise.exercise.name}</Text>
          </View>
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
