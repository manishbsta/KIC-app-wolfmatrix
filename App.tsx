import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { DATA } from './data';
import MyComponent from './src/components/MyComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <MyComponent data={DATA} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
