import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Modal from './Modal';
import type { Category } from '../../types/category';

const initialCategory: Category = {
  id: '',
  name: '',
  subCategories: [],
};

interface CategoryModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (category: Category, editing: boolean) => void;
  selectedCategory?: Category;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onCancel,
  onSave,
  selectedCategory,
}) => {
  const [category, setCategory] = React.useState(initialCategory);

  React.useEffect(() => {
    if (selectedCategory) {
      setCategory({ ...selectedCategory });
    } else {
      setCategory({ ...initialCategory });
    }
  }, [isOpen, selectedCategory]);

  const updateCategory = <T,>(name: string, value: T) => {
    setCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setCategory(initialCategory);
    onCancel();
  };

  const handleSave = () => {
    onSave(category, !!selectedCategory);
    setCategory(initialCategory);
  };

  return (
    <Modal isOpen={isOpen} close={handleCancel} swipeDirection={'down'}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.textInputSection}>
            <TextInput
              value={category.name}
              onChangeText={name => updateCategory('name', name)}
              placeholder={'Enter category name...'}
              style={styles.textInput}
            />
          </View>

          <View style={styles.saveButtonSection}>
            <Pressable onPress={handleSave} style={styles.addButton}>
              <Text style={{ fontSize: 20 }}>{'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    minHeight: '60%',
    maxHeight: '60%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInputSection: {
    flex: 1,
    paddingTop: 30,
    minHeight: 70,
    maxHeight: 70,
  },
  textInput: {
    flex: 1,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    borderWidth: 1,
    padding: 10,
  },
  multiSelectSection: {
    flex: 2,
    paddingTop: 30,
    minHeight: 70,
    maxHeight: 70,
  },
  saveButtonSection: {
    flex: 3,
    minHeight: 110,
    maxHeight: 110,
    paddingVertical: 30,
  },
  addButton: {
    flex: 2,
    alignSelf: 'flex-end',
    minWidth: 350,
    maxWidth: 350,
    minHeight: 50,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
  },

  dropdown1BtnStyle: {
    padding: 0,
    margin: 0,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#efefef',
  },
  dropdown1RowStyle: {
    backgroundColor: '#efefef',
    borderBottomColor: '#c5c5c5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
});

export default CategoryModal;
