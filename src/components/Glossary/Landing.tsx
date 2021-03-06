import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';

type LandingProps = NativeStackScreenProps<Stack, 'Landing'>;

const Landing: React.FC<LandingProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.push('ViewExercises', 'ViewExercises')}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>{'Exercises'}</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.push('ViewCategories', 'ViewCategories')}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>{'Categories'}</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.push('ViewSplits', 'ViewSplits')}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>{'Splits'}</Text>
      </Pressable>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    height: 90,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 20,
    backgroundColor: '#909090',
  },
});

export default Landing;
