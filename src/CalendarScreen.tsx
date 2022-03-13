import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from './Calendar';

const CalendarScreen: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar />
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
