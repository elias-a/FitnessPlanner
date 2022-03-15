import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

type AddCategoryProps = NativeStackScreenProps<Stack, 'AddCategory'>;

const AddCategory: React.FC<AddCategoryProps> = ({ navigation }) => {
  const [category, setCategory] = React.useState('');

  const add = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons
          name={'arrow-left-bold'}
          size={32}
          color={'#000'}
        />
      </Pressable>
      <Text style={styles.title}>{'Add Category'}</Text>

      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder={'Enter category name...'}
        style={styles.textInput}
      />
      <Pressable onPress={add} style={styles.addButton}>
        <Text>{'Add Category'}</Text>
      </Pressable>
    </View>
  );
};

export default AddCategory;
