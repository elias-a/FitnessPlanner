import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useAppDispatch } from '../../hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import styles from './styles';
import { addCategory } from '../../slices/category';
import uuid from 'react-native-uuid';
//import MultiSelect from '../MultiSelect';
import type { Category } from '../../types/category';
import Header from './Header';

const initialCategory: Category = {
  id: '',
  name: '',
  subCategories: [],
};

type AddCategoryProps = NativeStackScreenProps<Stack, 'AddCategory'>;

const AddCategory: React.FC<AddCategoryProps> = ({ route, navigation }) => {
  const [category, setCategory] = React.useState(initialCategory);
  //const [parentOptions, setParentOptions] = React.useState<Category[]>([]);
  //const [selectedParent, setSelectedParent] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();
  //const { categories } = useAppSelector(state => state.category);

  React.useEffect(() => {
    if (route.params.category) {
      setCategory(route.params.category);
    } else {
      setCategory(initialCategory);
    }
  }, [route.params.category]);

  /*React.useEffect(() => {
    const parents: Category[] = [];
    categories.forEach(item => {
      if (!Object.keys(item).includes('subCategories')) {
        parents.push(item);
      }
    });

    setParentOptions(parents);
  }, [categories]);*/

  const updateCategory = <T,>(name: string, value: T) => {
    setCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const add = () => {
    const editing = !!route.params.category;

    dispatch(
      addCategory({
        category: {
          id: editing ? category.id : uuid.v4().toString(),
          name: category.name,
          subCategories: category.subCategories,
        },
        editing: editing,
      }),
    );

    navigation.goBack();
  };

  return (
    <React.Fragment>
      <Header title={'Add Category'} goBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <TextInput
          value={category.name}
          onChangeText={name => updateCategory('name', name)}
          placeholder={'Enter category name...'}
          style={styles.textInput}
        />
        {/*<MultiSelect
          items={parentOptions}
          selectedItems={category.subCategories}
          onSelectedItemsChange={item => updateCategory('subCategories', item)}
          isSingle={true}
          selectText={'Choose parent category...'}
        />*/}
        <Pressable onPress={add} style={styles.addButton}>
          <Text>{'Add Category'}</Text>
        </Pressable>
      </View>
    </React.Fragment>
  );
};

export default AddCategory;
