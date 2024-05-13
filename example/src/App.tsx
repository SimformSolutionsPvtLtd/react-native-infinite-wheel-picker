import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StaticData } from './constants';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { scale } from './theme';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <WheelPicker
        height={50}
        data={StaticData.weekData}
        itemDisplayInList={3}
        infiniteScroll={true}
        selectedValue={4}
        textStyle={styles.textStyle}
        onValueChange={value => console.log('selected value____', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffff',
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: scale(22),
    color: 'black',
  },
});
export default App;
