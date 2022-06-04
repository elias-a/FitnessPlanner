import React from 'react';
import { View, StyleSheet } from 'react-native';

const dayWidth = 45;

const Filler: React.FC<{}> = ({}) => {
  return <View style={styles.item} />;
};

const styles = StyleSheet.create({
  item: {
    minWidth: dayWidth,
    maxWidth: dayWidth,
    minHeight: dayWidth,
    maxHeight: dayWidth,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Filler;
