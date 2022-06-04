import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import type {
  CalendarRange,
  SelectedDates,
  CalendarData,
} from '../../types/calendar';
import { checkDateEquality } from '../../utils/checkDateEquality';
import DaysOfWeekHeader from './DaysOfWeekHeader';
import Filler from './Filler';
import MonthYearSection from './MonthYearSection';
import Day from './Day';

const dayWidth = 45;

interface CalendarProps {
  isRangeSelectable: boolean;
  selectedDates: SelectedDates;
  setSelectedDates: (dates: SelectedDates) => void;
  ranges: CalendarRange[];
  color: string;
}

const Calendar: React.FC<CalendarProps> = ({
  isRangeSelectable,
  selectedDates,
  setSelectedDates,
  ranges,
  color,
}) => {
  const [today, setToday] = React.useState<Date>(new Date());
  const [calendar, setCalendar] = React.useState<CalendarData[]>([]);
  const [initialScrollIndex, setInitialScrollIndex] = React.useState(0);
  const flatListRef:
    | React.RefObject<FlatList<CalendarData>>
    | undefined
    | null = React.createRef();

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  React.useEffect(() => {
    const data: CalendarData[] = [];
    let index = 0;
    let todayIndex = 0;

    for (let i = -4; i <= 4; i++) {
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth() + i);
      let startDay = firstOfMonth.getDay();
      // Start each week on Monday, not Sunday.
      startDay = startDay === 0 ? 6 : startDay - 1;

      data.push({
        key: uuid.v4().toString(),
        type: 'monthYear',
        data: firstOfMonth,
        index: index++,
      });
      for (let j = 0; j < 6; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'monthYearFiller',
          data: '',
          index: index++,
        });
      }

      for (let j = 0; j < startDay; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'filler',
          data: '',
          index: index++,
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
          index: index++,
        });

        if (checkDateEquality(today, day)) {
          todayIndex = Math.floor(Math.max(index / 7 - 5, 0));
        }
      }

      let endDay = endOfMonth.getDay();
      endDay = endDay === 0 ? 6 : endDay - 1;
      for (let j = endDay + 1; j < 7; j++) {
        data.push({
          key: uuid.v4().toString(),
          type: 'filler',
          data: '',
          index: index++,
        });
      }
    }

    setCalendar(data);
    setInitialScrollIndex(todayIndex);
  }, [today]);

  const renderItem = ({ item }: { item: CalendarData }) => {
    if (item.type === 'filler') {
      return <Filler />;
    } else if (item.type === 'monthYear') {
      return <MonthYearSection item={item} />;
    } else if (item.type === 'monthYearFiller') {
      return <View style={{ width: 0 }} />;
    } else {
      return (
        <Day
          isRangeSelectable={isRangeSelectable}
          item={item}
          today={today}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          ranges={ranges}
          color={color}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calendar}
        renderItem={renderItem}
        ListHeaderComponent={DaysOfWeekHeader}
        stickyHeaderIndices={[0]}
        numColumns={7}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: dayWidth,
          offset: dayWidth * index,
          index,
        })}
        bounces={false}
        extraData={[selectedDates, color]}
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
});

export default Calendar;
