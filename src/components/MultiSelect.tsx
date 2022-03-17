import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MultiSelect: React.FC<{}> = ({}) => {
  return (
    <View style={styles.selectBar}>
      <Pressable onPress={() => {}} style={styles.selectButton}>
        <Text>{'Choose a category...'}</Text>
        <MaterialCommunityIcons
          name={'menu-down'}
          size={32}
          color={'#000'}
          style={styles.menuDownIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  selectBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  selectButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 40,
    marginBottom: 32,
    borderWidth: 1,
    padding: 10,
  },
  menuDownIcon: {
    position: 'absolute',
    right: 0,
    top: 2,
  },
});

export default MultiSelect;
