import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

interface MultiSelectProps {
  items: { id: string; name: string }[];
  selectedItems: string[];
  onSelectedChange: (item: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  selectedItems,
  onSelectedChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={styles.selectBar}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.selectButton}>
        <Text>{'Choose a category...'}</Text>
        {!isOpen ? (
          <MaterialCommunityIcons
            name={'menu-down'}
            size={32}
            color={'#000'}
            style={styles.menuDownIcon}
          />
        ) : (
          <MaterialCommunityIcons
            name={'menu-up'}
            size={32}
            color={'#000'}
            style={styles.menuDownIcon}
          />
        )}
      </Pressable>

      {isOpen && (
        <View style={styles.menu}>
          {items.map(item => {
            return (
              <View key={item.id} style={styles.menuItem}>
                <Text style={styles.menuItemText}>{item.name}</Text>
                <CheckBox
                  value={selectedItems.includes(item.id)}
                  onValueChange={_value => onSelectedChange(item.id)}
                  style={styles.checkbox}
                  tintColor={'#fff'}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 32,
  },
  selectButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  menuDownIcon: {
    position: 'absolute',
    right: 0,
    top: 2,
  },
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

export default MultiSelect;
