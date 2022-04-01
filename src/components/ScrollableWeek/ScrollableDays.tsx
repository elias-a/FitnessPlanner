import React from 'react';
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface ScrollableDaysProps {
  numDays: number;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const ScrollableDays: React.FC<ScrollableDaysProps> = ({
  numDays,
  selectedDay,
  setSelectedDay,
}) => {
  const [days, setDays] = React.useState<number[]>([]);

  React.useEffect(() => {
    const newDays: number[] = [];
    for (let i = 1; i <= numDays; i++) {
      newDays.push(i);
    }

    setDays(newDays);
  }, [numDays]);

  const renderItem = ({ item }: { item: number }) => {
    const isActive = selectedDay === item;

    return (
      <Pressable
        onPress={() => setSelectedDay(item)}
        style={[styles.item, isActive && { backgroundColor: '#484848' }]}
      >
        <Text style={[styles.dateNumber, isActive && { color: '#fff' }]}>
          {`Day ${item}`}
        </Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={days}
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

export default ScrollableDays;
