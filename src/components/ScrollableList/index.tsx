import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';

interface ScrollableListProps {
  title: string;
  goBack: () => void;
  children: any;
  modal: any;
}

const ScrollableList: React.FC<ScrollableListProps> = ({
  title,
  goBack,
  children,
  modal,
}) => {
  return (
    <React.Fragment>
      <View style={styles.pageContainer}>
        <Header title={title} goBack={goBack} />

        <View style={styles.viewContainer}>
          <View style={styles.listContainer}>
            <ScrollView>{children}</ScrollView>
          </View>
        </View>
      </View>

      {modal}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90%',
    maxHeight: '90%',
  },
  listContainer: {
    flex: 1,
    minHeight: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  addButtonSection: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default ScrollableList;
