import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks';
import Calendar from '../components/Calendar';
import { getDayKey } from '../utils/getDayKey';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Tab } from '../App';

const formatDate = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}`;
};

type CalendarScreenProps = BottomTabScreenProps<Tab, 'Calendar'>;

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [formattedStartDate, setFormattedStartDate] = React.useState('');
  const [formattedEndDate, setFormattedEndDate] = React.useState('');
  const [splitLength, setSplitLength] = React.useState(0);
  const [dayCategories, setDayCategories] = React.useState<string[]>([]);
  const split = useAppSelector(state => state.split);
  const { categories } = useAppSelector(state => state.category);

  React.useEffect(() => {
    if (split.startDate !== '' && split.endDate !== '') {
      const newStartDate = new Date(split.startDate);
      setStartDate(newStartDate);
      setFormattedStartDate(formatDate(newStartDate));

      const newEndDate = new Date(split.endDate);
      setEndDate(newEndDate);
      setFormattedEndDate(formatDate(newEndDate));

      const numWeeks = Math.ceil(
        (newEndDate.getTime() - newStartDate.getTime()) / 86400 / 1000 / 7,
      );
      setSplitLength(numWeeks);
    } else {
      setStartDate(undefined);
      setFormattedEndDate('');
    }
  }, [split]);

  React.useEffect(() => {
    const key = getDayKey(selectedDate, new Date(split.startDate));
    if (!Object.keys(split.exercises).includes(key)) {
      return;
    }

    const newCategories: string[] = [];
    split.categories[key].forEach(category => {
      const categoryName = categories.find(el => el.id === category);
      if (categoryName !== undefined) {
        newCategories.push(categoryName.name);
      }
    });

    setDayCategories(newCategories);
  }, [selectedDate, split, categories]);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          selectedDate={selectedDate}
          startRange={startDate}
          endRange={endDate}
          setSelectedDate={setSelectedDate}
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
            onPress={() =>
              navigation.navigate({ name: 'Exercises', params: undefined })
            }
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
      {startDate && (
        <View style={styles.splitContainer}>
          <View style={[styles.splitDetails, styles.splitLength]}>
            <Text style={styles.splitDetailsText}>
              {`Current Split: ${splitLength} weeks`}
            </Text>
          </View>
          <View style={styles.splitDetails}>
            <Text
              style={styles.splitDetailsText}
            >{`${formattedStartDate} - ${formattedEndDate}`}</Text>
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
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercisesContainer: {
    marginTop: 50,
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
    marginTop: 50,
  },
  splitDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  splitLength: {
    backgroundColor: '#909090',
  },
  splitDetailsText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default CalendarScreen;
