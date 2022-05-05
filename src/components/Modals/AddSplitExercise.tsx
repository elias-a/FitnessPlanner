import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import Modal from './Modal';
import NumericInput from 'react-native-numeric-input';
import { useAppSelector } from '../../hooks';
import type { Exercise } from '../../types/exercise';
import type { SplitExercise } from '../../types/split';
import uuid from 'react-native-uuid';

interface AddSplitExerciseProps {
  isOpen: boolean;
  onCancel: () => void;
  onAdd: (splitExercise: SplitExercise) => void;
  initialSplitExercise?: SplitExercise;
}

const AddSplitExercise: React.FC<AddSplitExerciseProps> = ({
  isOpen,
  onCancel,
  onAdd,
  initialSplitExercise,
}) => {
  const [exercise, setExercise] = React.useState<Exercise | undefined>();
  const [sets, setSets] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const { exercises } = useAppSelector(state => state.exercise);

  React.useEffect(() => {
    loadSplitExercise(initialSplitExercise);
  }, [initialSplitExercise]);

  const loadSplitExercise = (splitExercise: SplitExercise | undefined) => {
    if (splitExercise) {
      setExercise(splitExercise.exercise);
      setSets(splitExercise.sets);
      setReps(splitExercise.reps);
    } else {
      setExercise(undefined);
      setSets(0);
      setReps(0);
    }
  };

  const handleClose = () => {
    loadSplitExercise(undefined);
    onCancel();
  };

  const handleAdd = () => {
    if (exercise) {
      const splitExercise: SplitExercise = {
        id: initialSplitExercise
          ? initialSplitExercise.id
          : uuid.v4().toString(),
        exercise: exercise,
        reps: reps,
        sets: sets,
        isCompleted: false,
      };

      onAdd(splitExercise);
      loadSplitExercise(undefined);
    }
  };

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

          <Text style={styles.headerText}>{'Add Exercise'}</Text>

          <Pressable onPress={handleClose} style={styles.closeIcon}>
            <MaterialCommunityIcons
              name={'close-circle-outline'}
              size={35}
              color={'#000'}
            />
          </Pressable>
        </View>

        <View style={styles.messageSection}>
          <View style={styles.exerciseDropdown}>
            <SelectDropdown
              defaultValue={exercise}
              data={exercises}
              defaultButtonText={'Select exercise...'}
              buttonTextAfterSelection={item => item.name}
              rowTextForSelection={item => item.name}
              onSelect={(selectedExercise: Exercise) =>
                setExercise(selectedExercise)
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

          <View style={styles.numericInputSection}>
            <View style={styles.numericInputLabel}>
              <Text style={styles.numericInputLabelText}>
                {'Number of sets:'}
              </Text>
            </View>
            <View style={styles.numericInput}>
              <NumericInput
                initValue={sets}
                value={sets}
                minValue={0}
                totalWidth={150}
                totalHeight={40}
                onChange={newSets => setSets(newSets)}
              />
            </View>
          </View>

          <View style={styles.numericInputSection}>
            <View style={styles.numericInputLabel}>
              <Text style={styles.numericInputLabelText}>
                {'Number of reps:'}
              </Text>
            </View>
            <View style={styles.numericInput}>
              <NumericInput
                initValue={reps}
                value={reps}
                minValue={0}
                totalWidth={150}
                totalHeight={40}
                onChange={newReps => setReps(newReps)}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Pressable onPress={handleAdd} style={styles.confirmButton}>
            <Text>{'Add'}</Text>
          </Pressable>
          <Pressable onPress={handleClose} style={styles.cancelButton}>
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
  message: {
    fontSize: 22,
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
  exerciseDropdown: {
    flex: 1,
    marginTop: 20,
    minHeight: 40,
    maxHeight: 40,
  },
  numericInputSection: {
    minWidth: '100%',
    maxWidth: '100%',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    minHeight: 60,
    maxHeight: 60,
  },
  numericInputLabel: {
    flex: 1,
    marginLeft: 10,
  },
  numericInputLabelText: {
    fontSize: 22,
  },
  numericInput: {
    flex: 1,
    marginLeft: 30,
  },
  dropdown1BtnStyle: {
    padding: 0,
    margin: 0,
    width: '90%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
});

export default AddSplitExercise;
