import React from 'react';
import { View, Text } from 'react-native';

const AccountScreen: React.FC<{}> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{'Account'}</Text>
    </View>
  );
};

export default AccountScreen;
