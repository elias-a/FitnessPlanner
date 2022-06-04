import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { isDateInRange } from '../../utils/isDateInRange';
import { checkDateEquality } from '../../utils/checkDateEquality';
import {
  CalendarRange,
  SelectedDates,
  CalendarData,
} from '../../types/calendar';

const dayWidth = 45;

interface DayProps {
  isRangeSelectable: boolean;
  item: CalendarData;
  today: Date;
  selectedDates: SelectedDates;
  setSelectedDates: (dates: SelectedDates) => void;
  ranges: CalendarRange[];
  color: string;
}

const Day: React.FC<DayProps> = ({
  isRangeSelectable,
  item,
  today,
  selectedDates,
  ranges,
  setSelectedDates,
  color,
}) => {
  const itemData = item.data as Date;
  const isToday = checkDateEquality(today, itemData);
  const isSelected =
    selectedDates[0] !== undefined
      ? checkDateEquality(selectedDates[0], itemData)
      : false;
  const isSelectedEnd =
    selectedDates[1] !== undefined
      ? checkDateEquality(selectedDates[1], itemData)
      : false;

  let isInRange = false;
  if (selectedDates[0] !== undefined && selectedDates[1] !== undefined) {
    const range: CalendarRange = {
      startRange: selectedDates[0],
      endRange: selectedDates[1],
      color: color,
    };
    if (isDateInRange(itemData, [range])) {
      isInRange = true;
    }
  }

  let otherSplitColor = isDateInRange(itemData, ranges);
  let isInOtherRange = false;
  if (otherSplitColor) {
    isInOtherRange = true;
  }

  const onSelect = (data: Date) => {
    if (!isRangeSelectable) {
      setSelectedDates([data, undefined]);
      return;
    }

    // If a start date but not an end date is selected,
    // select an end date, or select a new start date.
    if (selectedDates[0] && !selectedDates[1]) {
      if (data < selectedDates[0]) {
        setSelectedDates([data, undefined]);
      } else {
        const newDates: SelectedDates = [...selectedDates];
        newDates[1] = data;
        setSelectedDates(newDates);
      }
    }
    // If both a start and end date are selected,
    // select a start date.
    else if (selectedDates[0] && selectedDates[1]) {
      setSelectedDates([data, undefined]);
    }
    // If no dates are selected, select a start date.
    else {
      const newDates: SelectedDates = [...selectedDates];
      newDates[0] = data;
      setSelectedDates(newDates);
    }
  };

  return (
    <Pressable
      onPress={() => onSelect(itemData)}
      style={[
        styles.item,
        (isSelected || isSelectedEnd) && {
          backgroundColor: '#484848',
          borderRadius: 30,
        },
        isInRange && { backgroundColor: color },
        isInOtherRange && { backgroundColor: otherSplitColor },
      ]}
    >
      <Text
        style={[
          (isSelected || isSelectedEnd) && { color: '#fff' },
          isToday && { fontWeight: '900' },
        ]}
      >
        {itemData.getDate().toString()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    minWidth: dayWidth,
    maxWidth: dayWidth,
    minHeight: dayWidth,
    maxHeight: dayWidth,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Day;
