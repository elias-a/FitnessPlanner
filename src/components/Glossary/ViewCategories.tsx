import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useAppSelector } from '../../hooks';
import type { Category } from '../../types/category';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const { categories } = useAppSelector(state => state.category);

  const renderItem = ({ item }: { item: Category }) => {
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
      <Text style={styles.title}>{'View Categories'}</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ViewCategories;
