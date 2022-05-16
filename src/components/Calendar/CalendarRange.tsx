import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import type { CalendarRange as CalendarRangeType } from '../../types/calendar';
import { checkDateEquality } from '../../utils/checkDateEquality';
import { isDateInRange } from '../../utils/isDateInRange';

const dayWidth = 45;

interface CalendarData {
  key: string;
  type: string;
  data: string | Date;
}

interface CalendarRangeProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  ranges: CalendarRangeType[];
  color: string;
}

const CalendarRange: React.FC<CalendarRangeProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ranges,
  color,
}) => {
  const [today, setToday] = React.useState<Date>(new Date());
  const [calendar, setCalendar] = React.useState<CalendarData[]>([]);
  const daysOfWeek: CalendarData[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
    day => {
      return {
        key: uuid.v4().toString(),
        type: 'header',
        data: day,
      };
    },
  );
  const flatListRef:
    | React.RefObject<FlatList<CalendarData>>
    | undefined
    | null = React.createRef();

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: dayWidth * 20,
    });
  }, [flatListRef]);

  React.useEffect(() => {
    const data: CalendarData[] = [];

    for (let i = -4; i <= 4; i++) {
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth() + i);
      let startDay = firstOfMonth.getDay();
      // Start each week on Monday, not Sunday.
      startDay = startDay === 0 ? 6 : startDay - 1;

      data.push({
        key: uuid.v4().toString(),
        type: 'monthYear',
        data: firstOfMonth,
      });
      for (let j = 0; j < 6; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'monthYearFiller',
          data: '',
        });
      }

      for (let j = 0; j < startDay; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'filler',
          data: '',
        });
      }

      const endOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + i + 1,
        0,
      );
      for (let j = 1; j <= endOfMonth.getDate(); j++) {
        const day = new Date(
          firstOfMonth.getFullYear(),
          firstOfMonth.getMonth(),
          firstOfMonth.getDate() + j - 1,
        );

        data.push({
          key: uuid.v4().toString(),
          type: 'date',
          data: day,
        });
      }

      let endDay = endOfMonth.getDay();
      endDay = endDay === 0 ? 6 : endDay - 1;
      for (let j = endDay + 1; j < 7; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'filler',
          data: '',
        });
      }
    }

    setCalendar(data);
  }, [today]);

  const onSelect = (data: Date) => {
    // If a start date but not an end date is selected,
    // select an end date, or select a new start date.
    if (startDate && !endDate) {
      if (data < startDate) {
        setStartDate(data);
        setEndDate(undefined);
      } else {
        setEndDate(data);
      }
    }
    // If both a start and end date are selected,
    // select a start date.
    else if (startDate && endDate) {
      setStartDate(data);
      setEndDate(undefined);
    }
    // If no dates are selected, select a start date.
    else {
      setStartDate(data);
    }
  };

  const renderItem = ({ item }: { item: CalendarData }) => {
    if (item.type === 'header') {
      return (
        <View style={[styles.item]}>
          <Text>{item.data}</Text>
        </View>
      );
    } else if (item.type === 'filler') {
      return <View style={[styles.item]} />;
    } else if (item.type === 'monthYear') {
      const monthName = item.data.toLocaleString('default', { month: 'long' });
      const year = item.data.toLocaleString('default', { year: 'numeric' });

      return (
        <View style={styles.monthYear}>
          <Text style={styles.monthYearText}>{`${monthName} ${year}`}</Text>
        </View>
      );
    } else if (item.type === 'monthYearFiller') {
      return <View style={{ width: 0 }} />;
    } else {
      const itemData = item.data as Date;
      const isToday = checkDateEquality(today, itemData);
      const isSelected =
        startDate !== undefined
          ? checkDateEquality(startDate, itemData)
          : false;
      const isSelectedEnd =
        endDate !== undefined ? checkDateEquality(endDate, itemData) : false;

      let isInRange = false;
      if (startDate !== undefined && endDate !== undefined) {
        const range: CalendarRangeType = {
          startRange: startDate,
          endRange: endDate,
          color: color,
        };
        if (isDateInRange(itemData, [range])) {
          isInRange = true;
        }
      }

      let otherSplitColor = isDateInRange(itemData, ranges);
      let isInOtherRange = false;
      if (otherSplitColor) {
        isInOtherRange = true;
      }

      return (
        <Pressable
          onPress={() => onSelect(itemData)}
          style={[
            styles.item,
            (isSelected || isSelectedEnd) && {
              backgroundColor: '#484848',
              borderRadius: 30,
            },
            isInRange && { backgroundColor: color },
            isInOtherRange && { backgroundColor: otherSplitColor },
          ]}
        >
          <Text
            style={[
              (isSelected || isSelectedEnd) && { color: '#fff' },
              isToday && { fontWeight: '900' },
            ]}
          >
            {itemData.getDate().toString()}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={daysOfWeek}
        renderItem={renderItem}
        numColumns={7}
        getItemLayout={(_, index) => ({
          length: dayWidth,
          offset: dayWidth * index,
          index,
        })}
        scrollEnabled={false}
      />
      <FlatList
        data={calendar}
        renderItem={renderItem}
        numColumns={7}
        getItemLayout={(_, index) => ({
          length: dayWidth,
          offset: dayWidth * index,
          index,
        })}
        bounces={false}
        extraData={[startDate, endDate, color]}
        ref={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  item: {
    minWidth: dayWidth,
    maxWidth: dayWidth,
    minHeight: dayWidth,
    maxHeight: dayWidth,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 18,
  },
});

export default CalendarRange;
