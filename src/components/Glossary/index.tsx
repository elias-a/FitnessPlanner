import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Landing';
import ViewExercises from './ViewExercises';
import ViewCategories from './ViewCategories';
import ViewSplits from './ViewSplits';
import AddExercise from './AddExercise';
import AddCategory from './AddCategory';
import StartSplit from './StartSplit';
import type { Category } from '../../types/category';
import type { Exercise } from '../../types/exercise';
import { Split } from '../../types/split';

export type Stack = {
  Landing: undefined;
  ViewExercises: undefined;
  ViewCategories: undefined;
  ViewSplits: undefined;
  AddExercise: { exercise: Exercise | undefined };
  AddCategory: { category: Category | undefined };
  StartSplit: { split: Split | undefined };
};

const Stack = createNativeStackNavigator();

const Glossary: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ViewExercises"
        component={ViewExercises}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ViewCategories"
        component={ViewCategories}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ViewSplits"
        component={ViewSplits}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExercise}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="StartSplit"
        component={StartSplit}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Glossary;
