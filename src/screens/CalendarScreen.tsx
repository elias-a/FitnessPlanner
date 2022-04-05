import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks';
import Calendar from '../components/Calendar';

const formatDate = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}`;
};

const CalendarScreen: React.FC<{}> = ({}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [formattedStartDate, setFormattedStartDate] = React.useState('');
  const [formattedEndDate, setFormattedEndDate] = React.useState('');
  const [splitLength, setSplitLength] = React.useState(0);
  const split = useAppSelector(state => state.split);

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
