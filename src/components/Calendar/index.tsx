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
  const [initialScrollIndex, setInitialScrollIndex] = React.useState(0);
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

      if (i >= 0) {
        todayIndex++;
      }
    }

    setCalendar(data);
    setInitialScrollIndex(todayIndex);
  }, [today]);

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
      const isToday =
        today.getFullYear() === itemData.getFullYear() &&
        today.getMonth() === itemData.getMonth() &&
        today.getDate() === itemData.getDate();

      return (
        <Pressable
          onPress={() => {}}
          style={[
            styles.item,
            isToday && { backgroundColor: '#484848', borderRadius: 30 },
          ]}
        >
          <Text style={[isToday && { color: '#fff' }]}>
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
          length: width * 0.1,
          offset: (width * 0.24 + 18) * index,
          index,
        })}
      />
      <FlatList
        data={calendar}
        renderItem={renderItem}
        numColumns={7}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: width * 0.1,
          offset: (width * 0.24 + 18) * index,
          index,
        })}
        bounces={false}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    paddingLeft: width * 0.025,
    height: 450,
    backgroundColor: '#d0d0d0',
  },
  item: {
    width: width * 0.1,
    height: 40,
    marginRight: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    width: width,
    marginLeft: 120,
  },
  monthYearText: {
    fontSize: 18,
  },
});

export default Calendar;
