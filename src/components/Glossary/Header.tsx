import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface HeaderProps {
  title: string;
  goBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, goBack }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <MaterialCommunityIcons
          name={'arrow-left-bold'}
          size={32}
          color={'#000'}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
