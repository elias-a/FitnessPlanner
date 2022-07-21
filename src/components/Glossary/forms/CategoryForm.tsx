import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import type { FormProps } from '../../../types/glossary';
import type { Category } from '../../../types/category';
import Modal from '../../Modals/Modal';

const CategoryForm: React.FC<FormProps<Category>> = ({
  isOpen,
  onCancel,
  onSave,
  item,
  isEditing,
  update,
}) => {
  const handleSave = (event: GestureResponderEvent) => {
    event.preventDefault();
    onSave(item, isEditing);
  };

  return (
    <Modal isOpen={isOpen} close={onCancel} swipeDirection={'down'}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.textInputSection}>
            <TextInput
              value={item.name}
              onChangeText={name => update('name', name)}
              placeholder={'Enter category name...'}
              style={styles.textInput}
            />
          </View>

          <View style={styles.saveButtonSection}>
            <Pressable onPress={handleSave} style={styles.fullWidthButton}>
              <Text style={{ fontSize: 20 }}>{'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    minHeight: '90%',
    maxHeight: '90%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInputSection: {
    flex: 1,
    paddingTop: 30,
    minHeight: 70,
  },
  textInput: {
    flex: 1,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    borderWidth: 1,
    padding: 10,
  },
  saveButtonSection: {
    flex: 5,
    justifyContent: 'flex-end',
    minHeight: 102,
    maxHeight: 102,
    marginBottom: 35,
  },
  fullWidthButton: {
    minWidth: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
    marginTop: 1,
  },
});

export default CategoryForm;
