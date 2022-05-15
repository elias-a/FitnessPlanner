import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from './Modal';
import MultiSelect from '../MultiSelect';
import { useAppSelector } from '../../hooks';

interface RandomizeExercisesProps {
  isOpen: boolean;
  onCancel: () => void;
  onRandomize: () => void;
  onCategoriesSelection: (categories: string[]) => void;
  selectedCategories: string[];
}

const RandomizeExercises: React.FC<RandomizeExercisesProps> = ({
  isOpen,
  onCancel,
  onRandomize,
  onCategoriesSelection,
  selectedCategories,
}) => {
  const { categories } = useAppSelector(state => state.category);

  return (
    <Modal isOpen={isOpen} close={onCancel}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.messageSection}>
            <View style={styles.categorySelect}>
              <MultiSelect
                items={categories}
                selectedItems={selectedCategories}
                onSelectedItemsChange={onCategoriesSelection}
                isSingle={false}
                subKey={'subCategories'}
                selectText={'Choose categories...'}
              />
            </View>
          </View>

          <View style={styles.saveButtonSection}>
            <Pressable onPress={onRandomize} style={styles.addButton}>
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
    minHeight: '55%',
    maxHeight: '55%',
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
  messageSection: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 130,
  },
  categorySelect: {
    flex: 1,
    marginTop: 20,
    minHeight: 40,
    maxHeight: 40,
  },
  saveButtonSection: {
    flex: 2,
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
});

export default RandomizeExercises;
