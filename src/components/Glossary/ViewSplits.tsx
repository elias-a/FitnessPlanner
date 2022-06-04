import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteSplit } from '../../slices/split';
import { createSplit } from '../../slices/split';
import {
  buildSplitTemplate,
  templateToSchedule,
} from '../../algorithms/buildSplit';
import ScrollableList from '../ScrollableList';
import SplitModal from '../Modals/Split';
import { formatDate } from '../../utils/formatDate';
import type { Split } from '../../types/split';

type ViewSplitsProps = NativeStackScreenProps<Stack, 'ViewSplits'>;

const ViewSplits: React.FC<ViewSplitsProps> = ({ navigation }) => {
  const [isSplitOpen, setIsSplitOpen] = React.useState(false);
  const [selectedSplit, setSelectedSplit] = React.useState<Split>();
  const { splits } = useAppSelector(state => state.split);
  const { exercises } = useAppSelector(state => state.exercise);
  const dispatch = useAppDispatch();

  const handleEdit = (split: Split) => {
    setSelectedSplit(split);
    setIsSplitOpen(true);
  };

  const saveSplit = (split: Split, editing: boolean) => {
    if (Object.keys(split.exerciseTemplate).length === 0) {
      const selectedExercises = buildSplitTemplate(split, exercises);
      split.exerciseTemplate = selectedExercises;
    }

    split.exerciseSchedule = templateToSchedule(
      split.exerciseTemplate,
      split.startDate,
      split.endDate,
    );

    dispatch(
      createSplit({
        split: split,
        editing: editing,
      }),
    );

    closeSplitModal();
  };

  const closeSplitModal = () => {
    setIsSplitOpen(false);
    setSelectedSplit(undefined);
  };

  return (
    <ScrollableList
      title={'Splits'}
      goBack={() => navigation.goBack()}
      clickAddButton={() => setIsSplitOpen(true)}
      modal={
        <SplitModal
          isOpen={isSplitOpen}
          onCancel={closeSplitModal}
          onSave={saveSplit}
          selectedSplit={selectedSplit}
        />
      }
    >
      {splits.map(split => {
        return (
          <View key={split.id} style={styles.split}>
            <View style={styles.splitDetails}>
              <Text style={styles.splitDetailsText}>
                {`${formatDate(new Date(split.startDate))} - ${formatDate(
                  new Date(split.endDate),
                )}`}
              </Text>
            </View>
            <View style={styles.editSection}>
              <Pressable onPress={() => handleEdit(split)}>
                <MaterialCommunityIcons
                  name={'pencil'}
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            </View>
            <View style={styles.deleteSection}>
              <Pressable onPress={() => dispatch(deleteSplit(split))}>
                <MaterialCommunityIcons
                  name={'delete'}
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollableList>
  );
};

const styles = StyleSheet.create({
  split: {
    width: 340,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 20,
    borderBottomWidth: 2,
  },
  splitDetails: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    marginLeft: 5,
  },
  editSection: {
    flex: 2,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  deleteSection: {
    flex: 3,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    marginRight: 5,
    marginTop: 3,
  },
  splitDetailsText: {
    color: '#000',
    fontSize: 22,
  },
});

export default ViewSplits;
