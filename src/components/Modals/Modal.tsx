import React from 'react';
import ModalComponent from 'react-native-modal';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, close, children }) => {
  return (
    <ModalComponent
      isVisible={isOpen}
      swipeDirection="down"
      onSwipeComplete={close}
      onBackdropPress={close}
      style={{ margin: 0 }}
    >
      {children}
    </ModalComponent>
  );
};

export default Modal;
