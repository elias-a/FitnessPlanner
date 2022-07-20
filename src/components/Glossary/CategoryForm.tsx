import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import type { FormProps } from '../../types/glossary';
import type { Category } from '../../types/category';

const CategoryForm: React.FC<FormProps<Category>> = ({ item, update }) => {
  return (
    <View style={styles.textInputSection}>
      <TextInput
        value={item.name}
        onChangeText={name => update('name', name)}
        placeholder={'Enter category name...'}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CategoryForm;
