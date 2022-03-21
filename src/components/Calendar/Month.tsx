import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import uuid from 'react-native-uuid';

interface CalendarData {
  key: string;
  type: string;
  data: string;
}

interface MonthProps {
  today: Date;
  selectedMonth: Date;
}

const Month: React.FC<MonthProps> = ({ today, selectedMonth }) => {
  const [calendar, setCalendar] = React.useState<CalendarData[]>([]);

  React.useEffect(() => {
    let data: CalendarData[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => {
      return {
        key: uuid.v4().toString(),
        type: 'header',
        data: day,
      };
    });

    const firstOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
    );
    let startDay = firstOfMonth.getDay();
    // Start each week on Monday, not Sunday.
    startDay = startDay === 0 ? 6 : startDay - 1;

    for (let i = 0; i < startDay; i++) {
      data.push({
        key: uuid.v4().toString(),
        type: 'filler',
        data: '',
      });
    }

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      data.push({
        key: uuid.v4().toString(),
        type: 'date',
        data: i.toString(),
      });
    }

    setCalendar(data);
  }, [today, selectedMonth]);

  const renderItem = ({ item }: { item: CalendarData }) => {
    const isToday =
      today.getDate() === parseInt(item.data, 10) &&
      selectedMonth.getMonth() === today.getMonth() &&
      selectedMonth.getFullYear() === today.getFullYear();

    if (item.type === 'header') {
      return (
        <View style={[styles.item]}>
          <Text>{item.data}</Text>
        </View>
      );
    } else if (item.type === 'filler') {
      return <View style={[styles.item]} />;
    } else {
      return (
        <Pressable
          onPress={() => {}}
          style={[
            styles.item,
            isToday && { backgroundColor: '#484848', borderRadius: 30 },
          ]}
        >
          <Text style={[isToday && { color: '#fff' }]}>{item.data}</Text>
        </Pressable>
      );
    }
  };

  return (
    <FlatList
      data={calendar}
      renderItem={renderItem}
      numColumns={7}
      getItemLayout={(_, index) => ({
        length: width * 0.1,
        offset: (width * 0.24 + 18) * index,
        index,
      })}
    />
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    width: width * 0.1,
    height: 40,
    marginRight: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Month;
