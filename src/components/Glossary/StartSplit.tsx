import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MultiSelect from '../MultiSelect';
import Calendar from '../Calendar';
import ScrollableWeek from '../ScrollableWeek';
import { createSplit } from '../../slices/split';
import { buildSplit } from '../../algorithms/buildSplit';
import type { Category } from '../../types/category';

type StartSplitProps = NativeStackScreenProps<Stack, 'StartSplit'>;

const StartSplit: React.FC<StartSplitProps> = ({ navigation }) => {
  const [page, setPage] = React.useState(1);
  const [selectedCategories, setSelectedCategories] = React.useState<{
    [key: string]: Category[];
  }>({});
  const { categories } = useAppSelector(state => state.category);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  /*const initializeCategories = () => {
    const newCategories: { [key: string]: Category[] } = {};
    [...Array(selectedDays)].forEach((_day, index) => {
      newCategories[index + 1] = [];
    });
    setSelectedCategories(newCategories);
  };*/

  const next = () => {
    setPage(page + 1);
  };

  /*const start = () => {
    const newSplit = {
      days: selectedDays,
      weeks: parseInt(selectedWeeks, 10),
      categories: selectedCategories,
      exercises: {},
    };

    const selectedExercises = buildSplit(newSplit, exercises);
    newSplit.exercises = selectedExercises;

    dispatch(createSplit(newSplit));
    navigation.goBack();
  };*/

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name={'arrow-left-bold'}
            size={32}
            color={'#000'}
          />
        </Pressable>
        <Text style={styles.title}>{'Start Split'}</Text>
      </View>

      {page === 1 && (
        <React.Fragment>
          <Calendar />

          <Pressable
            onPress={() => {
              //initializeCategories();
              next();
            }}
            style={styles.addButton}
          >
            <Text>{'Continue'}</Text>
          </Pressable>
        </React.Fragment>
      )}
      {page === 2 && (
        <React.Fragment>
          <ScrollableWeek
            selectedDate={new Date()}
            setSelectedDate={() => {}}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StartSplit;
