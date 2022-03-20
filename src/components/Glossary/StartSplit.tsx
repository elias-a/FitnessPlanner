import React from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from '../MultiSelect';
import { createSplit } from '../../slices/split';
import { buildSplit } from '../../algorithms/buildSplit';

type StartSplitProps = NativeStackScreenProps<Stack, 'StartSplit'>;

const StartSplit: React.FC<StartSplitProps> = ({ navigation }) => {
  const [page, setPage] = React.useState(1);
  const [selectedDays, setSelectedDays] = React.useState(6);
  const [selectedWeeks, setSelectedWeeks] = React.useState('6');
  const [selectedCategories, setSelectedCategories] = React.useState<{
    [key: string]: string[];
  }>({});
  const { categories } = useAppSelector(state => state.category);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  const initializeCategories = () => {
    const newCategories: { [key: string]: string[] } = {};
    [...Array(selectedDays)].forEach((_day, index) => {
      newCategories[index + 1] = [];
    });
    setSelectedCategories(newCategories);
  };

  const next = () => {
    setPage(page + 1);
  };

  const selectCategories = (item: string, day: number) => {
    if (selectedCategories[day].includes(item)) {
      setSelectedCategories(prevState => ({
        ...prevState,
        [day]: selectedCategories[day].filter(selected => selected !== item),
      }));
    } else {
      setSelectedCategories(prevState => ({
        ...prevState,
        [day]: [...selectedCategories[day], item],
      }));
    }
  };

  const start = () => {
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
  };

  return (
    <React.Fragment>
      <View style={styles.header}>
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

      <ScrollView>
        {page === 1 && (
          <React.Fragment>
            <Text style={styles.label}>{'Enter number of days:'}</Text>
            <Picker
              selectedValue={selectedDays}
              onValueChange={days => setSelectedDays(days)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(days => {
                return (
                  <Picker.Item
                    key={days}
                    label={days.toString()}
                    value={days}
                  />
                );
              })}
            </Picker>
            <Pressable
              onPress={() => {
                initializeCategories();
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
            <Text style={styles.label}>{'Enter number of weeks:'}</Text>
            <TextInput
              value={selectedWeeks}
              onChangeText={setSelectedWeeks}
              placeholder={'Enter number of weeks...'}
              style={styles.textInput}
            />
            <Pressable onPress={next} style={styles.addButton}>
              <Text>{'Continue'}</Text>
            </Pressable>
          </React.Fragment>
        )}
        {page === 3 && (
          <React.Fragment>
            {[...Array(selectedDays)].map((_day, index) => {
              return (
                <React.Fragment key={index}>
                  <Text style={styles.label}>{`Pick categories for day ${
                    index + 1
                  }:`}</Text>
                  <MultiSelect
                    items={categories}
                    selectedItems={selectedCategories[index + 1]}
                    onSelectedChange={(item: string) =>
                      selectCategories(item, index + 1)
                    }
                  />
                </React.Fragment>
              );
            })}
            <Pressable onPress={start} style={styles.addButton}>
              <Text>{'Start Split'}</Text>
            </Pressable>
          </React.Fragment>
        )}
      </ScrollView>
    </React.Fragment>
  );
};

export default StartSplit;
