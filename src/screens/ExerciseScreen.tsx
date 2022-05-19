import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollableWeek from '../components/ScrollableWeek';
import ExerciseList from '../components/ExerciseList';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateExercises } from '../slices/split';
import type { Split, SplitExercise } from '../types/split';
import { getDayKey } from '../utils/getDayKey';
import { isDateInSplit } from '../utils/isDateInSplit';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Tab } from '../Navigation';

type ExerciseScreenProps = BottomTabScreenProps<Tab, 'Exercises'>;

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ route }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [dayKey, setDayKey] = React.useState('');
  const [splitId, setSplitId] = React.useState('');
  const [splitExercises, setSplitExercises] = React.useState<SplitExercise[]>(
    [],
  );
  const [selectedDateSplit, setSelectedDateSplit] = React.useState<Split>();
  const { splits } = useAppSelector(state => state.split);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (route.params && Object.keys(route.params).includes('selectedDate')) {
      setSelectedDate(new Date(route.params.selectedDate));
    }
  }, [route.params]);

  React.useEffect(() => {
    const split = isDateInSplit(selectedDate, splits);
    setSelectedDateSplit(split);

    if (!split) {
      setSplitExercises([]);
      return;
    }

    const key = getDayKey(selectedDate, new Date(split.startDate));
    if (!Object.keys(split.exercises).includes(key)) {
      setSplitExercises([]);
      return;
    }

    setSplitExercises(split.exercises[key]);
    setDayKey(key);
    setSplitId(split.id);
  }, [splits, exercises, selectedDate]);

  const toggleIsCompleted = (id: string) => {
    if (!selectedDateSplit) {
      return;
    }

    const updatedSplitExercises: SplitExercise[] = [];

    splitExercises.forEach(exercise => {
      if (exercise.exercise.id === id) {
        updatedSplitExercises.push({
          ...exercise,
          isCompleted: !exercise.isCompleted,
        });
      } else {
        updatedSplitExercises.push({ ...exercise });
      }
    });

    dispatch(
      updateExercises({
        id: splitId,
        splitExercises: {
          ...selectedDateSplit.exercises,
          [dayKey]: updatedSplitExercises,
        },
      }),
    );
    setSplitExercises(updatedSplitExercises);
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollableWeek
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
      <ExerciseList
        exercises={splitExercises}
        toggleIsCompleted={toggleIsCompleted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    padding: 8,
  },
});

export default ExerciseScreen;
