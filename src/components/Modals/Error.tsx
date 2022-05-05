import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from './Modal';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <View style={styles.modal}>
        <View style={styles.headerSection}>
          <View style={styles.alertIcon}>
            <MaterialCommunityIcons
              name={'alert-circle-outline'}
              size={35}
              color={'#fff'}
            />
          </View>

          <Text style={styles.headerText}>{'Error'}</Text>

          <Pressable onPress={onClose} style={styles.closeIcon}>
            <MaterialCommunityIcons
              name={'close-circle-outline'}
              size={35}
              color={'#fff'}
            />
          </Pressable>
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.message}>{message}</Text>
        </View>

        <View style={styles.buttonSection}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text>{'Close'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '30%',
    maxHeight: '30%',
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: '#fff',
  },
  headerSection: {
    minHeight: '20%',
    maxHeight: '20%',
    backgroundColor: '#e00000',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alertIcon: {
    position: 'absolute',
    top: 7,
    left: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 7,
    right: 15,
  },
  headerText: {
    position: 'absolute',
    top: 3,
    left: 50,
    fontSize: 35,
    color: '#fff',
  },
  messageSection: {
    minHeight: '55%',
    maxHeight: '55%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
  },
  buttonSection: {
    minHeight: '25%',
    maxHeight: '25%',
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
  },
  closeButton: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
  },
});

export default ErrorModal;
