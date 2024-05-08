import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>{`Infinite wheel picker`}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffff',
    flex: 1,
    justifyContent: 'center',
  }
})
export default App;
