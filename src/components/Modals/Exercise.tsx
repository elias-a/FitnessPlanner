import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from './Modal';
import MultiSelect from '../MultiSelect';
import { useAppSelector } from '../../hooks';
import type { Exercise } from '../../types/exercise';

interface RandomizeExercisesProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (exercise: Exercise, editing: boolean) => void;
}

const RandomizeExercises: React.FC<RandomizeExercisesProps> = ({
  isOpen,
  onCancel,
  onSave,
}) => {
  const { categories } = useAppSelector(state => state.category);

  return (
    <Modal isOpen={isOpen}>
      <View style={styles.modal}>
        <View style={styles.headerSection}>
          <View style={styles.alertIcon}>
            <MaterialCommunityIcons
              name={'alert-circle-outline'}
              size={35}
              color={'#000'}
            />
          </View>

          <Text style={styles.headerText}>{'Randomize'}</Text>

          <Pressable onPress={onCancel} style={styles.closeIcon}>
            <MaterialCommunityIcons
              name={'close-circle-outline'}
              size={35}
              color={'#000'}
            />
          </Pressable>
        </View>

        <View style={styles.messageSection}>
          <View style={styles.categorySelect}>
            {/*<MultiSelect
              items={categories}
              selectedItems={selectedCategories}
              onSelectedItemsChange={onCategoriesSelection}
              isSingle={false}
              subKey={'subCategories'}
              selectText={'Choose categories...'}
            />*/}
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Pressable onPress={onSave} style={styles.confirmButton}>
            <Text>{'Save'}</Text>
          </Pressable>
          <Pressable onPress={onCancel} style={styles.cancelButton}>
            <Text>{'Cancel'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '50%',
    maxHeight: '50%',
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: '#fff',
  },
  headerSection: {
    minHeight: '12%',
    maxHeight: '12%',
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alertIcon: {
    position: 'absolute',
    top: 7,
    left: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 7,
    right: 15,
  },
  headerText: {
    position: 'absolute',
    top: 3,
    left: 50,
    fontSize: 35,
    color: '#000',
  },
  messageSection: {
    minHeight: '73%',
    maxHeight: '73%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttonSection: {
    minHeight: '15%',
    maxHeight: '15%',
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
  },
  cancelButton: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    right: 125,
  },
  confirmButton: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
  },
  categorySelect: {
    flex: 1,
    marginTop: 20,
    minHeight: 40,
    maxHeight: 40,
  },
});

export default RandomizeExercises;
