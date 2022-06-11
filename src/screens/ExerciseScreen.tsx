import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useUpdateExercises } from '../hooks/split';
import { getExercises } from '../models/tasks/exercise';
import { getSplits } from '../models/tasks/split';
import ScrollableWeek from '../components/ScrollableWeek';
import ExerciseList from '../components/ExerciseList';
import type { Split, SplitExercise } from '../types/split';
import { isDateInSplit } from '../utils/isDateInSplit';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Tab } from '../Navigation';

type ExerciseScreenProps = BottomTabScreenProps<Tab, 'Exercises'>;

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ route }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [dayKey, setDayKey] = React.useState('');
  const [splitId, setSplitId] = React.useState('');
  const [splitExercises, setSplitExercises] = React.useState<SplitExercise[]>(
    [],
  );
  const [selectedDateSplit, setSelectedDateSplit] = React.useState<Split>();
  const exercises = useQuery('exercises', getExercises);
  const splits = useQuery('splits', getSplits);
  const mutation = useUpdateExercises();

  React.useEffect(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    setSelectedDate(date);
  }, []);

  React.useEffect(() => {
    if (route.params && Object.keys(route.params).includes('selectedDate')) {
      setSelectedDate(new Date(route.params.selectedDate));
    }
  }, [route.params]);

  React.useEffect(() => {
    if (!selectedDate || !splits.isSuccess) {
      setSplitExercises([]);
      return;
    }

    const split = isDateInSplit(selectedDate, splits.data);
    setSelectedDateSplit(split);

    if (!split) {
      setSplitExercises([]);
      return;
    }

    const key = selectedDate.toString();
    if (!Object.keys(split.exerciseSchedule).includes(key)) {
      setSplitExercises([]);
      return;
    }

    setSplitExercises(split.exerciseSchedule[key]);
    setDayKey(key);
    setSplitId(split.id);
  }, [
    splits.isSuccess,
    splits.data,
    exercises.isSuccess,
    exercises.data,
    selectedDate,
  ]);

  const toggleIsCompleted = (id: string) => {
    if (!selectedDateSplit) {
      return;
    }

    const updatedSplitExercises: SplitExercise[] = [];

    splitExercises.forEach(exercise => {
      if (exercise.id === id) {
        updatedSplitExercises.push({
          ...exercise,
          isCompleted: !exercise.isCompleted,
        });
      } else {
        updatedSplitExercises.push({ ...exercise });
      }
    });

    mutation.mutate({
      id: splitId,
      splitExercises: {
        ...selectedDateSplit.exerciseSchedule,
        [dayKey]: updatedSplitExercises,
      },
    });
    setSplitExercises(updatedSplitExercises);
  };

  return (
    <View style={styles.container}>
      {selectedDate && (
        <React.Fragment>
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
        </React.Fragment>
      )}
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
