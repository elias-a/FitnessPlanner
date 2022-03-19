import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface SelectBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SelectBar: React.FC<SelectBarProps> = ({ isOpen, setIsOpen }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default SelectBar;
