import React from 'react';
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import uuid from 'react-native-uuid';

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
  const dates: WeekData[] = React.useMemo(() => {
    let week: WeekData[] = [];
    const selectedDayOfWeek = selectedDate.getDay();

    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i - selectedDayOfWeek);

      week.push({
        key: uuid.v4().toString(),
        date: date,
      });
    }

    return week;
  }, [selectedDate]);

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
        getItemLayout={(_, index) => ({
          length: itemWidth,
          offset: (itemWidth + 18) * index,
          index,
        })}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width * 0.24;

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: 70,
    borderRadius: 5,
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
