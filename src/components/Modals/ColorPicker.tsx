import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <Modal isOpen={isOpen} close={onCancel} swipeDirection="down">
      <View style={styles.modal}>
        <View style={styles.colorPickerSection}>
          <TriangleColorPicker
            color={selectedColor}
            onColorChange={newColor => handleColorChange(newColor)}
            style={styles.colorPicker}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.saveButtonSection}>
            <Pressable
              onPress={() => onSelect(fromHsv(selectedColor))}
              style={styles.addButton}
            >
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
    minHeight: '80%',
    maxHeight: '80%',
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
  colorPickerSection: {
    minHeight: '75%',
    maxHeight: '75%',
    paddingTop: 50,
  },
  colorPicker: {
    flex: 1,
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
});

export default ColorPickerModal;
