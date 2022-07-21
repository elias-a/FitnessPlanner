import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { QueryObserverResult } from 'react-query';
import ScrollableList from '../ScrollableList';
import ContextMenu from '../ContextMenu';
import Header from './Header';
import type {
  Item,
  FormProps,
  AddMutation,
  DeleteMutation,
} from '../../types/glossary';

interface GlossaryProps<T> {
  initialItem: T;
  items: QueryObserverResult<T[], unknown>;
  title: string;
  form: React.FC<FormProps<T>>;
  textExtractor: (item: T) => string;
  goBack: () => void;
  addMutation: AddMutation<T>;
  deleteMutation: DeleteMutation<T>;
  save: (item: T, editing: boolean) => void;
}

const Glossary = <T extends Item>({
  initialItem,
  items,
  title,
  form,
  textExtractor,
  goBack,
  addMutation,
  save,
}: GlossaryProps<T>) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<T>(initialItem);
  const [isEditing, setIsEditing] = React.useState(false);

  const update = <P,>(name: string, value: P) => {
    setSelectedItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleRemove = (item: T) => {
    addMutation.mutate({
      item: {
        ...item,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (item: T) => {
    addMutation.mutate({
      item: {
        ...item,
        isDeleted: false,
      },
      editing: true,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(initialItem);
    setIsEditing(false);
  };

  const handleSave = (item: T, editing: boolean) => {
    save(item, editing);
    closeModal();
  };

  return (
    <ScrollableList
      title={title}
      goBack={goBack}
      modal={
        form({
          isOpen: isModalOpen,
          onCancel: closeModal,
          onSave: handleSave,
          item: selectedItem,
          isEditing: isEditing,
          update: update,
        }) ?? <></>
      }
    >
      <Header add={() => setIsModalOpen(true)} />
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
