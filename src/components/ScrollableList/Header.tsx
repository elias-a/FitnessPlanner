import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  title: string;
  goBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, goBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name={'chevron-left'}
            size={32}
            color={'#000'}
          />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '10%',
    maxHeight: '10%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#909090',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    minWidth: 32,
    maxWidth: 32,
    minHeight: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  titleSection: {
    flex: 2,
    minHeight: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
});

export default Header;
