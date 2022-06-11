import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from 'react-query';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from '../../hooks/category';
import { getCategories } from '../../models/tasks/category';
import ScrollableList from '../ScrollableList';
import CategoryModal from '../Modals/Category';
import type { Category } from '../../types/category';
import uuid from 'react-native-uuid';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  const categories = useQuery('categories', getCategories);
  const addMutation = useAddCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(true);
  };

  const saveCategory = (category: Category, editing: boolean) => {
    addMutation.mutate({
      category: {
        ...category,
        id: editing ? category.id : uuid.v4().toString(),
      },
      editing: editing,
    });

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
      {categories.isSuccess &&
        categories.data.map(category => {
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
                <Pressable onPress={() => deleteMutation.mutate({ category })}>
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
