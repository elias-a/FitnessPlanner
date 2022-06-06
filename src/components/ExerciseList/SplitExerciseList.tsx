import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import type { SplitExercise } from '../../types/split';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';

interface ExerciseListProps {
  exercises: SplitExercise[];
  editExercise: (exercise: SplitExercise) => void;
  removeExercise: (exercise: SplitExercise) => void;
  reorder: (exercises: SplitExercise[]) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  editExercise,
  removeExercise,
  reorder,
}) => {
  const renderItem = ({
    item,
    drag,
  }: {
    item: SplitExercise;
    drag: () => void;
  }) => {
    return (
      <View key={item.id} style={[styles.exercise, styles.splitSelection]}>
        <Pressable style={styles.dragButton} onLongPress={drag}>
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={24}
            color={'#000'}
            style={[styles.dragIcon, { left: 0 }]}
          />
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={24}
            color={'#000'}
            style={[styles.dragIcon, { left: 7 }]}
          />
        </Pressable>
        <View style={styles.exerciseDetails}>
          <Text style={styles.exerciseName}>
            {item.isSingleArm
              ? `Single Arm ${item.exercise.name}`
              : `${item.exercise.name}`}
            {` (${item.sets} x ${item.reps})`}
          </Text>
        </View>
        <View style={styles.editSection}>
          <Pressable onPress={() => editExercise(item)}>
            <MaterialCommunityIcons name={'pencil'} size={32} color={'#000'} />
          </Pressable>
        </View>
        <View style={styles.deleteSection}>
          <Pressable onPress={() => removeExercise(item)}>
            <MaterialCommunityIcons name={'delete'} size={32} color={'#000'} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <NestableScrollContainer>
      <View style={styles.container}>
        <NestableDraggableFlatList
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onDragEnd={({ data }) => reorder(data)}
        />
      </View>
    </NestableScrollContainer>
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
  dragButton: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 25,
  },
  dragIcon: {
    position: 'absolute',
    top: 8,
  },
});

export default ExerciseList;
