import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarData } from '../../types/calendar';

const dayWidth = 45;

const MonthYearSection: React.FC<{ item: CalendarData }> = ({ item }) => {
  const monthName = item.data.toLocaleString('default', { month: 'long' });
  const year = item.data.toLocaleString('default', { year: 'numeric' });

  return (
    <View style={styles.monthYear}>
      <Text style={styles.monthYearText}>{`${monthName} ${year}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  monthYear: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 18,
  },
});

export default MonthYearSection;
