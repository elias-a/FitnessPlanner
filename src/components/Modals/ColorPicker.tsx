import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import Modal from './Modal';

interface HsvColor {
  h: number;
  s: number;
  v: number;
}

interface ColorPickerModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSelect: (color: string) => void;
  color: string;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onCancel,
  onSelect,
  color,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<HsvColor>(
    toHsv(color),
  );

  React.useEffect(() => {
    setSelectedColor(toHsv(color));
  }, [color]);

  const handleColorChange = (newColor: HsvColor) => {
    setSelectedColor(newColor);
  };

  return (
    <Modal isOpen={isOpen} close={onCancel}>
      <View style={styles.modal}>
        <View style={styles.headerSection}>
          <View style={styles.alertIcon}>
            <MaterialCommunityIcons
              name={'alert-circle-outline'}
              size={35}
              color={'#000'}
            />
          </View>

          <Text style={styles.headerText}>{'Choose Color'}</Text>

          <Pressable onPress={onCancel} style={styles.closeIcon}>
            <MaterialCommunityIcons
              name={'close-circle-outline'}
              size={35}
              color={'#000'}
            />
          </Pressable>
        </View>

        <View style={styles.colorPickerSection}>
          <TriangleColorPicker
            color={selectedColor}
            onColorChange={newColor => handleColorChange(newColor)}
            style={styles.colorPicker}
          />
        </View>

        <View style={styles.buttonSection}>
          <Pressable
            onPress={() => onSelect(fromHsv(selectedColor))}
            style={styles.selectButton}
          >
            <Text>{'Select'}</Text>
          </Pressable>
          <Pressable onPress={onCancel} style={styles.cancelButton}>
            <Text>{'Cancel'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '80%',
    maxHeight: '80%',
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: '#fff',
  },
  headerSection: {
    minHeight: '8%',
    maxHeight: '8%',
    backgroundColor: '#e8e8e8',
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
    color: '#000',
  },
  colorPickerSection: {
    minHeight: '55%',
    maxHeight: '55%',
    backgroundColor: '#fff',
  },
  colorPicker: {
    flex: 1,
  },
  buttonSection: {
    minHeight: '37%',
    maxHeight: '37%',
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
  cancelButton: {
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
    right: 125,
  },
  selectButton: {
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

export default ColorPickerModal;
