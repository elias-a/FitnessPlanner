import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteExercise } from '../../slices/exercise';
import Header from './Header';

type ViewExercisesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewExercises: React.FC<ViewExercisesProps> = ({ navigation }) => {
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Header title={'View Exercises'} goBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.listContainer}>
          {exercises.map(exercise => {
            return (
              <Pressable
                key={exercise.id}
                onPress={() => {}}
                style={styles.listItem}
              >
                <Text style={styles.itemText}>{exercise.name}</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate({
                      name: 'AddExercise',
                      params: { exercise: exercise },
                    })
                  }
                  style={styles.editButton}
                >
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => dispatch(deleteExercise(exercise))}
                  style={styles.deleteButton}
                >
                  <MaterialCommunityIcons
                    name={'delete'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </View>
    </React.Fragment>
  );
};

export default ViewExercises;
