import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SetBirthDate, SetMeeting, Variations } from './components';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <SetMeeting />
        <SetBirthDate />
        <Variations />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  contentContainerStyle: {
    paddingVertical: 20,
  },
});

export default App;
