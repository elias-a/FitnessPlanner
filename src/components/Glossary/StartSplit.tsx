import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import type { Split, SplitExercise } from '../../types/split';
import type { CalendarRange } from '../../types/calendar';
import styles from './styles';
import MultiSelect from '../MultiSelect';
import Calendar from '../Calendar/CalendarRange';
import ScrollableDays from '../ScrollableWeek/ScrollableDays';
import ExerciseList from '../ExerciseList';
import Header from './Header';
import ColorPickerModal from '../Modals/ColorPicker';
import ErrorModal from '../Modals/Error';
import ConfirmModal from '../Modals/Confirm';
import { createSplit } from '../../slices/split';
import { buildSplit, selectExercises } from '../../algorithms/buildSplit';
import uuid from 'react-native-uuid';
import { checkDateOverlap } from '../../utils/checkDateOverlap';

const defaultColor = '#000';

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
  const [color, setColor] = React.useState(defaultColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
  const [existingSplit, setExistingSplit] = React.useState<Split | undefined>();
  const [error, setError] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [ranges, setRanges] = React.useState<CalendarRange[]>([]);
  const { categories } = useAppSelector(state => state.category);
  const { exercises } = useAppSelector(state => state.exercise);
  const { splits } = useAppSelector(state => state.split);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (route.params.split) {
      loadSplit(route.params.split);
    }
  }, [route.params.split]);

  React.useEffect(() => {
    const newRanges: CalendarRange[] = splits.map(split => {
      return {
        startRange: new Date(split.startDate),
        endRange: new Date(split.endDate),
        color: split.color,
      };
    });

    setRanges(newRanges);
  }, [splits]);

  const loadSplit = (split: Split) => {
    setEditing(true);

    setStartDate(new Date(split.startDate));
    setEndDate(new Date(split.endDate));
    setSelectedCategories(split.categories);
    setSplitExercises(split.exercises);
    setColor(split.color);
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
      color: color,
    };

    if (Object.keys(splitExercises).length > 0) {
      newSplit.exercises = splitExercises;
    } else {
      const selectedExercises = buildSplit(newSplit, exercises);
      newSplit.exercises = selectedExercises;
    }

    dispatch(
      createSplit({
        split: newSplit,
        editing: !!route.params.split,
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

  const editSplit = () => {
    if (existingSplit) {
      loadSplit(existingSplit);
      setConfirm('');
    } else {
      setError('No overlapping split found');
    }
  };

  const selectColor = (newColor: string) => {
    setColor(newColor);
    setIsColorPickerOpen(false);
  };

  const selectDayExercises = () => {
    const dayExercises = selectExercises(
      selectedCategories[selectedDay],
      exercises,
    );

    setSplitExercises(prevState => ({
      ...prevState,
      [selectedDay]: dayExercises,
    }));
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
            ranges={ranges}
            color={color}
          />

          <Pressable
            onPress={() => setIsColorPickerOpen(true)}
            style={styles.addButton}
          >
            <Text>{'Choose Color'}</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              if (!startDate || !endDate) {
                setError('Select a start and end date');
                return;
              }

              const overlappingSplit = checkDateOverlap(
                startDate,
                endDate,
                splits,
              );
              if (overlappingSplit && !editing) {
                setExistingSplit(overlappingSplit);
                setConfirm(
                  "The dates you've selected overlap an existing split. Would you like to edit that split now?",
                );
                return;
              }

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
        <View style={{ flex: 1 }}>
          <ScrollableDays
            numDays={7}
            selectedDay={selectedDay}
            setSelectedDay={day => setSelectedDay(day)}
          />

          <View style={[styles.centeredView, { marginTop: 32 }]}>
            <MultiSelect
              items={categories}
              selectedItems={selectedCategories[selectedDay]}
              onSelectedItemsChange={changeSelectedItems}
              isSingle={false}
              subKey={'subCategories'}
              selectText={'Choose categories...'}
            />
          </View>

          <View style={styles.centeredView}>
            <Pressable onPress={selectDayExercises} style={styles.addButton}>
              <Text>{'Select Exercises'}</Text>
            </Pressable>
          </View>

          {Object.keys(splitExercises).includes(selectedDay.toString()) && (
            <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
              <ExerciseList exercises={splitExercises[selectedDay]} />
            </View>
          )}

          <View style={[styles.centeredView, { marginBottom: 10 }]}>
            <Pressable onPress={start} style={styles.addButton}>
              <Text>{'Start Split'}</Text>
            </Pressable>
          </View>
        </View>
      )}
      <ErrorModal
        isOpen={!!error}
        onClose={() => setError('')}
        message={error}
      />
      <ConfirmModal
        isOpen={!!confirm}
        onCancel={() => setConfirm('')}
        onConfirm={editSplit}
        message={confirm}
      />
      <ColorPickerModal
        isOpen={isColorPickerOpen}
        onCancel={() => setIsColorPickerOpen(false)}
        onSelect={newColor => selectColor(newColor)}
        color={color}
      />
    </React.Fragment>
  );
};

export default StartSplit;
