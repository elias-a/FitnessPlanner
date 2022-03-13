import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

interface CalendarData {
  key: string;
  type: string;
  data: string;
}

const Calendar: React.FC<{}> = ({}) => {
  const [today, setToday] = React.useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const date = new Date();
    setToday(date);
    setSelectedMonth(date);
  }, []);

  const calendar: CalendarData[] = React.useMemo(() => {
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
    const startDay = firstOfMonth.getDay();

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

    return data;
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
    <View>
      <View style={styles.header}>
        <View>
          <MaterialCommunityIcons
            name={'arrow-left-bold'}
            size={32}
            color={'#000'}
          />
        </View>
        <View>
          <Text style={styles.monthName}>
            {selectedMonth.toLocaleString('default', { month: 'long' })}
          </Text>
        </View>
        <View>
          <MaterialCommunityIcons
            name={'arrow-right-bold'}
            size={32}
            color={'#000'}
          />
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  item: {
    width: width * 0.1,
    height: 40,
    marginRight: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthName: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Calendar;
