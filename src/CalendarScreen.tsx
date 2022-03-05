import React from 'react';
import { View, Text } from 'react-native';

const CalendarScreen: React.FC<{}> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{'Calendar'}</Text>
    </View>
  );
};

export default CalendarScreen;
