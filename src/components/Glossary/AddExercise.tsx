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
import type { Exercise } from '../../types/exercise';

const initialExercise: Exercise = {
  id: '',
  name: '',
  categories: [],
};

type AddExerciseProps = NativeStackScreenProps<Stack, 'AddExercise'>;

const AddExercise: React.FC<AddExerciseProps> = ({ route, navigation }) => {
  const [exercise, setExercise] = React.useState(initialExercise);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  React.useEffect(() => {
    if (route.params.exercise) {
      setExercise(route.params.exercise);
    } else {
      setExercise(initialExercise);
    }
  }, [route.params.exercise]);

  const updateExercise = <T,>(name: string, value: T) => {
    setExercise(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const add = () => {
    dispatch(
      addExercise({
        id: uuid.v4().toString(),
        name: exercise.name,
        categories: exercise.categories,
      }),
    );

    navigation.goBack();
  };

  return (
    <React.Fragment>
      <Header title={'Add Exercise'} goBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <TextInput
          value={exercise.name}
          onChangeText={name => updateExercise('name', name)}
          placeholder={'Enter exercise name...'}
          style={styles.textInput}
        />
        <MultiSelect
          items={categories}
          selectedItems={exercise.categories}
          onSelectedItemsChange={items => updateExercise('categories', items)}
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
