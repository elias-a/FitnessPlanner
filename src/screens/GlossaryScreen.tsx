import React from 'react';
import { View, StyleSheet } from 'react-native';
import Glossary from '../components/Glossary';

const GlossaryScreen: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Glossary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    padding: 8,
  },
});

export default GlossaryScreen;
