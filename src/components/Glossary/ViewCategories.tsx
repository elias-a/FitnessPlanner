import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import { useQuery } from 'react-query';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from '../../hooks/category';
import { getCategories } from '../../models/tasks/category';
import ScrollableList from '../ScrollableList';
import CategoryModal from '../Modals/Category';
import ContextMenu from '../ContextMenu';
import Header from './Header';
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

  const handleRemove = (category: Category) => {
    addMutation.mutate({
      category: {
        ...category,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (category: Category) => {
    addMutation.mutate({
      category: {
        ...category,
        isDeleted: false,
      },
      editing: true,
    });
  };

  const saveCategory = (category: Category, editing: boolean) => {
    delete category.isDeleted;

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
      modal={
        <CategoryModal
          isOpen={isCategoryOpen}
          onCancel={closeCategoryModal}
          onSave={saveCategory}
          selectedCategory={selectedCategory}
        />
      }
    >
      <Header add={() => setIsCategoryOpen(true)} />
      <View style={{ flex: 2, minWidth: '100%', alignItems: 'center' }}>
        {categories.isSuccess &&
          categories.data.map(category => {
            return (
              <View
                key={category.id}
                style={[
                  styles.category,
                  Object.keys(category).includes('isDeleted') &&
                    category.isDeleted && { backgroundColor: '#ffcccb' },
                ]}
              >
                <View style={styles.categoryDetails}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>

                <ContextMenu
                  item={category}
                  edit={handleEdit}
                  remove={handleRemove}
                  undoRemove={handleUndoRemove}
                />
              </View>
            );
          })}
      </View>
    </ScrollableList>
  );
};

const styles = StyleSheet.create({
  category: {
    minWidth: 340,
    maxWidth: 340,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
  contextSection: {
    position: 'absolute',
    right: 1,
  },
  contextButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ViewCategories;
