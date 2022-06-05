import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { modulo } from '../../utils/modulo';

const dayWidth = 95;

interface WeekData {
  key: string;
  date: Date;
}

interface ScrollableWeekProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const ScrollableWeek: React.FC<ScrollableWeekProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [initialScrollIndex, setInitialScrollIndex] = React.useState(0);
  const [dates, setDates] = React.useState<WeekData[]>([]);
  const flatListRef: React.RefObject<FlatList<WeekData>> | undefined | null =
    React.createRef();

  React.useEffect(() => {
    let week: WeekData[] = [];
    let selectedDayOfWeek = selectedDate.getDay();
    // Change the number for Sunday from 0 to 7.
    selectedDayOfWeek = selectedDayOfWeek === 0 ? 7 : selectedDayOfWeek;

    for (let i = 1; i <= 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i - selectedDayOfWeek);

      week.push({
        key: uuid.v4().toString(),
        date: date,
      });
    }

    setDates(week);
    setInitialScrollIndex(modulo(selectedDate.getDay() - 1, 7));
  }, [selectedDate]);

  React.useEffect(() => {
    if (
      flatListRef.current?.props.data &&
      flatListRef.current?.props.data.length > 0
    ) {
      flatListRef.current?.scrollToOffset({
        offset: dayWidth * modulo(selectedDate.getDay() - 1, 7),
      });
    }
  }, [flatListRef, selectedDate, dates]);

  const renderItem = ({ item }: { item: WeekData }) => {
    const date = item.date.getDate();
    const dayName = item.date.toString().split(' ')[0];
    const isActive = selectedDate.getDate() === item.date.getDate();

    return (
      <Pressable
        onPress={() => setSelectedDate(item.date)}
        style={[styles.item, isActive && { backgroundColor: '#484848' }]}
      >
        <Text style={[styles.dateNumber, isActive && { color: '#fff' }]}>
          {date}
        </Text>
        <Text style={[isActive && { color: '#fff' }]}>{dayName}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={dates}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: dayWidth,
          offset: (dayWidth + 18) * index,
          index,
        })}
        ref={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: dayWidth,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#909090',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '900',
  },
});

export default ScrollableWeek;
