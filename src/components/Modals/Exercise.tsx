import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from './Modal';
import MultiSelect from '../MultiSelect';
import { useAppSelector } from '../../hooks';
import type { Exercise } from '../../types/exercise';

const initialExercise: Exercise = {
  id: '',
  name: '',
  categories: [],
};

interface ExerciseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (exercise: Exercise, editing: boolean) => void;
  editing: boolean;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onCancel,
  onSave,
  editing,
}) => {
  const [exercise, setExercise] = React.useState(initialExercise);
  const { categories } = useAppSelector(state => state.category);

  const updateExercise = <T,>(name: string, value: T) => {
    setExercise(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(exercise, editing);
  };

  return (
    <Modal isOpen={isOpen} close={onCancel}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.textInputSection}>
            <TextInput
              value={exercise.name}
              onChangeText={name => updateExercise('name', name)}
              placeholder={'Enter exercise name...'}
              style={styles.textInput}
            />
          </View>

          <View style={styles.multiSelectSection}>
            <MultiSelect
              items={categories}
              selectedItems={[]}
              onSelectedItemsChange={items =>
                updateExercise('categories', items)
              }
              isSingle={false}
              subKey={'subCategories'}
              selectText={'Choose categories...'}
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
    minHeight: '70%',
    maxHeight: '70%',
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
  },
  saveButtonSection: {
    flex: 3,
    minHeight: 110,
    maxHeight: 110,
    paddingVertical: 30,
  },
  addButton: {
    flex: 1,
    minWidth: 350,
    maxWidth: 350,
    minHeight: 50,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
  },
});

export default ExerciseModal;
