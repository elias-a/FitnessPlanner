import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks';
import Calendar from '../components/Calendar';

const CalendarScreen: React.FC<{}> = ({}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const split = useAppSelector(state => state.split);

  React.useEffect(() => {
    if (split.startDate !== '') {
      setStartDate(new Date(split.startDate));
    } else {
      setStartDate(undefined);
    }

    if (split.endDate !== '') {
      setEndDate(new Date(split.endDate));
    } else {
      setEndDate(undefined);
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
});

export default CalendarScreen;
