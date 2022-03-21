import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollableWeek from '../components/ScrollableWeek';
import ExerciseList from '../components/ExerciseList';
import { useAppSelector } from '../hooks';
import type { Exercise } from '../types/exercise';

const ExerciseScreen: React.FC<{}> = ({}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [splitExercises, setSplitExercises] = React.useState<Exercise[]>([]);
  const split = useAppSelector(state => state.split);
  const { exercises } = useAppSelector(state => state.exercise);

  React.useEffect(() => {
    if (Object.keys(split.exercises).length === 0) {
      return;
    }

    const selectedExercises: Exercise[] = [];
    split.exercises['1'].forEach(id => {
      const exercise = exercises.find(item => item.id === id);

      if (exercise) {
        selectedExercises.push(exercise);
      }
    });

    setSplitExercises(selectedExercises);
  }, [split, exercises]);

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
