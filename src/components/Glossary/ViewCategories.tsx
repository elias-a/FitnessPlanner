import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteCategory } from '../../slices/category';
import Header from './Header';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const { categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Header title={'View Categories'} goBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.listContainer}>
          {categories.map(category => {
            return (
              <Pressable
                key={category.id}
                onPress={() => {}}
                style={styles.listItem}
              >
                <Text style={styles.itemText}>{category.name}</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate({
                      name: 'AddCategory',
                      params: { category: category },
                    })
                  }
                  style={styles.editButton}
                >
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => dispatch(deleteCategory(category))}
                  style={styles.deleteButton}
                >
                  <MaterialCommunityIcons
                    name={'delete'}
                    size={32}
                    color={'#000'}
                  />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </View>
    </React.Fragment>
  );
};

export default ViewCategories;
