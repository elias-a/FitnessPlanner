import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { QueryObserverResult } from 'react-query';
import ScrollableList from '../ScrollableList';
import ContextMenu from '../ContextMenu';
import Header from './Header';
import type { Category } from '../../types/category';
import type { Exercise } from '../../types/exercise';
import type { Split } from '../../types/split';

type Item = Category | Exercise | Split;

interface GlossaryProps<T extends Item> {
  items: QueryObserverResult<T[], unknown>;
  modal: Element;
  title: string;
  textExtractor: (item: T) => string;
  goBack: () => void;
  clickAdd: () => void;
  handleEdit: (item: T) => void;
  handleRemove: (item: T) => void;
  handleUndoRemove: (item: T) => void;
}

const Glossary = <T extends Item>({
  items,
  modal,
  title,
  textExtractor,
  goBack,
  clickAdd,
  handleEdit,
  handleRemove,
  handleUndoRemove,
}: GlossaryProps<T>) => {
  return (
    <ScrollableList title={title} goBack={goBack} modal={modal}>
      <Header add={clickAdd} />
      <View style={{ flex: 2, minWidth: '100%', alignItems: 'center' }}>
        {items.isSuccess &&
          items.data.map(item => {
            return (
              <View
                key={item.id}
                style={[
                  styles.item,
                  Object.keys(item).includes('isDeleted') &&
                    item.isDeleted && { backgroundColor: '#ffcccb' },
                ]}
              >
                <View style={styles.details}>
                  <Text style={styles.name}>{textExtractor(item)}</Text>
                </View>

                <ContextMenu
                  item={item}
                  edit={handleEdit}
                  remove={handleRemove}
                  undoRemove={handleUndoRemove}
                />
              </View>
            );
          })}
      </View>
    </ScrollableList>
  );
};

const styles = StyleSheet.create({
  item: {
    minWidth: 340,
    maxWidth: 340,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    borderBottomWidth: 2,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    marginLeft: 5,
  },
  name: {
    color: '#000',
    fontSize: 22,
  },
});

export default Glossary;
