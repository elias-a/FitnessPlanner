import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';

export const dayWidth = 95;

interface ScrollableDaysProps {
  numDays: number;
  colors: { [key: string]: string };
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  flatListRef: React.RefObject<FlatList<number>> | undefined | null;
}

const ScrollableDays: React.FC<ScrollableDaysProps> = ({
  numDays,
  colors,
  selectedDay,
  setSelectedDay,
  flatListRef,
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
    const finalizedColor = colors[item];
    const isActive = selectedDay === item;

    return (
      <Pressable
        onPress={() => setSelectedDay(item)}
        style={[
          styles.item,
          !!finalizedColor && { backgroundColor: finalizedColor },
          isActive && { backgroundColor: '#484848' },
        ]}
      >
        <Text style={[styles.dateNumber, isActive && { color: '#fff' }]}>
          {`Day ${item}`}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
  container: {
    flex: 1,
    minHeight: 70,
    maxHeight: 70,
  },
  item: {
    width: dayWidth,
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
