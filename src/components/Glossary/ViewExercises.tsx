import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector } from '../../hooks';
import type { Exercise } from '../../types/exercise';

type ViewExercisesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewExercises: React.FC<ViewExercisesProps> = ({ navigation }) => {
  const { exercises } = useAppSelector(state => state.exercise);

  const renderItem = ({ item }: { item: Exercise }) => {
    return (
      <Pressable onPress={() => {}} style={styles.listItem}>
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons
          name={'arrow-left-bold'}
          size={32}
          color={'#000'}
        />
      </Pressable>
      <Text style={styles.title}>{'View Exercises'}</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ViewExercises;
