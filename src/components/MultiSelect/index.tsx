import React from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { Category } from '../../types/category';

interface MultiSelectProps {
  items: Category[];
  selectedItems: string[];
  onSelectedItemsChange: (categories: string[]) => void;
  isSingle: boolean;
  subKey?: string;
  selectText: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  selectedItems,
  onSelectedItemsChange,
  isSingle,
  subKey,
  selectText,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey={subKey}
        selectText={selectText}
        single={isSingle}
        showDropDowns={false}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        styles={{
          container: {
            marginTop: 100,
            maxHeight: 600,
          },
          selectToggle: {
            backgroundColor: '#d0d0d0',
            width: 350,
            height: 40,
            borderWidth: 1,
            padding: 10,
          },
          chipsWrapper: {
            width: 300,
            justifyContent: 'center',
          },
        }}
      />
    </View>
  );
};

export default MultiSelect;
