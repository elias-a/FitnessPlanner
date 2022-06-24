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
            <View key={exercise.id} style={styles.exerciseGroup}>
              <View style={styles.exercise}>
                <Pressable
                  onPress={() => toggleIsCompleted(exercise.id)}
                  style={styles.checkbox}
                >
                  {exercise.isCompleted ? (
                    <MaterialCommunityIcons
                      name={'checkbox-marked'}
                      size={50}
                      color={'#000'}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={'checkbox-blank-outline'}
                      size={50}
                      color={'#000'}
                    />
                  )}
                </Pressable>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseName}>
                    {exercise.isSingleArm
                      ? `Single Arm ${exercise.exercise.name}`
                      : `${exercise.exercise.name}`}
                  </Text>
                  <Text style={styles.setsAndReps}>
                    {`${exercise.sets} x ${exercise.reps}`}
                  </Text>
                </View>
              </View>

              {exercise.superset?.map(superset => {
                return (
                  <View key={superset.id} style={styles.exercise}>
                    <View style={styles.checkbox}>
                      <Text style={styles.supersetLabel}>{'SS'}</Text>
                    </View>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>
                        {superset.isSingleArm
                          ? `Single Arm ${superset.exercise.name}`
                          : `${superset.exercise.name}`}
                      </Text>
                      <Text style={styles.setsAndReps}>
                        {`${superset.sets} x ${superset.reps}`}
                      </Text>
                    </View>
                  </View>
                );
              })}
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
  exerciseGroup: {
    backgroundColor: '#484848',
    minWidth: 360,
    maxWidth: 360,
    marginTop: 10,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
  },
  exercise: {
    minWidth: 340,
    maxWidth: 340,
    minHeight: 60,
    maxHeight: 60,
    marginVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#909090',
  },
  checkbox: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    maxWidth: 70,
    paddingLeft: 10,
    paddingRight: 10,
  },
  exerciseDetails: {
    flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  exerciseName: {
    fontSize: 20,
  },
  setsAndReps: {
    fontSize: 16,
  },
  supersetLabel: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default ExerciseList;
