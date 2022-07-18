import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import type { SplitExercise } from '../../types/split';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import ExerciseDetails from './ExerciseDetails';
import ContextMenu from '../ContextMenu';

interface ExerciseListProps {
  exercises: SplitExercise[];
  editExercise: (exercise: SplitExercise) => void;
  removeExercise: (exercise: SplitExercise) => void;
  undoRemove: (exercise: SplitExercise) => void;
  reorder: (exercises: SplitExercise[]) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  editExercise,
  removeExercise,
  undoRemove,
  reorder,
}) => {
  const remove = (exercise: SplitExercise) => {
    removeExercise({ ...exercise, isDeleted: true });
  };

  const undo = (exercise: SplitExercise) => {
    undoRemove({ ...exercise, isDeleted: false });
  };

  const renderItem = ({
    item,
    drag,
  }: {
    item: SplitExercise;
    drag: () => void;
  }) => {
    return (
      <View
        key={item.id}
        style={[
          styles.exercise,
          Object.keys(item).includes('isDeleted') &&
            item.isDeleted && { backgroundColor: '#ffcccb' },
        ]}
      >
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

        <View style={styles.exerciseDetailsSection}>
          <ExerciseDetails exercise={item} />
          {item.superset &&
            item.superset.map(superset => {
              return <ExerciseDetails key={superset.id} exercise={superset} />;
            })}
        </View>

        <ContextMenu
          item={item}
          edit={editExercise}
          remove={remove}
          undoRemove={undo}
        />
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
    minWidth: 340,
    maxWidth: 340,
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 10,
    borderBottomWidth: 2,
  },
  exerciseDetailsSection: {
    flex: 1,
    flexDirection: 'column',
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
  dragButton: {
    flex: 1,
    maxWidth: 25,
    minHeight: 40,
  },
  dragIcon: {
    position: 'absolute',
    top: 8,
  },
  contextSection: {
    position: 'absolute',
    right: 1,
  },
  contextButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ExerciseList;
