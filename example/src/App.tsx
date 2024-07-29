import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../src/theme';
import { GlobalTimePicker, SetBirthDate, TimePicker } from './components';
import { globalMetrics } from './theme';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>infinite-wheel-picker</Text>
      </View>
      <ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <SetBirthDate />
        <TimePicker />
        <GlobalTimePicker />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE5366',
  },
  scrollView: {
    padding: 5,
  },
  contentContainerStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: globalMetrics.isAndroid ? 0 : 56,
  },
  headerText: { fontSize: 16, fontWeight: '700', color: Colors.black },
});

export default App;
