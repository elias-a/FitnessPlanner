import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './CalendarScreen';
import ExerciseScreen from './ExerciseScreen';
import AccountScreen from './AccountScreen';
import NavIcon from './NavIcon';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Exercises">
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarShowLabel: false,
            header: () => null,
            tabBarIcon: ({ focused }) => (
              <NavIcon focused={focused} name="calendar-month" />
            ),
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExerciseScreen}
          options={{
            tabBarShowLabel: false,
            header: () => null,
            tabBarIcon: ({ focused }) => (
              <NavIcon focused={focused} name="weight-lifter" />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarShowLabel: false,
            header: () => null,
            tabBarIcon: ({ focused }) => (
              <NavIcon focused={focused} name="account" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
