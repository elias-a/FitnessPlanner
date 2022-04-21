import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteCategory } from '../../slices/category';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const { categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons
          name={'arrow-left-bold'}
          size={32}
          color={'#000'}
        />
      </Pressable>
      <Text style={styles.title}>{'View Categories'}</Text>

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
  );
};

export default ViewCategories;
