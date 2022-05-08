import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from './Modal';
import SelectDropdown from 'react-native-select-dropdown';
import { useAppSelector } from '../../hooks';
import type { Exercise } from '../../types/exercise';
import Category from '../../models/schema/category';

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

  const handleCancel = () => {
    setExercise(initialExercise);
    onCancel();
  };

  const handleSave = () => {
    onSave(exercise, editing);
    setExercise(initialExercise);
  };

  return (
    <Modal isOpen={isOpen} close={handleCancel}>
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
            <SelectDropdown
              data={categories}
              defaultButtonText={'Select category...'}
              buttonTextAfterSelection={item => item.name}
              rowTextForSelection={item => item.name}
              onSelect={(selectedCategory: Category) =>
                updateExercise('categories', [selectedCategory.id])
              }
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
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

export default ExerciseModal;
