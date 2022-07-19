import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import { useQuery } from 'react-query';
import { useAddSplitMutation, useDeleteSplitMutation } from '../../hooks/split';
import { getExercises } from '../../models/tasks/exercise';
import { getSplits } from '../../models/tasks/split';
import {
  buildSplitTemplate,
  templateToSchedule,
} from '../../algorithms/buildSplit';
import ScrollableList from '../ScrollableList';
import SplitModal from '../Modals/Split';
import ContextMenu from '../ContextMenu';
import Header from './Header';
import { formatDate } from '../../utils/formatDate';
import type { Split } from '../../types/split';

type ViewSplitsProps = NativeStackScreenProps<Stack, 'ViewSplits'>;

const ViewSplits: React.FC<ViewSplitsProps> = ({ navigation }) => {
  const [isSplitOpen, setIsSplitOpen] = React.useState(false);
  const [selectedSplit, setSelectedSplit] = React.useState<Split>();
  const exercises = useQuery('exercises', getExercises);
  const splits = useQuery('splits', getSplits);
  const addMutation = useAddSplitMutation();
  const deleteMutation = useDeleteSplitMutation();

  const handleEdit = (split: Split) => {
    setSelectedSplit(split);
    setIsSplitOpen(true);
  };

  const handleRemove = (split: Split) => {
    addMutation.mutate({
      split: {
        ...split,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (split: Split) => {
    addMutation.mutate({
      split: {
        ...split,
        isDeleted: false,
      },
      editing: true,
    });
  };

  const saveSplit = (split: Split, editing: boolean) => {
    if (
      Object.keys(split.exerciseTemplate).length === 0 &&
      exercises.isSuccess
    ) {
      const selectedExercises = buildSplitTemplate(split, exercises.data);
      split.exerciseTemplate = selectedExercises;
    }

    split.exerciseSchedule = templateToSchedule(
      split.exerciseTemplate,
      split.exerciseSchedule,
      split.startDate,
      split.endDate,
      editing,
    );

    addMutation.mutate({ split, editing });

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
      modal={
        <SplitModal
          isOpen={isSplitOpen}
          onCancel={closeSplitModal}
          onSave={saveSplit}
          selectedSplit={selectedSplit}
        />
      }
    >
      <Header add={() => setIsSplitOpen(true)} />
      <View style={{ flex: 2, minWidth: '100%', alignItems: 'center' }}>
        {splits.isSuccess &&
          splits.data.map(split => {
            return (
              <View
                key={split.id}
                style={[
                  styles.split,
                  Object.keys(split).includes('isDeleted') &&
                    split.isDeleted && { backgroundColor: '#ffcccb' },
                ]}
              >
                <View style={styles.splitDetails}>
                  <Text style={styles.splitDetailsText}>
                    {`${formatDate(new Date(split.startDate))} - ${formatDate(
                      new Date(split.endDate),
                    )}`}
                  </Text>
                </View>

                <ContextMenu
                  item={split}
                  edit={handleEdit}
                  remove={handleRemove}
                  undoRemove={handleUndoRemove}
                />
              </View>
            );
          })}
      </View>
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
