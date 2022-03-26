import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { addCategory } from '../../slices/category';
import uuid from 'react-native-uuid';
import MultiSelect from '../MultiSelect';

import type { Category } from '../../types/category';

type AddCategoryProps = NativeStackScreenProps<Stack, 'AddCategory'>;

const AddCategory: React.FC<AddCategoryProps> = ({ navigation }) => {
  const [category, setCategory] = React.useState('');
  const [parentOptions, setParentOptions] = React.useState<Category[]>([]);
  const [selectedParent, setSelectedParent] = React.useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  React.useEffect(() => {
    const parents: Category[] = [];
    categories.forEach(item => {
      if (!Object.keys(item).includes('subCategories')) {
        parents.push(item);
      }
    });

    setParentOptions(parents);
  }, [categories]);

  const add = () => {
    dispatch(
      addCategory({
        id: uuid.v4().toString(),
        name: category,
      }),
    );

    navigation.goBack();
  };

  return (
    <React.Fragment>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name={'arrow-left-bold'}
            size={32}
            color={'#000'}
          />
        </Pressable>
        <Text style={styles.title}>{'Add Category'}</Text>
      </View>

      <View>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder={'Enter category name...'}
          style={styles.textInput}
        />
        <MultiSelect
          items={parentOptions}
          selectedItems={selectedParent}
          onSelectedItemsChange={item => setSelectedParent(item)}
          isSingle={true}
        />
        <Pressable onPress={add} style={styles.addButton}>
          <Text>{'Add Category'}</Text>
        </Pressable>
      </View>
    </React.Fragment>
  );
};

export default AddCategory;
