import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import styles from './styles';
import { addExercise } from '../../slices/exercise';
import uuid from 'react-native-uuid';
import MultiSelect from '../MultiSelect';
import Header from './Header';

type AddExerciseProps = NativeStackScreenProps<Stack, 'AddExercise'>;

const AddExercise: React.FC<AddExerciseProps> = ({ navigation }) => {
  const [exercise, setExercise] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  const add = () => {
    dispatch(
      addExercise({
        id: uuid.v4().toString(),
        name: exercise,
        categories: selectedCategories,
      }),
    );

    navigation.goBack();
  };

  return (
    <React.Fragment>
      <Header title={'Add Exercise'} goBack={() => navigation.goBack()} />

      <View style={styles.container}>
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
          selectText={'Choose categories...'}
        />
        <Pressable onPress={add} style={styles.addButton}>
          <Text>{'Add Exercise'}</Text>
        </Pressable>
      </View>
    </React.Fragment>
  );
};

export default AddExercise;
