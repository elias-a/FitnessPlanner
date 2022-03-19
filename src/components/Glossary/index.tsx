import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Landing';
import ViewExercises from './ViewExercises';
import AddExercise from './AddExercise';
import AddCategory from './AddCategory';
import StartSplit from './StartSplit';

export type Stack = {
  Landing: undefined;
  ViewExercises: undefined;
  AddExercise: undefined;
  AddCategory: undefined;
  StartSplit: undefined;
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
