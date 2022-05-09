import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteSplit } from '../../slices/split';
import ScrollableList from '../ScrollableList';
import SplitModal from '../Modals/Split';
import { formatDate } from '../../utils/formatDate';

type ViewSplitsProps = NativeStackScreenProps<Stack, 'ViewSplits'>;

const ViewSplits: React.FC<ViewSplitsProps> = ({ navigation }) => {
  const [isSplitOpen, setIsSplitOpen] = React.useState(false);
  const { splits } = useAppSelector(state => state.split);
  const dispatch = useAppDispatch();

  return (
    <ScrollableList
      title={'Splits'}
      goBack={() => navigation.goBack()}
      clickAddButton={() => setIsSplitOpen(true)}
      modal={
        <SplitModal
          isOpen={isSplitOpen}
          onCancel={() => setIsSplitOpen(false)}
          onSave={() => {}}
          editing={false}
        />
      }
    >
      {splits.map(split => {
        return (
          <Pressable key={split.id} onPress={() => {}} style={styles.listItem}>
            <View style={styles.splitDetails}>
              <Text style={styles.splitDetailsText}>
                {`${formatDate(new Date(split.startDate))} - ${formatDate(
                  new Date(split.endDate),
                )}`}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: 'StartSplit',
                  params: { split: split },
                })
              }
              style={styles.editButton}
            >
              <MaterialCommunityIcons
                name={'pencil'}
                size={32}
                color={'#000'}
              />
            </Pressable>
            <Pressable
              onPress={() => dispatch(deleteSplit(split))}
              style={styles.deleteButton}
            >
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#000'}
              />
            </Pressable>
          </Pressable>
        );
      })}
    </ScrollableList>
  );
};

export default ViewSplits;
