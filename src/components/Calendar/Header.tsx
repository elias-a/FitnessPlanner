import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  selectedMonth: Date;
  changeMonth: (change: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedMonth, changeMonth }) => {
  return (
    <View style={styles.header}>
      <View>
        <Pressable onPress={() => changeMonth(-1)}>
          <MaterialCommunityIcons
            name={'arrow-left-bold'}
            size={32}
            color={'#000'}
          />
        </Pressable>
      </View>
      <View style={styles.dateText}>
        <Text style={styles.monthName}>
          {selectedMonth.toLocaleString('default', { month: 'long' })}
        </Text>
        <Text style={styles.year}>
          {selectedMonth.toLocaleString('default', { year: 'numeric' })}
        </Text>
      </View>
      <View>
        <Pressable onPress={() => changeMonth(1)}>
          <MaterialCommunityIcons
            name={'arrow-right-bold'}
            size={32}
            color={'#000'}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  dateText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthName: {
    fontSize: 18,
  },
  year: {
    fontSize: 14,
  },
});

export default Header;
