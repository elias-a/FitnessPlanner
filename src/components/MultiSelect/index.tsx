import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectBar from './SelectBar';
import Menu from './Menu';

interface MultiSelectProps {
  items: { id: string; name: string }[];
  selectedItems: string[];
  onSelectedChange: (item: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  selectedItems,
  onSelectedChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={styles.selectBar}>
      <SelectBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <Menu
          items={items}
          selectedItems={selectedItems}
          onSelectedChange={onSelectedChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 32,
  },
});

export default MultiSelect;
