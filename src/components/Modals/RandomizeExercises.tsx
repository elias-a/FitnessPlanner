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

          <View
            style={{
              flex: 5,
              justifyContent: 'flex-end',
              minHeight: 102,
              maxHeight: 102,
              marginBottom: 35,
            }}
          >
            <Pressable onPress={onRandomize} style={styles.fullWidthButton}>
              <Text style={{ fontSize: 20 }}>{'Randomize'}</Text>
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
    minHeight: '90%',
    maxHeight: '90%',
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
    minHeight: 130,
  },
  categorySelect: {
    flex: 1,
    marginTop: 20,
    minHeight: 40,
    maxHeight: 40,
  },
  fullWidthButton: {
    minWidth: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
    marginTop: 1,
  },
});

export default RandomizeExercises;
