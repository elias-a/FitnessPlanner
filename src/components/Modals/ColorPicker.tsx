import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  }, [isOpen, color]);

  const handleColorChange = (newColor: HsvColor) => {
    setSelectedColor(newColor);
  };

  return (
    <Modal isOpen={isOpen} close={onCancel}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <View style={styles.closeIcon}>
            <Pressable onPress={onCancel}>
              <MaterialCommunityIcons
                name={'window-close'}
                size={32}
                color={'#000'}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.colorPickerSection}>
          <TriangleColorPicker
            color={selectedColor}
            onColorChange={newColor => handleColorChange(newColor)}
            style={styles.colorPicker}
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
          <Pressable
            onPress={() => onSelect(fromHsv(selectedColor))}
            style={styles.fullWidthButton}
          >
            <Text style={{ fontSize: 20 }}>{'Save'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    flex: 1,
    minHeight: '10%',
    maxHeight: '10%',
  },
  closeIcon: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  colorPickerSection: {
    flex: 1,
    paddingTop: 50,
  },
  colorPicker: {
    flex: 1,
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

export default ColorPickerModal;
