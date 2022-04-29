import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import type { Split, SplitExercise } from '../../types/split';
import styles from './styles';
import MultiSelect from '../MultiSelect';
import Calendar from '../Calendar/CalendarRange';
import ScrollableDays from '../ScrollableWeek/ScrollableDays';
import Header from './Header';
import { createSplit } from '../../slices/split';
import { buildSplit } from '../../algorithms/buildSplit';
import uuid from 'react-native-uuid';

type StartSplitProps = NativeStackScreenProps<Stack, 'StartSplit'>;

const StartSplit: React.FC<StartSplitProps> = ({ route, navigation }) => {
  const [editing, setEditing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [selectedDay, setSelectedDay] = React.useState(1);
  const [selectedCategories, setSelectedCategories] = React.useState<{
    [key: string]: string[];
  }>({});
  const [splitExercises, setSplitExercises] = React.useState<{
    [key: string]: SplitExercise[];
  }>({});
  const { categories } = useAppSelector(state => state.category);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (route.params.split) {
      loadSplit(route.params.split);
    }
  }, [route.params.split]);

  const loadSplit = (split: Split) => {
    setEditing(true);

    setStartDate(new Date(split.startDate));
    setEndDate(new Date(split.endDate));
    setSelectedCategories(split.categories);
    setSplitExercises(split.exercises);
  };

  const initializeCategories = () => {
    const newCategories: { [key: string]: string[] } = {};
    [...Array(7)].forEach((_day, index) => {
      newCategories[index + 1] = [];
    });
    setSelectedCategories(newCategories);
  };

  const changeSelectedItems = (items: string[]) => {
    setSelectedCategories(prevState => ({
      ...prevState,
      [selectedDay]: items,
    }));
  };

  const next = () => {
    setPage(page + 1);
  };

  const start = () => {
    let id: string;
    if (route.params.split) {
      id = route.params.split.id;
    } else {
      id = uuid.v4().toString();
    }

    const newSplit: Split = {
      id: id,
      startDate: startDate ? startDate.toString() : '',
      endDate: endDate ? endDate.toString() : '',
      categories: selectedCategories,
      exercises: {},
    };

    if (route.params.split) {
      newSplit.exercises = splitExercises;
    } else {
      const selectedExercises = buildSplit(newSplit, exercises);
      newSplit.exercises = selectedExercises;
    }

    dispatch(
      createSplit({
        split: newSplit,
        editing: editing,
      }),
    );
    navigation.goBack();
  };

  const goBack = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <React.Fragment>
      <Header title={'Start Split'} goBack={goBack} />

      {page === 1 && (
        <View style={styles.container}>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <Pressable
            onPress={() => {
              if (Object.keys(selectedCategories).length === 0) {
                initializeCategories();
              }
              next();
            }}
            style={styles.addButton}
          >
            <Text>{'Continue'}</Text>
          </Pressable>
        </View>
      )}
      {page === 2 && (
        <View style={styles.container}>
          <ScrollableDays
            numDays={7}
            selectedDay={selectedDay}
            setSelectedDay={day => setSelectedDay(day)}
          />

          <View style={{ marginTop: 32 }}>
            <MultiSelect
              items={categories}
              selectedItems={selectedCategories[selectedDay]}
              onSelectedItemsChange={changeSelectedItems}
              isSingle={false}
              subKey={'subCategories'}
              selectText={'Choose categories...'}
            />
          </View>

          <Pressable onPress={start} style={styles.addButton}>
            <Text>{'Start Split'}</Text>
          </Pressable>
        </View>
      )}
    </React.Fragment>
  );
};

export default StartSplit;
