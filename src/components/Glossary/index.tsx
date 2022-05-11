import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Landing';
import ViewExercises from './ViewExercises';
import ViewCategories from './ViewCategories';
import ViewSplits from './ViewSplits';

export type Stack = {
  Landing: undefined;
  ViewExercises: undefined;
  ViewCategories: undefined;
  ViewSplits: undefined;
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
    </Stack.Navigator>
  );
};

export default Glossary;
