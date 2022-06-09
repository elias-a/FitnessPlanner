import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Modal from './Modal';
import Accordion from '../Accordion';
import SplitExerciseSection from '../SplitExercise';
import type { SplitExercise, NewSplitExercise } from '../../types/split';
import uuid from 'react-native-uuid';

const emptySplitExercise: NewSplitExercise = {
  id: '',
  exercise: undefined,
  sets: 0,
  reps: 0,
  isSingleArm: false,
};

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
  const [splitExercises, setSplitExercises] = React.useState<
    NewSplitExercise[]
  >([]);
  const [openAccordion, setOpenAccordion] = React.useState('');

  React.useEffect(() => {
    loadSplitExercise(initialSplitExercise);
  }, [initialSplitExercise]);

  const loadSplitExercise = (e: SplitExercise | undefined) => {
    if (e) {
      const supersets: NewSplitExercise[] = [];
      if (e.superset) {
        e.superset.forEach(superset => {
          supersets.push({
            id: superset.id,
            exercise: superset.exercise,
            sets: superset.sets,
            reps: superset.reps,
            isSingleArm: superset.isSingleArm,
          });
        });
      }

      setSplitExercises([
        {
          id: e.id,
          exercise: e.exercise,
          sets: e.sets,
          reps: e.reps,
          isSingleArm: e.isSingleArm,
        },
        ...supersets,
      ]);
      setOpenAccordion(e.id);
    } else {
      const id = uuid.v4().toString();
      setSplitExercises([{ ...emptySplitExercise, id }]);
      setOpenAccordion(id);
    }
  };

  const handleAddSuperset = () => {
    const id = uuid.v4().toString();
    setSplitExercises([...splitExercises, { ...emptySplitExercise, id }]);
    setOpenAccordion(id);
  };

  const removeSuperset = (id: string) => {
    const newSplitExercises = splitExercises.filter(el => el.id !== id);
    setSplitExercises(newSplitExercises);
  };

  const toggleOpenAccordion = (id: string) => {
    if (openAccordion === id) {
      setOpenAccordion('');
    } else {
      setOpenAccordion(id);
    }
  };

  const handleClose = () => {
    loadSplitExercise(undefined);
    onCancel();
  };

  const handleAdd = () => {
    if (splitExercises.length > 0) {
      const primaryExercise = splitExercises[0];
      const superset = splitExercises.slice(1);

      if (primaryExercise.exercise) {
        const newSplitExercise: SplitExercise = {
          ...splitExercises[0],
          id: initialSplitExercise
            ? initialSplitExercise.id
            : uuid.v4().toString(),
          isCompleted: false,
          exercise: primaryExercise.exercise,
        };

        if (superset.length > 0) {
          const supersets: SplitExercise[] = [];
          superset.map(e => {
            const exercise = e.exercise;

            if (exercise) {
              supersets.push({
                ...e,
                id: uuid.v4().toString(),
                isCompleted: false,
                exercise: exercise,
              });
            }
          });

          newSplitExercise.superset = supersets;
        }

        onAdd(newSplitExercise);
        loadSplitExercise(undefined);
      }
    }
  };

  const handleChange = <T,>(name: string, value: T, index: number) => {
    setSplitExercises([
      ...splitExercises.slice(0, index),
      { ...splitExercises[index], [name]: value },
      ...splitExercises.slice(index + 1),
    ]);
  };

  return (
    <Modal isOpen={isOpen} close={handleClose}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            {splitExercises.map((splitExercise, index) => {
              return (
                <Accordion
                  key={`accordion-${index}`}
                  isExpanded={splitExercise.id === openAccordion}
                  toggleIsExpanded={() => toggleOpenAccordion(splitExercise.id)}
                  headerText={
                    splitExercise.exercise?.name ?? 'Choose exercise...'
                  }
                  removeSuperset={removeSuperset}
                  splitId={splitExercise.id}
                >
                  <SplitExerciseSection
                    splitExercise={splitExercise}
                    index={index}
                    handleChange={handleChange}
                  />
                </Accordion>
              );
            })}
          </ScrollView>

          <View
            style={{
              flex: 5,
              justifyContent: 'flex-end',
              minHeight: 102,
              maxHeight: 102,
              marginBottom: 35,
            }}
          >
            <Pressable
              onPress={handleAddSuperset}
              style={styles.fullWidthButton}
            >
              <Text style={{ fontSize: 20 }}>{'Add Superset'}</Text>
            </Pressable>
            <Pressable onPress={handleAdd} style={styles.fullWidthButton}>
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
    maxHeight: 70,
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

export default AddSplitExercise;
