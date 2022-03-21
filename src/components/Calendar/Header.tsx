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
      <View>
        <Text style={styles.monthName}>
          {selectedMonth.toLocaleString('default', { month: 'long' })}
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
  monthName: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Header;
