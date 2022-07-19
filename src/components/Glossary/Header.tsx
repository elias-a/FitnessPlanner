import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  add: () => void;
}

const Header: React.FC<HeaderProps> = ({ add }) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => {}} style={styles.icon}>
        <MaterialCommunityIcons
          name={'tune-variant'}
          size={32}
          color={'#000'}
        />
      </Pressable>
      <Pressable onPress={add} style={styles.icon}>
        <MaterialCommunityIcons name={'plus'} size={32} color={'#000'} />
      </Pressable>
      <Pressable onPress={() => {}} style={styles.icon}>
        <MaterialCommunityIcons
          name={'content-save'}
          size={32}
          color={'#000'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: 32,
    maxHeight: 32,
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  icon: {
    minWidth: 32,
    maxWidth: 32,
    marginHorizontal: 2,
  },
});

export default Header;
