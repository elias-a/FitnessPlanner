import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MultiSelect from '../MultiSelect';
import Calendar from '../Calendar/CalendarRange';
import ScrollableDays from '../ScrollableWeek/ScrollableDays';
import { createSplit } from '../../slices/split';
import { buildSplit } from '../../algorithms/buildSplit';

type StartSplitProps = NativeStackScreenProps<Stack, 'StartSplit'>;

const StartSplit: React.FC<StartSplitProps> = ({ navigation }) => {
  const [page, setPage] = React.useState(1);
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [selectedDay, setSelectedDay] = React.useState(1);
  const [selectedCategories, setSelectedCategories] = React.useState<{
    [key: string]: string[];
  }>({});
  const { categories } = useAppSelector(state => state.category);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

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
    const newSplit = {
      startDate: startDate ? startDate.toString() : '',
      endDate: endDate ? endDate.toString() : '',
      categories: selectedCategories,
      exercises: {},
    };

    const selectedExercises = buildSplit(newSplit, exercises);
    newSplit.exercises = selectedExercises;

    dispatch(createSplit(newSplit));
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
      <View style={styles.container}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name={'arrow-left-bold'}
            size={32}
            color={'#000'}
          />
        </Pressable>
        <Text style={styles.title}>{'Start Split'}</Text>
      </View>

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
              initializeCategories();
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
