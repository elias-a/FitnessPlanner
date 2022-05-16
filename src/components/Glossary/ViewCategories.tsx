import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addCategory } from '../../slices/category';
import { deleteCategory } from '../../slices/category';
import ScrollableList from '../ScrollableList';
import CategoryModal from '../Modals/Category';
import type { Category } from '../../types/category';
import uuid from 'react-native-uuid';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  const { categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(true);
  };

  const saveCategory = (category: Category, editing: boolean) => {
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

    closeCategoryModal();
  };

  const closeCategoryModal = () => {
    setIsCategoryOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <ScrollableList
      title={'Categories'}
      goBack={() => navigation.goBack()}
      clickAddButton={() => setIsCategoryOpen(true)}
      modal={
        <CategoryModal
          isOpen={isCategoryOpen}
          onCancel={closeCategoryModal}
          onSave={saveCategory}
          selectedCategory={selectedCategory}
        />
      }
    >
      {categories.map(category => {
        return (
          <View key={category.id} style={styles.category}>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <View style={styles.editSection}>
              <Pressable onPress={() => handleEdit(category)}>
                <MaterialCommunityIcons
                  name={'pencil'}
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            </View>
            <View style={styles.deleteSection}>
              <Pressable onPress={() => dispatch(deleteCategory(category))}>
                <MaterialCommunityIcons
                  name={'delete'}
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollableList>
  );
};

const styles = StyleSheet.create({
  category: {
    width: 340,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 20,
    borderBottomWidth: 2,
  },
  categoryDetails: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    marginLeft: 5,
  },
  editSection: {
    flex: 2,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  deleteSection: {
    flex: 3,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  categoryName: {
    color: '#000',
    fontSize: 22,
  },
});

export default ViewCategories;
