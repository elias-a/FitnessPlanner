import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AddButtonProps {
  add: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ add }) => {
  return (
    <Pressable onPress={add} style={styles.button}>
      <MaterialCommunityIcons name={'plus'} size={50} color={'#000'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#909090',
    borderRadius: 50,
    minHeight: 75,
    maxHeight: 75,
    minWidth: 75,
    maxWidth: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default AddButton;
