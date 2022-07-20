import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Modal from './Modal';
import type { Category } from '../../types/category';
import type { Exercise } from '../../types/exercise';
import type { Split } from '../../types/split';

type Item = Category | Exercise | Split;

interface GlossaryModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (item: Item, editing: boolean) => void;
  selectedItem: Item;
  children: Element;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onCancel,
  onSave,
  selectedItem,
  children,
}) => {
  const [item, setItem] = React.useState<Item>(selectedItem);

  React.useEffect(() => {
    if (selectedItem) {
      setItem({ ...selectedItem });
    } else {
      setItem(selectedItem);
    }
  }, [isOpen, selectedItem]);

  const updateCategory = <T,>(name: string, value: T) => {
    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          <View style={styles.textInputSection}>
            <TextInput
              value={item.name}
              onChangeText={name => updateCategory('name', name)}
              placeholder={'Enter category name...'}
              style={styles.textInput}
            />
          </View>

          <View
            style={{
              flex: 5,
              justifyContent: 'flex-end',
              minHeight: 102,
              maxHeight: 102,
              marginBottom: 35,
            }}
          >
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
  multiSelectSection: {
    flex: 2,
    paddingTop: 30,
    minHeight: 70,
    maxHeight: 70,
  },
  saveButtonSection: {
    flex: 3,
    minHeight: 110,
    maxHeight: 110,
    paddingVertical: 30,
  },
  addButton: {
    flex: 2,
    alignSelf: 'flex-end',
    minWidth: 350,
    maxWidth: 350,
    minHeight: 50,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
  },

  dropdown1BtnStyle: {
    padding: 0,
    margin: 0,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#efefef',
  },
  dropdown1RowStyle: {
    backgroundColor: '#efefef',
    borderBottomColor: '#c5c5c5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
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
