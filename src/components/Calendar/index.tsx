import React from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import uuid from 'react-native-uuid';

interface CalendarData {
  key: string;
  type: string;
  data: string | Date;
}

const Calendar: React.FC<{}> = ({}) => {
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

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  React.useEffect(() => {
    const data: CalendarData[] = [];

    for (let i = -2; i <= 2; i++) {
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
        data.push({
          key: uuid.v4().toString(),
          type: 'date',
          data: j.toString(),
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

  const renderItem = ({ item }: { item: CalendarData }) => {
    const isToday = false;

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
    <View>
      <FlatList
        data={daysOfWeek}
        renderItem={renderItem}
        numColumns={7}
        getItemLayout={(_, index) => ({
          length: width * 0.1,
          offset: (width * 0.24 + 18) * index,
          index,
        })}
      />
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
    </View>
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
  monthYear: {
    alignItems: 'center',
    width: width,
  },
  monthYearText: {
    fontSize: 18,
  },
});

export default Calendar;
