import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AccordionProps {
  isExpanded: boolean;
  toggleIsExpanded: (isExpanded: boolean) => void;
  children: any;
  headerText: string;
}

const Accordion: React.FC<AccordionProps> = ({
  isExpanded,
  toggleIsExpanded,
  children,
  headerText,
}) => {
  return (
    <View
      style={[
        styles.accordion,
        !isExpanded && { minHeight: 50, maxHeight: 50 },
      ]}
    >
      <Pressable
        style={styles.header}
        onPress={() => toggleIsExpanded(!isExpanded)}
      >
        <Text style={styles.headerText}>{headerText}</Text>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={32}
            color={'#000'}
          />
        </View>
      </Pressable>

      {isExpanded && <View style={styles.body}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: 100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    minWidth: '95%',
    maxWidth: '95%',
    minHeight: 40,
    maxHeight: 40,
    marginTop: 5,
    borderWidth: 2,
  },
  headerText: {
    fontSize: 24,
    position: 'absolute',
    top: 3,
    left: 10,
  },
  icon: {
    position: 'absolute',
    top: 3,
    right: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Accordion;
