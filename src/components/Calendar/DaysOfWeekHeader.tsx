import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { CalendarData } from '../../types/calendar';

const dayWidth = 45;

const DaysOfWeekHeader: React.FC<{}> = ({}) => {
  const daysOfWeek: CalendarData[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
    day => {
      return {
        key: uuid.v4().toString(),
        type: 'header',
        data: day,
      };
    },
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}
    >
      {daysOfWeek.map(dayOfWeek => {
        return (
          <View key={dayOfWeek.key} style={[styles.item]}>
            <Text>{dayOfWeek.data}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    minWidth: dayWidth,
    maxWidth: dayWidth,
    minHeight: dayWidth,
    maxHeight: dayWidth,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DaysOfWeekHeader;
