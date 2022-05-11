import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Modal from './Modal';
import Calendar from '../Calendar/CalendarRange';
import ScrollableDays, { dayWidth } from '../ScrollableWeek/ScrollableDays';
import ExerciseList from '../ExerciseList/SplitExerciseList';
import ColorPickerModal from '../Modals/ColorPicker';
import RandomizeExercises from '../Modals/RandomizeExercises';
import AddSplitExerciseModal from '../Modals/AddSplitExercise';
import ErrorModal from '../Modals/Error';
import ConfirmModal from '../Modals/Confirm';
import type { Split, SplitExercise } from '../../types/split';
import type { CalendarRange } from '../../types/calendar';
import { checkDateOverlap } from '../../utils/checkDateOverlap';
import { createSplit } from '../../slices/split';
import { buildSplit, selectExercises } from '../../algorithms/buildSplit';
import uuid from 'react-native-uuid';

interface SplitModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (split: Split, editing: boolean) => void;
  editing: boolean;
}

const SplitModal: React.FC<SplitModalProps> = ({
  isOpen,
  onCancel,
  onSave,
  editing,
}) => {
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
  const [color, setColor] = React.useState('#000');
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
  const [existingSplit, setExistingSplit] = React.useState<Split | undefined>();
  const [finalizedDays, setFinalizedDays] = React.useState<{
    [key: string]: string;
  }>({});
  const [isRandomizeExercisesOpen, setIsRandomizeExercisesOpen] =
    React.useState(false);
  const [isAddSplitExerciseOpen, setIsAddSplitExerciseOpen] =
    React.useState(false);
  const [error, setError] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [ranges, setRanges] = React.useState<CalendarRange[]>([]);
  const [exerciseToEdit, setExerciseToEdit] = React.useState<SplitExercise>();
  const { exercises } = useAppSelector(state => state.exercise);
  const { splits } = useAppSelector(state => state.split);
  const dispatch = useAppDispatch();
  const flatListRef: React.RefObject<FlatList<number>> | undefined | null =
    React.createRef();

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

  const finalizeDay = () => {
    setFinalizedDays(prevState => ({
      ...prevState,
      [selectedDay]: color,
    }));

    if (selectedDay < 7) {
      setSelectedDay(selectedDay + 1);
      flatListRef.current?.scrollToOffset({
        offset: dayWidth * selectedDay,
      });
    }
  };

  const start = () => {
    // TODO: FIX
    const id = uuid.v4().toString();

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
        editing: editing,
      }),
    );

    onCancel();
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

  const chooseExercise = (newSplitExercise: SplitExercise) => {
    let newSplitExercises: SplitExercise[];
    if (exerciseToEdit) {
      newSplitExercises = splitExercises[selectedDay].map(item => {
        if (item.id === newSplitExercise.id) {
          return { ...newSplitExercise };
        } else {
          return { ...item };
        }
      });
    } else if (Object.keys(splitExercises).includes(selectedDay.toString())) {
      newSplitExercises = [...splitExercises[selectedDay], newSplitExercise];
    } else {
      newSplitExercises = [newSplitExercise];
    }

    setSplitExercises(prevState => ({
      ...prevState,
      [selectedDay]: newSplitExercises,
    }));
    setIsAddSplitExerciseOpen(false);
    setExerciseToEdit(undefined);
  };

  const editExercise = (item: SplitExercise) => {
    setExerciseToEdit(item);
    setIsAddSplitExerciseOpen(true);
  };

  const removeExercise = (item: SplitExercise) => {
    let newSplitExercises = [...splitExercises[selectedDay]];
    newSplitExercises = newSplitExercises.filter(el => el.id !== item.id);

    setSplitExercises(prevState => ({
      ...prevState,
      [selectedDay]: newSplitExercises,
    }));
  };

  const closeAddSplitExerciseModal = () => {
    setIsAddSplitExerciseOpen(false);
    setExerciseToEdit(undefined);
  };

  const handleRandomizeClose = () => {
    selectDayExercises();
    setIsRandomizeExercisesOpen(false);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} close={onCancel}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.closeIcon}>
              <Pressable onPress={onCancel}>
                <MaterialCommunityIcons
                  name={'window-close'}
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            </View>

            <View style={styles.leftIcon}>
              {page === 1 && (
                <Pressable onPress={() => setIsColorPickerOpen(true)}>
                  <MaterialCommunityIcons
                    name={'palette-outline'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
              )}
              {page === 2 && (
                <Pressable onPress={() => setPage(1)}>
                  <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.container}>
            {page === 1 && (
              <View style={styles.viewContainer}>
                <Calendar
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  ranges={ranges}
                  color={color}
                />

                <View
                  style={{
                    flex: 2,
                    justifyContent: 'flex-end',
                    minHeight: 102,
                    maxHeight: 102,
                    marginBottom: 35,
                  }}
                >
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
                    style={styles.fullWidthButton}
                  >
                    <Text style={{ fontSize: 20 }}>{'Continue'}</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {page === 2 && (
              <View style={styles.viewContainer}>
                <View
                  style={{
                    flex: 1,
                    minHeight: 70,
                    maxHeight: 70,
                    paddingTop: 10,
                  }}
                >
                  <ScrollableDays
                    numDays={7}
                    colors={finalizedDays}
                    selectedDay={selectedDay}
                    setSelectedDay={day => setSelectedDay(day)}
                    flatListRef={flatListRef}
                  />
                </View>

                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    minHeight: 70,
                    maxHeight: 70,
                    paddingVertical: 20,
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '100%',
                      maxHeight: '100%',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '700',
                        flex: 1,
                        marginLeft: 10,
                      }}
                    >
                      {'Exercises'}
                    </Text>
                    <Pressable
                      onPress={() => setIsRandomizeExercisesOpen(true)}
                      style={{
                        flex: 3,
                        minWidth: 32,
                        maxWidth: 32,
                        minHeight: '100%',
                        maxHeight: '100%',
                      }}
                    >
                      <MaterialCommunityIcons
                        name={'dice-multiple'}
                        size={32}
                        color={'#000'}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => setIsAddSplitExerciseOpen(true)}
                      style={{
                        flex: 2,
                        minWidth: 32,
                        maxWidth: 32,
                        minHeight: '100%',
                        maxHeight: '100%',
                      }}
                    >
                      <MaterialCommunityIcons
                        name={'plus'}
                        size={32}
                        color={'#000'}
                      />
                    </Pressable>
                  </View>
                </View>

                <View style={{ flex: 4, paddingVertical: 10 }}>
                  {Object.keys(splitExercises).includes(
                    selectedDay.toString(),
                  ) && (
                    <ExerciseList
                      exercises={splitExercises[selectedDay]}
                      editExercise={item => editExercise(item)}
                      removeExercise={item => removeExercise(item)}
                    />
                  )}
                </View>

                <View
                  style={{
                    flex: 5,
                    justifyContent: 'flex-end',
                    minHeight: 102,
                    maxHeight: 102,
                    marginBottom: 35,
                  }}
                >
                  <Pressable
                    onPress={finalizeDay}
                    style={styles.fullWidthButton}
                  >
                    <Text style={{ fontSize: 20 }}>{'Finalize Day'}</Text>
                  </Pressable>
                  <Pressable onPress={start} style={styles.fullWidthButton}>
                    <Text style={{ fontSize: 20 }}>{'Create Split'}</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>

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
        <RandomizeExercises
          isOpen={isRandomizeExercisesOpen}
          onCancel={() => setIsRandomizeExercisesOpen(false)}
          onRandomize={handleRandomizeClose}
          onCategoriesSelection={changeSelectedItems}
          selectedCategories={selectedCategories[selectedDay]}
        />
        <AddSplitExerciseModal
          isOpen={isAddSplitExerciseOpen}
          onCancel={() => closeAddSplitExerciseModal()}
          onAdd={newSplitExercise => chooseExercise(newSplitExercise)}
          initialSplitExercise={exerciseToEdit}
        />
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    flex: 1,
    minHeight: '10%',
    maxHeight: '10%',
  },
  leftIcon: {
    position: 'absolute',
    top: 45,
    left: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
  container: {
    flex: 2,
    alignItems: 'center',
  },
  textInputSection: {
    flex: 1,
    paddingTop: 30,
    minHeight: 70,
    maxHeight: 70,
  },
  textInput: {
    flex: 1,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    borderWidth: 1,
    padding: 10,
  },
  multiSelectSection: {
    flex: 2,
    paddingTop: 30,
    minHeight: 70,
    maxHeight: 70,
  },
  saveButtonSection: {
    flex: 3,
    minHeight: 110,
    maxHeight: 110,
    paddingVertical: 30,
  },
  addButton: {
    flex: 2,
    alignSelf: 'flex-end',
    minWidth: 350,
    maxWidth: 350,
    minHeight: 50,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
  },

  dropdown1BtnStyle: {
    padding: 0,
    margin: 0,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#efefef',
  },
  dropdown1RowStyle: {
    backgroundColor: '#efefef',
    borderBottomColor: '#c5c5c5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  fullWidthButton: {
    minWidth: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
    marginTop: 1,
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SplitModal;
