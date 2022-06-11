import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from 'react-query';
import { getExercises } from '../../models/tasks/exercise';
import { getCategories } from '../../models/tasks/category';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import MultiSelect from '../MultiSelect';
import NumericInput from 'react-native-numeric-input';
import type { Exercise } from '../../types/exercise';
import type { NewSplitExercise } from '../../types/split';

interface SplitExerciseProps {
  splitExercise: NewSplitExercise;
  index: number;
  handleChange: (name: string, value: any, index: number) => void;
}

const SplitExercise: React.FC<SplitExerciseProps> = ({
  splitExercise,
  index,
  handleChange,
}) => {
  const categories = useQuery('categories', getCategories);
  const exercises = useQuery('exercises', getExercises);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [filteredExercises, setFilteredExercises] = React.useState(
    exercises.data ?? [],
  );

  const handleCategorySelection = (items: string[]) => {
    if (!exercises.isSuccess) {
      setFilteredExercises([]);
      return;
    }

    setSelectedCategories(items);

    const newFilteredExercises: Exercise[] = [];
    exercises.data.forEach(e => {
      items.forEach(category => {
        if (e.categories.includes(category)) {
          newFilteredExercises.push(e);
        }
      });
    });

    setFilteredExercises(newFilteredExercises);
  };

  return (
    <View style={styles.messageSection}>
      <View
        style={[
          styles.categorySelect,
          selectedCategories.length > 0 && { minHeight: 70, maxHeight: 70 },
        ]}
      >
        <MultiSelect
          items={categories.data ?? []}
          selectedItems={selectedCategories}
          onSelectedItemsChange={handleCategorySelection}
          isSingle={false}
          subKey={'subCategories'}
          selectText={'Choose categories...'}
        />
      </View>

      <View style={styles.exerciseDropdown}>
        <SelectDropdown
          defaultValue={splitExercise.exercise}
          data={filteredExercises}
          defaultButtonText={'Select exercise...'}
          buttonTextAfterSelection={item => item.name}
          rowTextForSelection={item => item.name}
          onSelect={(selectedExercise: Exercise) =>
            handleChange('exercise', selectedExercise, index)
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
          <Text style={styles.numericInputLabelText}>{'Number of sets:'}</Text>
        </View>
        <View style={styles.numericInput}>
          <NumericInput
            initValue={splitExercise.sets}
            value={splitExercise.sets}
            minValue={0}
            totalWidth={150}
            totalHeight={40}
            onChange={newSets => handleChange('sets', newSets, index)}
          />
        </View>
      </View>

      <View style={styles.numericInputSection}>
        <View style={styles.numericInputLabel}>
          <Text style={styles.numericInputLabelText}>{'Number of reps:'}</Text>
        </View>
        <View style={styles.numericInput}>
          <NumericInput
            initValue={splitExercise.reps}
            value={splitExercise.reps}
            minValue={0}
            totalWidth={150}
            totalHeight={40}
            onChange={newReps => handleChange('reps', newReps, index)}
          />
        </View>
      </View>

      <View style={styles.numericInputSection}>
        <View style={styles.numericInputLabel}>
          <Text style={styles.numericInputLabelText}>{'Single Arm:'}</Text>
        </View>
        <View style={styles.numericInput}>
          <Pressable
            onPress={() =>
              handleChange('isSingleArm', !splitExercise.isSingleArm, index)
            }
            style={styles.checkbox}
          >
            {splitExercise.isSingleArm ? (
              <MaterialCommunityIcons
                name={'checkbox-marked'}
                size={36}
                color={'#000'}
              />
            ) : (
              <MaterialCommunityIcons
                name={'checkbox-blank-outline'}
                size={36}
                color={'#000'}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageSection: {
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
  },
  categorySelect: {
    flex: 1,
    marginTop: 20,
    minHeight: 40,
    maxHeight: 40,
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
  checkbox: {
    flex: 1,
    minWidth: 36,
    maxWidth: 36,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
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

export default SplitExercise;
