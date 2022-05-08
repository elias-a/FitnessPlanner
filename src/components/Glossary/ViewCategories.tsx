import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addCategory } from '../../slices/category';
import { deleteCategory } from '../../slices/category';
import Header from './Header';
import AddButton from './AddButton';
import CategoryModal from '../Modals/Category';
import type { Category } from '../../types/category';
import uuid from 'react-native-uuid';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const { categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

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

    setIsCategoryOpen(false);
  };

  return (
    <React.Fragment>
      <View style={styles.pageContainer}>
        <Header title={'Categories'} goBack={() => navigation.goBack()} />

        <View style={styles.viewContainer}>
          <View style={styles.listContainer}>
            {categories.map(category => {
              return (
                <View key={category.id} style={styles.category}>
                  <View style={styles.categoryDetails}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <View style={styles.editSection}>
                    <Pressable onPress={() => {}}>
                      <MaterialCommunityIcons
                        name={'pencil'}
                        size={32}
                        color={'#000'}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.deleteSection}>
                    <Pressable
                      onPress={() => dispatch(deleteCategory(category))}
                    >
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
          </View>

          <View style={styles.addButtonSection}>
            <AddButton add={() => setIsCategoryOpen(true)} />
          </View>
        </View>
      </View>

      <CategoryModal
        isOpen={isCategoryOpen}
        onCancel={() => setIsCategoryOpen(false)}
        onSave={saveCategory}
        editing={false}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '90%',
    maxHeight: '90%',
  },
  listContainer: {
    flex: 1,
    minHeight: '80%',
    maxHeight: '80%',
    alignItems: 'center',
  },
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
  addButtonSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
});

export default ViewCategories;
