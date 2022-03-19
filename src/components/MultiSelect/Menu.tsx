import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import type { Category } from '../../types/category';

interface MenuProps {
  items: { id: string; name: string }[];
  selectedItems: string[];
  onSelectedChange: (item: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  items,
  selectedItems,
  onSelectedChange,
}) => {
  const renderItem = ({ item }: { item: Category }) => {
    return (
      <View key={item.id} style={styles.menuItem}>
        <CheckBox
          value={selectedItems.includes(item.id)}
          onValueChange={_value => onSelectedChange(item.id)}
          style={styles.checkbox}
          tintColor={'#fff'}
        />
        <Text style={styles.menuItemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.menu}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: 300,
    height: 160,
    backgroundColor: '#b8b8b8',
  },
  menuItem: {
    width: 300,
    height: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  menuItemText: {
    fontSize: 22,
    marginLeft: 10,
  },
  checkbox: {
    position: 'absolute',
    right: -160,
  },
});

export default Menu;
