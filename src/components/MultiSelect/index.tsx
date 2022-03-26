import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { Category } from '../../types/category';

interface MultiSelectProps {
  items: Category[];
  selectedItems: Category[];
  onSelectedItemsChange: (categories: Category[]) => void;
  isSingle: boolean;
  subKey?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  selectedItems,
  onSelectedItemsChange,
  isSingle,
  subKey,
}) => {
  return (
    <SectionedMultiSelect
      items={items}
      IconRenderer={Icon}
      uniqueKey="id"
      subKey={subKey ?? ''}
      selectText="Choose parent category..."
      single={isSingle}
      showDropDowns={false}
      readOnlyHeadings={false}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      styles={{
        container: {
          marginTop: 100,
          maxHeight: 600,
        },
        selectToggle: {
          backgroundColor: '#d0d0d0',
          width: 300,
          height: 40,
          marginBottom: 32,
          marginLeft: 32,
          borderWidth: 1,
          padding: 10,
        },
      }}
    />
  );
};

export default MultiSelect;
