import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from '../Modals/Modal';
import type { Item } from '../../types/glossary';

interface GlossaryModalProps<T> {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (item: T, editing: boolean) => void;
  selectedItem: T;
  children: React.ReactElement;
}

const GlossaryModal = <T extends Item>({
  isOpen,
  onCancel,
  onSave,
  selectedItem,
  children,
}: GlossaryModalProps<T>) => {
  const [item, setItem] = React.useState<T>(selectedItem);

  React.useEffect(() => {
    if (selectedItem) {
      setItem({ ...selectedItem });
    } else {
      setItem(selectedItem);
    }
  }, [isOpen, selectedItem]);

  const handleCancel = () => {
    setItem(selectedItem);
    onCancel();
  };

  const handleSave = () => {
    onSave(item, !!selectedItem);
    setItem(selectedItem);
  };

  return (
    <Modal isOpen={isOpen} close={handleCancel} swipeDirection={'down'}>
      <View style={styles.modal}>
        <View style={styles.container}>
          {children}

          <View style={styles.saveButtonSection}>
            <Pressable onPress={handleSave} style={styles.fullWidthButton}>
              <Text style={{ fontSize: 20 }}>{'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    minHeight: '90%',
    maxHeight: '90%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInputSection: {
    flex: 1,
    paddingTop: 30,
    minHeight: 70,
  },
  textInput: {
    flex: 1,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    borderWidth: 1,
    padding: 10,
  },
  saveButtonSection: {
    flex: 5,
    justifyContent: 'flex-end',
    minHeight: 102,
    maxHeight: 102,
    marginBottom: 35,
  },
  fullWidthButton: {
    minWidth: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
    marginTop: 1,
  },
});

export default GlossaryModal;
