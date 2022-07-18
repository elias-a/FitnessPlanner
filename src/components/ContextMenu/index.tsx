import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Data {
  id: string;
  isDeleted?: boolean;
}

interface ContextMenuProps<T extends Data> {
  item: T;
  edit: (data: T) => void;
  remove: (data: T) => void;
  undoRemove: (data: T) => void;
}

const ContextMenu = <T extends Data>({
  item,
  edit,
  remove,
  undoRemove,
}: ContextMenuProps<T>) => {
  const [isContextOpen, setIsContextOpen] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          setIsContextOpen(prevState => ({
            ...prevState,
            [item.id]: !isContextOpen[item.id],
          }))
        }
      >
        {isContextOpen[item.id] ? (
          <View style={styles.contextButtons}>
            {Object.keys(item).includes('isDeleted') && item.isDeleted ? (
              <Pressable onPress={() => undoRemove(item)}>
                <MaterialCommunityIcons
                  name={'undo'}
                  size={28}
                  color={'#000'}
                />
              </Pressable>
            ) : (
              <React.Fragment>
                <Pressable onPress={() => edit({ ...item })}>
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={28}
                    color={'#000'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => remove({ ...item, isDeleted: false })}
                >
                  <MaterialCommunityIcons
                    name={'delete'}
                    size={28}
                    color={'#000'}
                  />
                </Pressable>
              </React.Fragment>
            )}
            <MaterialCommunityIcons
              name={'dots-vertical'}
              size={24}
              color={'#000'}
            />
          </View>
        ) : (
          <MaterialCommunityIcons
            name={'dots-horizontal'}
            size={24}
            color={'#000'}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 1,
    minHeight: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ContextMenu;
