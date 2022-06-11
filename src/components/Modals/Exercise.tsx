import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { getCategories } from '../../models/tasks/category';
import Modal from './Modal';
import MultiSelect from '../MultiSelect';
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
  selectedExercise?: Exercise;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onCancel,
  onSave,
  selectedExercise,
}) => {
  const [exercise, setExercise] = React.useState(initialExercise);
  const categories = useQuery('categories', getCategories);

  React.useEffect(() => {
    if (selectedExercise) {
      setExercise({ ...selectedExercise });
    } else {
      setExercise({ ...initialExercise });
    }
  }, [isOpen, selectedExercise]);

  const updateExercise = <T,>(name: string, value: T) => {
    setExercise(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setExercise(initialExercise);
    onCancel();
  };

  const handleSave = () => {
    onSave(exercise, !!selectedExercise);
    setExercise(initialExercise);
  };

  return (
    <Modal isOpen={isOpen} close={handleCancel} swipeDirection="down">
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
              items={categories.data ?? []}
              selectedItems={exercise.categories}
              onSelectedItemsChange={newCategories =>
                updateExercise('categories', newCategories)
              }
              isSingle={false}
              subKey={'subCategories'}
              selectText={'Choose categories...'}
            />
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
            <Pressable onPress={handleSave} style={styles.fullWidthButton}>
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
    minHeight: 135,
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

export default ExerciseModal;
