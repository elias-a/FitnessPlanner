import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  selectedMonth: Date;
}

const Header: React.FC<HeaderProps> = ({ selectedMonth }) => {
  return (
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
