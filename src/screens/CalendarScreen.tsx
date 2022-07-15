import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { getCategories } from '../models/tasks/category';
import { getSplits } from '../models/tasks/split';
import Calendar from '../components/Calendar';
import { getDayKey } from '../utils/getDayKey';
import { isDateInSplit } from '../utils/isDateInSplit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Tab } from '../Navigation';
import { formatDate } from '../utils/formatDate';
import type { Split } from '../types/split';
import type { CalendarRange } from '../types/calendar';

type CalendarScreenProps = BottomTabScreenProps<Tab, 'Calendar'>;

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [ranges, setRanges] = React.useState<CalendarRange[]>([]);
  const [formattedStartDate, setFormattedStartDate] = React.useState('');
  const [formattedEndDate, setFormattedEndDate] = React.useState('');
  const [selectedSplit, setSelectedSplit] = React.useState<Split>();
  const [dayCategories, setDayCategories] = React.useState<string[]>([]);
  const splits = useQuery('splits', getSplits);
  const categories = useQuery('categories', getCategories);

  React.useEffect(() => {
    if (!splits.isSuccess) {
      setRanges([]);
      return;
    }

    const newRanges: CalendarRange[] = splits.data.map(split => {
      return {
        startRange: new Date(split.startDate),
        endRange: new Date(split.endDate),
        color: split.color,
      };
    });

    setRanges(newRanges);
  }, [splits.isSuccess, splits.data]);

  React.useEffect(() => {
    if (!splits.isSuccess || !selectedDate) {
      setFormattedStartDate('');
      setFormattedEndDate('');
      setSelectedSplit(undefined);
      return;
    }

    const newSelectedSplit = splits.data.find(
      split =>
        selectedDate >= new Date(split.startDate) &&
        selectedDate <= new Date(split.endDate),
    );

    if (newSelectedSplit) {
      const newStartDate = new Date(newSelectedSplit.startDate);
      setFormattedStartDate(formatDate(newStartDate));

      const newEndDate = new Date(newSelectedSplit.endDate);
      setFormattedEndDate(formatDate(newEndDate));
    } else {
      setFormattedEndDate('');
    }

    setSelectedSplit(newSelectedSplit);
  }, [splits.isSuccess, splits.data, selectedDate]);

  React.useEffect(() => {
    if (!splits.isSuccess || !categories.isSuccess) {
      setDayCategories([]);
      return;
    }

    if (!selectedDate) {
      setDayCategories([]);
      return;
    }

    const split = isDateInSplit(selectedDate, splits.data);

    if (!split) {
      setDayCategories([]);
      return;
    }

    const key = getDayKey(selectedDate, new Date(split.startDate));
    if (!Object.keys(split.exerciseTemplate).includes(key)) {
      setDayCategories([]);
      return;
    }

    const newCategories: string[] = [];
    split.categories[key].forEach(category => {
      const categoryName = categories.data.find(el => el.id === category);
      if (categoryName !== undefined) {
        newCategories.push(categoryName.name);
      }
    });

    setDayCategories(newCategories);
  }, [
    selectedDate,
    splits.isSuccess,
    splits.data,
    categories.isSuccess,
    categories.data,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          isRangeSelectable={false}
          selectedDates={[selectedDate, undefined]}
          setSelectedDates={newDate => setSelectedDate(newDate[0])}
          ranges={ranges}
          color={selectedSplit ? selectedSplit.color : ''}
        />
      </View>
      <View style={styles.exercisesContainer}>
        <View style={styles.exercises}>
          {dayCategories.length > 0 ? (
            <Text style={styles.exercisesText}>{dayCategories.join(', ')}</Text>
          ) : (
            <Text style={styles.exercisesText}>
              {'No exercises planned for today'}
            </Text>
          )}
          <Pressable
            onPress={() => {
              if (selectedDate) {
                navigation.navigate({
                  name: 'Exercises',
                  params: { selectedDate: selectedDate.toString() },
                });
              }
            }}
            style={styles.navButton}
          >
            <MaterialCommunityIcons
              name={'arrow-right-bold'}
              size={32}
              color={'#000'}
            />
          </Pressable>
        </View>
      </View>
      {selectedSplit && (
        <View style={styles.splitContainer}>
          <View
            style={[
              styles.splitDetails,
              { backgroundColor: selectedSplit.color },
            ]}
          >
            <Text style={styles.splitDetailsText}>
              {`${formattedStartDate} - ${formattedEndDate}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    padding: 8,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    flex: 1,
    minHeight: 500,
    maxHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercisesContainer: {
    flex: 2,
    minHeight: 70,
    maxHeight: 70,
    paddingVertical: 20,
  },
  exercises: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exercisesText: {
    fontSize: 22,
    fontWeight: '300',
  },
  navButton: {
    marginLeft: 8,
  },
  splitContainer: {
    flex: 3,
  },
  splitDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  splitDetailsText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default CalendarScreen;
