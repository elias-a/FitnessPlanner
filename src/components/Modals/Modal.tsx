import React from 'react';
import ModalComponent, { Direction } from 'react-native-modal';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  swipeDirection?: 'up' | 'down' | 'left' | 'right' | Direction[];
  children: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  close,
  swipeDirection,
  children,
}) => {
  return (
    <ModalComponent
      isVisible={isOpen}
      swipeDirection={swipeDirection}
      onSwipeComplete={close}
      onBackdropPress={close}
      style={{ margin: 0 }}
    >
      {children}
    </ModalComponent>
  );
};

export default Modal;
