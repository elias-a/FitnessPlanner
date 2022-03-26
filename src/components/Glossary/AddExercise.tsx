import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { addExercise } from '../../slices/exercise';
import uuid from 'react-native-uuid';
import MultiSelect from '../MultiSelect';
import type { Category } from '../../types/category';

type AddExerciseProps = NativeStackScreenProps<Stack, 'AddExercise'>;

const AddExercise: React.FC<AddExerciseProps> = ({ navigation }) => {
  const [exercise, setExercise] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  const add = () => {
    dispatch(
      addExercise({
        id: uuid.v4().toString(),
        name: exercise,
        categories: selectedCategories.map(item => item.id),
      }),
    );

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
      <Text style={styles.title}>{'Add Exercise'}</Text>

      <TextInput
        value={exercise}
        onChangeText={setExercise}
        placeholder={'Enter exercise name...'}
        style={styles.textInput}
      />
      <MultiSelect
        items={categories}
        selectedItems={selectedCategories}
        onSelectedItemsChange={items => setSelectedCategories(items)}
        isSingle={false}
        subKey={'subCategories'}
      />
      <Pressable onPress={add} style={styles.addButton}>
        <Text>{'Add Exercise'}</Text>
      </Pressable>
    </View>
  );
};

export default AddExercise;
