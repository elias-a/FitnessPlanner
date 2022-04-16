import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollableWeek from '../components/ScrollableWeek';
import ExerciseList from '../components/ExerciseList';
import { useAppSelector } from '../hooks';
import type { Exercise } from '../types/exercise';
import { getDayKey } from '../utils/getDayKey';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Tab } from '../App';

type ExerciseScreenProps = BottomTabScreenProps<Tab, 'Exercises'>;

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ route }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [splitExercises, setSplitExercises] = React.useState<Exercise[]>([]);
  const split = useAppSelector(state => state.split);
  const { exercises } = useAppSelector(state => state.exercise);

  React.useEffect(() => {
    if (route.params && Object.keys(route.params).includes('selectedDate')) {
      setSelectedDate(new Date(route.params.selectedDate));
    }
  }, [route.params]);

  React.useEffect(() => {
    if (!split.startDate || !split.endDate) {
      setSplitExercises([]);
      return;
    }

    if (
      selectedDate < new Date(split.startDate) ||
      selectedDate > new Date(split.endDate)
    ) {
      setSplitExercises([]);
      return;
    }

    const key = getDayKey(selectedDate, new Date(split.startDate));
    if (!Object.keys(split.exercises).includes(key)) {
      setSplitExercises([]);
      return;
    }

    const selectedExercises: Exercise[] = [];
    split.exercises[key].forEach(id => {
      const exercise = exercises.find(item => item.id === id);

      if (exercise) {
        selectedExercises.push(exercise);
      }
    });

    setSplitExercises(selectedExercises);
  }, [split, exercises, selectedDate]);

  return (
    <View style={styles.container}>
      <View>
        <ScrollableWeek
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
      <ExerciseList exercises={splitExercises} />
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
