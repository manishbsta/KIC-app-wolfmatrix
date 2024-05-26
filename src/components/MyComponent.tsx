import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Item } from '../../interfaces/item';
import VerticalSpacer from './VerticalSpacer';

const MyComponent = ({ data }: { data: Item[] }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDataSource(
        data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, searchTerm]);

  const handleSelect = (item: Item) => {
    const selectedItemsCopy = [...selectedItems];
    const index = selectedItemsCopy.findIndex(sic => sic.id === item.id);

    if (index >= 0) {
      selectedItemsCopy.splice(index, 1);
    } else {
      selectedItemsCopy.push(item);
    }

    setSelectedItems([...selectedItemsCopy]);
  };

  const handleClear = () => setSearchTerm('');

  const renderDataItem: ListRenderItem<Item> = ({ item }) => {
    const isSelected = selectedItems.some(si => si.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        testID={`Button-${item.id}`}>
        <Text>{item.name}</Text>
        <Text
          testID={`SelectedState-${item.id}`}
          style={{ color: isSelected ? 'green' : undefined }}>
          {isSelected ? 'Selected' : 'Not selected'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          testID='SearchBar'
          value={searchTerm}
          style={styles.textInput}
          onChangeText={setSearchTerm}
          placeholder='Search by name...'
        />
        <TouchableOpacity
          testID='ClearButton'
          onPress={handleClear}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        testID='DataList'
        data={dataSource}
        keyExtractor={item => item.id}
        renderItem={renderDataItem}
        ItemSeparatorComponent={VerticalSpacer}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchBar: {
    columnGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 4,
  },
});
