import React from 'react';
import { View, Modal as ModalComponent, StyleSheet } from 'react-native';

interface ModalProps {
  isOpen: boolean;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  return (
    <ModalComponent transparent visible={isOpen} onRequestClose={() => {}}>
      <View style={styles.modal}>{children}</View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default Modal;
