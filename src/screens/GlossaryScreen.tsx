import React from 'react';
import { View, Text } from 'react-native';

const GlossaryScreen: React.FC<{}> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{'Glossary'}</Text>
    </View>
  );
};

export default GlossaryScreen;
